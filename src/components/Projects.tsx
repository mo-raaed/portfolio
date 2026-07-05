import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { projects } from '../data/projects';
import type { Project } from '../types';
import Reveal from './primitives/Reveal';
import SectionHeading from './primitives/SectionHeading';
import StatusDot from './primitives/StatusDot';
import ProjectImage from './primitives/ProjectImage';
import { GithubIcon } from './primitives/icons';

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex gap-5">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          <ExternalLink size={14} aria-hidden="true" /> Live site
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <GithubIcon className="w-4 h-4" /> Repository
        </a>
      )}
    </div>
  );
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map(tag => (
        <li
          key={tag}
          className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CategoryChip({ category }: { category: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-surface-2/70 border border-border px-2.5 py-1 rounded-sm">
      {category}
    </span>
  );
}

/* Featured row: scroll-scrubbed slide-in from the alternating side. Progress
   is tied to scroll position (not a timed reveal), so the entrance tracks how
   far the user has scrolled the article into view. */
function FeaturedProject({ project, idx }: { project: Project; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [idx % 2 === 1 ? 60 : -60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [0, 1]);

  return (
    <m.article ref={ref} style={{ x, opacity }} className="group grid md:grid-cols-2 gap-8 md:gap-14 items-center">
      <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
        <ProjectImage
          project={project}
          tier="featured"
          className="w-full rounded-lg border border-border shadow-card-lg"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <CategoryChip category={project.category} />
          <StatusDot status={project.status} />
        </div>
        <h3 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        <StackChips stack={project.stack} />
        <div className="pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </m.article>
  );
}

/* Grid card: same scroll-scrub, a shorter vertical lift instead of a side slide. */
function GridProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [0, 1]);

  return (
    <m.article
      ref={ref}
      style={{ y, opacity }}
      className="group bg-surface border border-border rounded-lg overflow-hidden shadow-card hover-lift flex flex-col"
    >
      <ProjectImage project={project} tier="grid" className="w-full border-b border-border" />
      <div className="p-6 md:p-7 flex flex-col gap-3.5 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CategoryChip category={project.category} />
          <StatusDot status={project.status} />
        </div>
        <h3 className="font-display font-semibold text-xl md:text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        <StackChips stack={project.stack} />
        <div className="mt-auto pt-4 border-t border-border">
          <ProjectLinks project={project} />
        </div>
      </div>
    </m.article>
  );
}

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="Showcase" title="Featured Engineering Projects" className="mb-14 md:mb-20" />
        </Reveal>

        {/* Featured tier: full-width, alternating */}
        <div className="space-y-16 md:space-y-24 mb-16 md:mb-24">
          {featured.map((project, idx) => (
            <FeaturedProject key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* Grid tier */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {rest.map(project => (
            <GridProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
