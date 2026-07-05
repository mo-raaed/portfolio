export type ProjectStatus = 'live' | 'in-progress' | 'local';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  status: ProjectStatus;
  /** Featured projects render full-width at the top of the Projects section. */
  featured?: boolean;
}

export interface TimelineEvent {
  id: string;
  /** ISO-parsable for sorting (YYYY-MM-DD) */
  sortDate: string;
  /** Human-readable label */
  displayDate: string;
  title: string;
  role: string;
  description: string;
  icon: 'project' | 'work' | 'education' | 'award' | 'volunteering';
  /** Marks an in-flight milestone: renders a pulsing "ongoing" chip. */
  ongoing?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
}
