import { useRef } from 'react';
import { m, useScroll } from 'motion/react';
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

/**
 * Accessible horizontal scroll-snap rail (Bugs 2 + 6): replaces the old
 * infinite marquee — no duplicated DOM, keyboard reachable, user-paced.
 */
export default function Timeline() {
  const railRef = useRef<HTMLOListElement>(null);

  /* Burgundy scroll-progress bar driven by the rail's horizontal scroll */
  const { scrollXProgress } = useScroll({ container: railRef });

  const scrollByCards = (direction: 1 | -1) => {
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
    railRef.current?.scrollBy({ left: direction * CARD_SCROLL, behavior });
  };

  return (
    <section id="timeline" className="py-20 md:py-28 bg-surface-2/50 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
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

      <div className="max-w-6xl mx-auto md:px-10 relative">
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
          aria-label="Career timeline, oldest to newest — scrolls horizontally"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin px-6 md:px-2 pb-6 pt-2"
        >
          {timelineEvents.map(event => (
            <li key={event.id} className="snap-start shrink-0 w-80 relative pt-7">
              {/* Hairline + navy dot */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 -right-6 h-px bg-border"
              />
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary"
              />
              <article className="bg-surface rounded-lg p-6 border border-border shadow-card h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-accent px-2.5 py-1 rounded-full bg-surface-2/70 border border-border">
                    {event.displayDate}
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
          ))}
        </ol>

        {/* Scroll progress */}
        <div aria-hidden="true" className="mx-6 md:mx-2 mt-1 h-0.5 rounded-full bg-border overflow-hidden">
          <m.div className="h-full bg-accent origin-left" style={{ scaleX: scrollXProgress }} />
        </div>
      </div>
    </section>
  );
}
