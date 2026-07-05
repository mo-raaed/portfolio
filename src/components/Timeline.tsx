import { useEffect, useRef } from 'react';
import { m, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import { Award, Briefcase, ChevronLeft, ChevronRight, Cpu, GraduationCap } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import type { TimelineEvent } from '../types';
import Reveal from './primitives/Reveal';
import SectionHeading from './primitives/SectionHeading';

const iconFor: Record<TimelineEvent['icon'], React.ReactNode> = {
  project: <Cpu size={16} aria-hidden="true" />,
  work: <Briefcase size={16} aria-hidden="true" />,
  education: <GraduationCap size={16} aria-hidden="true" />,
  award: <Award size={16} aria-hidden="true" />,
  volunteering: <GraduationCap size={16} aria-hidden="true" />,
};

const CARD_SCROLL = 344; /* card width (w-80) + gap */
const SPEED = 50; /* px per second of conveyor drift */
const RESUME_DELAY = 3000; /* ms the belt pauses after a user-initiated scroll */

/**
 * The Journey: an infinite conveyor belt of career/project cards. The list is
 * duplicated so the rail loops seamlessly; a rAF loop drives native scrollLeft
 * at a constant slow drift and wraps at the loop width. It pauses on hover,
 * focus, or any user scroll (drag / wheel / keyboard / the arrow buttons), then
 * resumes. Under prefers-reduced-motion the belt is disabled entirely: a single
 * static, snap-scrolling, keyboard-reachable rail with a persistent progress bar.
 */
export default function Timeline() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);

  const posRef = useRef(0); /* float source of truth; avoids sub-pixel scrollLeft stall */
  const loopWidthRef = useRef(0);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, pointerId: -1 });
  const progress = useMotionValue(0);

  /* One rendered pass under reduced motion; a duplicated pass drives the loop. */
  const events = reduce ? timelineEvents : [...timelineEvents, ...timelineEvents];

  /* Measure the width of one full pass (first clone offset − first real offset). */
  useEffect(() => {
    const el = railRef.current;
    if (!el || reduce) return;
    const measure = () => {
      const first = el.querySelector('li:not([data-clone])') as HTMLElement | null;
      const clone = el.querySelector('li[data-clone]') as HTMLElement | null;
      if (first && clone) loopWidthRef.current = clone.offsetLeft - first.offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduce]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const el = railRef.current;
    const loop = loopWidthRef.current;
    if (!el || !loop) return;
    if (
      hoveredRef.current ||
      focusedRef.current ||
      dragRef.current.active ||
      performance.now() < pausedUntilRef.current
    )
      return;
    posRef.current += (Math.min(delta, 64) / 1000) * SPEED; /* clamp tab-switch spikes */
    if (posRef.current >= loop) posRef.current -= loop; /* seamless forward wrap */
    el.scrollLeft = posRef.current;
  });

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const loop = loopWidthRef.current;
    if (!reduce && loop && Math.abs(el.scrollLeft - posRef.current) > 2) {
      /* User-initiated scroll: resync the accumulator and pause the belt. */
      posRef.current = el.scrollLeft;
      pausedUntilRef.current = performance.now() + RESUME_DELAY;
      if (posRef.current >= loop) {
        posRef.current -= loop;
        el.scrollLeft = posRef.current;
      }
    }
    progress.set(
      !reduce && loop
        ? (el.scrollLeft % loop) / loop
        : el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth),
    );
  };

  const scrollByCards = (direction: 1 | -1) => {
    /* Pause the belt first so the rAF loop stops writing scrollLeft and does
       not stomp the smooth scroll; onScroll keeps posRef in sync. */
    pausedUntilRef.current = performance.now() + RESUME_DELAY;
    const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
    railRef.current?.scrollBy({ left: direction * CARD_SCROLL, behavior });
  };

  /* Mouse drag-to-slide. Touch keeps native momentum scrolling. */
  const onPointerDown = (e: React.PointerEvent<HTMLOListElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const el = railRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, pointerId: e.pointerId };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLOListElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const el = railRef.current;
    if (!el) return;
    el.scrollLeft = d.startScroll - (e.clientX - d.startX); /* fires onScroll → resync + pause */
  };

  const endDrag = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    railRef.current?.releasePointerCapture(d.pointerId);
    pausedUntilRef.current = performance.now() + RESUME_DELAY;
  };

  return (
    <section id="timeline" className="py-20 md:py-28 bg-surface-2/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <SectionHeading eyebrow="Career & project log" title="The Journey So Far" />
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll timeline backward"
                className="p-2.5 rounded-full border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Scroll timeline forward"
                className="p-2.5 rounded-full border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="group/rail max-w-7xl mx-auto md:px-10 relative">
        {/* Edge fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-background/80 to-transparent z-10 dark:from-background/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-background/80 to-transparent z-10 dark:from-background/70"
        />

        <ol
          ref={railRef}
          tabIndex={0}
          onScroll={onScroll}
          onPointerEnter={() => (hoveredRef.current = true)}
          onPointerLeave={() => (hoveredRef.current = false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onFocus={() => (focusedRef.current = true)}
          onBlur={() => (focusedRef.current = false)}
          onTouchStart={() => (pausedUntilRef.current = performance.now() + RESUME_DELAY)}
          aria-label="Career timeline from oldest to newest, scrolls horizontally"
          className={`flex gap-6 overflow-x-auto px-6 md:px-2 pb-6 pt-2 ${
            reduce
              ? 'snap-x snap-mandatory scrollbar-thin'
              : 'select-none can-hover:cursor-grab can-hover:active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }`}
        >
          {events.map((event, i) => {
            const clone = !reduce && i >= timelineEvents.length;
            return (
              <li
                key={clone ? `${event.id}-clone` : event.id}
                data-clone={clone ? 'true' : undefined}
                aria-hidden={clone ? 'true' : undefined}
                className="snap-start shrink-0 w-80 relative pt-7"
              >
                {/* Hairline + navy dot */}
                <span aria-hidden="true" className="absolute top-2 left-0 -right-6 h-px bg-border" />
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary"
                />
                <article className="bg-surface rounded-lg p-6 border border-border shadow-card h-full flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent px-2.5 py-1 rounded-full bg-surface-2/70 border border-border">
                      {event.displayDate}
                      {event.ongoing && (
                        <>
                          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-400">ongoing</span>
                        </>
                      )}
                    </span>
                    <span className="text-muted-foreground/60">{iconFor[event.icon]}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg tracking-tight text-foreground mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                    {event.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Scroll progress: hidden at rest, fades in on hover/focus of the rail. */}
        <div
          aria-hidden="true"
          className={`mx-6 md:mx-2 mt-1 h-0.5 rounded-full bg-border overflow-hidden transition-opacity duration-300 ${
            reduce
              ? 'opacity-100'
              : 'opacity-0 group-hover/rail:opacity-100 group-focus-within/rail:opacity-100'
          }`}
        >
          <m.div className="h-full bg-accent origin-left" style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  );
}
