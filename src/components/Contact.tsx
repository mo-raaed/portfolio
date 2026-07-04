import { FileText } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal from './primitives/Reveal';
import { GithubIcon, LinkedinIcon } from './primitives/icons';

/**
 * Full-bleed solid-navy panel (dark: surface-2 with rose accents).
 * Explicit warm-stone text (#F8F6F3 = light background token) is intentional:
 * on the navy panel the usual foreground tokens would fail contrast.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-primary-solid dark:bg-surface-2 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F8F6F3]/70 dark:text-accent">
              Contact
            </p>
            <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-[#F8F6F3] dark:text-foreground mt-4">
              Let's build something next.
            </h2>
            <p className="text-[#F8F6F3]/80 dark:text-muted-foreground leading-relaxed mt-6 max-w-xl">
              Open to discussions on machine learning applications, condition monitoring systems,
              engineering tools, and full-stack software development.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="inline-block font-display font-medium italic text-2xl md:text-4xl text-[#F8F6F3] dark:text-foreground underline decoration-[#F8F6F3]/40 dark:decoration-accent/50 decoration-2 underline-offset-8 hover:decoration-[#F8F6F3] dark:hover:decoration-accent transition-colors mt-10"
            >
              {profile.email}
            </a>

            <div className="flex flex-wrap items-center gap-6 mt-12">
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 bg-accent text-white dark:text-background font-semibold text-sm px-7 py-3.5 rounded-full hover:brightness-110 transition-[filter]"
              >
                <FileText size={16} aria-hidden="true" /> Download CV (PDF)
              </a>
              <div className="flex items-center gap-6 text-sm font-semibold">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F8F6F3]/80 dark:text-muted-foreground hover:text-[#F8F6F3] dark:hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F8F6F3]/80 dark:text-muted-foreground hover:text-[#F8F6F3] dark:hover:text-foreground transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            <p className="flex items-center gap-3 text-sm font-medium text-[#F8F6F3]/80 dark:text-muted-foreground mt-10">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Active freelance & research engagement
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
