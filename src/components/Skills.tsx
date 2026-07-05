import { Check } from 'lucide-react';
import { certifications, skillGroups } from '../data/skills';
import Reveal from './primitives/Reveal';
import SectionHeading from './primitives/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Competencies"
            title="Skills & Certifications"
            className="mb-14 md:mb-20"
          />
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map(group => (
              <div key={group.category} className="border border-border rounded-lg bg-surface p-7">
                <h3 className="font-display font-semibold text-xl tracking-tight text-foreground flex items-center gap-2.5 pb-4 mb-5 border-b border-border">
                  <Check size={18} strokeWidth={3} aria-hidden="true" className="text-accent shrink-0" />
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-full border border-border text-muted-foreground font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 md:gap-6">
            {certifications.map(cert => (
              <div
                key={cert.title}
                className="border border-border rounded-md bg-surface-2/50 p-5 text-center"
              >
                <p className="font-semibold text-sm text-foreground">{cert.title}</p>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mt-1.5">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
