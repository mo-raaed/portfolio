import { Wrench } from 'lucide-react';
import { currentWork } from '../data/profile';
import Reveal from './primitives/Reveal';
import { Parallax } from './primitives/Parallax';

export default function CurrentWork() {
  return (
    <section
      aria-labelledby="current-work-heading"
      className="relative max-w-7xl mx-auto px-6 md:px-10 pb-8"
    >
      {/* Accent shape drifting opposite the card content */}
      <Parallax
        speed={-0.3}
        aria-hidden
        className="pointer-events-none absolute -z-10 right-8 -top-6 w-40 h-40 rounded-full bg-accent/10 blur-2xl"
      >
        <span />
      </Parallax>
      <Reveal>
        <div className="border border-border rounded-lg bg-surface px-5 py-4 md:px-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 shadow-card">
          <h2
            id="current-work-heading"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent shrink-0"
          >
            <Wrench size={14} aria-hidden="true" />
            Currently working on
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {currentWork.map(item => (
              <li
                key={item.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-2/60 px-4 py-1.5 text-sm font-medium text-foreground"
              >
                <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
