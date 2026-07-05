import { useRef } from 'react';
import { ChevronRight, Compass, FileText } from 'lucide-react';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import SmartImage from './primitives/SmartImage';
import Reveal from './primitives/Reveal';
import CountUp from './primitives/CountUp';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Layered depth: each layer reads the section's own scroll traversal and
     moves at a different speed. reduce → every range collapses to no motion.
     (MotionConfig reducedMotion only strips animate props, not these styles.) */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const r = (a: number, b: number) => (reduce ? [0, 0] : [a, b]);

  const blobY = useTransform(scrollYProgress, [0, 1], r(0, -150));
  const blobY2 = useTransform(scrollYProgress, [0, 1], r(0, -90));
  const portraitY = useTransform(scrollYProgress, [0, 1], r(0, 44)); // sinks — separates from copy
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], reduce ? [1, 1] : [1, 0.35]);
  const contentScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.97]);

  /* Bug 8: stats derived from data, not hardcoded */
  const stats = [
    { value: String(projects.filter(p => p.status === 'live').length), label: 'Deployed apps' },
    { value: String(projects.length), label: 'Total projects' },
    { value: String(profile.researchPapers), label: 'Research papers' },
    { value: profile.volunteerHours, label: 'Volunteer hours' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
    >
      {/* Background blobs — Bug 4: valid arbitrary value replaces `right-1/10` */}
      <m.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute top-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl -z-10"
      />
      <m.div
        aria-hidden="true"
        style={{ y: blobY2 }}
        className="absolute bottom-10 left-1/4 w-60 h-60 rounded-full bg-accent/10 blur-3xl -z-10"
      />

      <m.div style={{ opacity: contentOpacity, scale: contentScale }} className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy — staggered entrance */}
          <m.div
            className="lg:col-span-7 space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <m.p
              variants={item}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold text-accent tracking-[0.15em] uppercase"
            >
              <Compass size={14} aria-hidden="true" />
              {profile.title}
            </m.p>

            <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.04] text-foreground">
              <m.span variants={item} className="block">
                From neural networks
              </m.span>
              <m.span variants={item} className="block">
                to <em className="italic font-medium text-accent">rotordynamic sensors</em>.
              </m.span>
            </h1>

            <m.p
              variants={item}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              I'm {profile.name} — I build deployed web tools, train custom ML models, and design
              mechatronic sensor systems. Currently finishing my B.Sc. at AUIS and targeting
              AI-driven roles in the energy sector.
            </m.p>

            <m.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary-solid text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:brightness-110 transition-[filter]"
              >
                View my work <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                Download CV <FileText size={16} aria-hidden="true" />
              </a>
            </m.div>
          </m.div>

          {/* Right: portrait with offset burgundy frame, spring entrance.
              portraitY gives it a slower drift than the copy → depth. */}
          <div className="lg:col-span-5">
            <m.div style={{ y: portraitY }} className="relative max-w-sm mx-auto lg:max-w-none lg:mr-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-accent/50"
              />
              <m.div
                className="relative"
                initial={{ opacity: 0, scale: 0.96, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 1 }}
                whileHover={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
              >
                <SmartImage
                  src="/images/me.jpg"
                  alt={`Portrait of ${profile.name}`}
                  className="aspect-[4/5] w-full object-cover rounded-lg border border-border shadow-card-lg"
                  fallback={
                    <span className="font-display font-semibold text-8xl text-primary/40">M</span>
                  }
                />
              </m.div>
            </m.div>
          </div>
        </div>

        {/* Stats strip (Bug 8: derived) */}
        <Reveal>
          <dl className="mt-16 md:mt-20 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:divide-x md:divide-border">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col-reverse gap-1.5 md:px-8 md:first:pl-0 md:last:pr-0">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="font-display font-semibold text-3xl md:text-4xl text-primary">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </m.div>
    </section>
  );
}
