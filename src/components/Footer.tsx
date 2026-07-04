import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      <div>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
      <div className="flex gap-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
