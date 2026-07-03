import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Mail,
  ExternalLink,
  FileText,
  Cpu,
  Briefcase,
  Award,
  GraduationCap,
  ChevronRight,
  Compass,
  Menu,
  X,
  Wrench
} from 'lucide-react';

// Custom SVG Icons for Brands
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Scroll reveal hook ───
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

// ─── Types ───
type ProjectStatus = 'live' | 'in-progress' | 'local';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  status: ProjectStatus;
  accent: string;
}

interface TimelineEvent {
  id: string;
  sortDate: string; // ISO-parsable for sorting (YYYY-MM-DD)
  displayDate: string; // Human-readable label
  title: string;
  role: string;
  description: string;
  icon: 'project' | 'work' | 'education' | 'award' | 'volunteering';
}

// ─── Status indicator component ───
function StatusDot({ status }: { status: ProjectStatus }) {
  const config = {
    'live': { color: 'bg-emerald-500', label: 'Live' },
    'in-progress': { color: 'bg-amber-400', label: 'In Progress' },
    'local': { color: 'bg-muted-foreground/40', label: 'Local / Offline' },
  };
  const c = config[status];
  return (
    <div className="flex items-center gap-1.5" title={c.label}>
      <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{c.label}</span>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#timeline', label: 'Journal' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  // ─── Projects ───
  const projects: Project[] = [
    {
      id: 'gradify',
      title: 'Gradify 2.0',
      category: 'Academic Web Application',
      description: 'A GPA calculator built for AUIS students — import your transcript PDF, simulate grade changes, track retakes, and sync across devices. No manual data entry needed.',
      stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
      live: 'https://gradify.netlify.app',
      status: 'live',
      accent: 'from-sky-500 to-indigo-500',
    },
    {
      id: 'ghi-prediction',
      title: 'GHI Predicting Neural Networks',
      category: 'Machine Learning Research',
      description: 'Trained four neural network architectures to forecast solar irradiance across 8 locations in Oman. Uses satellite weather data and custom feature engineering to predict energy output.',
      stack: ['Python', 'TensorFlow', 'Scikit-learn', 'GroupKFold'],
      github: 'https://github.com/mo-raaed/CNN-Architecture-Evaluator',
      status: 'in-progress',
      accent: 'from-amber-500 to-orange-500',
    },
    {
      id: 'sensor-fusion',
      title: 'Rotordynamic Sensor Fusion Framework',
      category: 'Mechatronics & Signal Processing',
      description: 'A dual-sensor condition monitoring system for rotating machinery. Fuses MEMS accelerometer and PZT knock sensor data through custom analog conditioning and digital fault analysis (FFT, Hilbert envelope) on ESP32.',
      stack: ['Sensor Fusion', 'Analog Front-End', 'ESP32', 'FFT & Hilbert', 'MATLAB'],
      status: 'in-progress',
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'schedule-maker',
      title: 'Weekly Schedule Builder',
      category: 'Utility Web Application',
      description: 'Plan your weekly routine by dropping in fixed tasks — the app builds a clean, organized calendar and lets you export it as a high-quality PNG or PDF.',
      stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
      live: 'https://schedule.neuralsun.systems/',
      status: 'live',
      accent: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'rag-assistant',
      title: 'AUIS Academic Catalog RAG Assistant',
      category: 'Local AI System',
      description: 'An AI assistant that answers student questions about the university catalog in natural language — runs entirely offline on a laptop with no cloud APIs. Uses vector search and a quantized language model.',
      stack: ['Python', 'Phi-3-mini', 'ChromaDB', 'Gradio', 'CUDA'],
      status: 'local',
      accent: 'from-violet-500 to-purple-500',
    },
    {
      id: 'gamut',
      title: 'Gamut Photo Scopes Lab',
      category: 'WebGL Visualization',
      description: 'A browser-based photo analysis tool with GPU-accelerated scopes — histogram, waveform, and vectorscope — for photographers who want to inspect exposure and color without desktop software.',
      stack: ['React', 'TypeScript', 'WebGL', 'Vite'],
      github: 'https://github.com/mo-raaed/gamut',
      status: 'live',
      accent: 'from-rose-500 to-pink-500',
    },
    {
      id: 'stereo-depth',
      title: 'Stereo Depth Computer Vision',
      category: 'Computer Vision',
      description: 'Generates spatial depth maps from stereo image pairs using block-matching algorithms and camera calibration — turning two flat photos into a 3D depth representation.',
      stack: ['Python', 'OpenCV', 'NumPy', 'Camera Calibration'],
      github: 'https://github.com/mo-raaed/StereoDepth-CV',
      status: 'local',
      accent: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'emotion-music',
      title: 'Emotion-Adaptive Music Player',
      category: 'Computer Vision & AI',
      description: 'Reads your facial expression through a webcam in real-time and automatically switches playlists to match your mood. Uses a neural network trained on 35,000+ face images.',
      stack: ['Python', 'PyTorch', 'ResNet-18', 'OpenCV'],
      status: 'local',
      accent: 'from-fuchsia-500 to-pink-500',
    }
  ];

  // ─── Timeline (auto-sorted by sortDate) ───
  const timelineEvents: TimelineEvent[] = ([
    {
      id: 't-vex',
      sortDate: '2024-06-01',
      displayDate: 'Mid 2024',
      title: 'VEX Robotics Head Scorekeeper',
      role: 'Volunteering',
      description: 'Organized and refereed match records for the national VEX Robotics tournament held on the AUIS campus.',
      icon: 'volunteering'
    },
    {
      id: 't-admissions',
      sortDate: '2024-10-01',
      displayDate: 'Late 2024',
      title: 'AUIS Admissions & Podcast',
      role: 'Volunteering Award',
      description: 'Completed over 50 hours of verified volunteering, assisting registrar data and filming/editing campus podcast series.',
      icon: 'volunteering'
    },
    {
      id: 't-shift',
      sortDate: '2025-01-15',
      displayDate: 'Jan 2025',
      title: 'Shift Agency Video Intern',
      role: 'Video Editor & Filmmaker',
      description: 'Managed production lifecycles and edited cinematic videos for corporate clients using DaVinci Resolve.',
      icon: 'work'
    },
    {
      id: 't-gradify',
      sortDate: '2025-03-01',
      displayDate: 'Early 2025',
      title: 'Gradify 2.0 Launched',
      role: 'Full-stack Developer',
      description: 'Designed and deployed a full-stack GPA tool actively used by AUIS students for transcript import and grade simulation.',
      icon: 'project'
    },
    {
      id: 't-cdcs',
      sortDate: '2025-06-01',
      displayDate: 'Mid 2025',
      title: 'Certified Document Control (CDCS)',
      role: 'Professional Certification',
      description: 'Acquired professional certification as a Document Control Specialist, key for operations in engineering sectors.',
      icon: 'award'
    },
    {
      id: 't-ghi',
      sortDate: '2025-10-01',
      displayDate: 'Late 2025',
      title: 'GHI Solar Prediction Research',
      role: 'AI Researcher',
      description: 'Engineered deep neural network predictors for solar irradiance forecasting, contributing to an upcoming academic publication.',
      icon: 'project'
    },
    {
      id: 't-capstone',
      sortDate: '2026-01-15',
      displayDate: '2026',
      title: 'Capstone: Sensor Fusion Framework',
      role: 'Research Lead',
      description: 'Leading MEMS-PZT sensor fusion research for rotating machinery condition monitoring in the energy and oil operations domain.',
      icon: 'project'
    }
  ] satisfies TimelineEvent[]).sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());

  const skillGroups = [
    { category: "AI, Machine Learning & Vision", skills: ["TensorFlow", "PyTorch", "Neural Networks", "LSTM", "CNN", "RAG Systems", "LLMs", "OpenCV", "Computer Vision"] },
    { category: "Web & Core Programming", skills: ["TypeScript", "Python", "React", "Vite", "Tailwind CSS v4", "Convex", "Clerk Auth", "WebGL", "MATLAB"] },
    { category: "Operations & Industry Skills", skills: ["Document Control (CDCS)", "Project Management", "Git / GitHub", "Data Preprocessing", "Video Production", "Photography"] }
  ];

  // Placeholder currently-working-on items
  const currentWork = [
    { label: 'Senior Design Capstone — Sensor Fusion Framework', status: 'Active' },
    { label: 'Solar Irradiance ANN — Manuscript Drafting', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* ━━━ NAVBAR ━━━ */}
      <nav className="fixed top-0 w-full z-50 glass shadow-tonal dark:shadow-ambient transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">M</div>
            <a href="#" className="text-xl font-bold tracking-tighter text-foreground hover:opacity-80 transition-opacity">mo-alyousif.com</a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-tight">
            {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>)}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-surface-container-high dark:bg-surface-container-highest hover:text-primary transition-all duration-200 active:scale-95" aria-label="Toggle theme mode">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="#contact" className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-semibold text-xs px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all btn-glow">Get In Touch</a>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full bg-surface-container-high hover:text-primary transition-all active:scale-95" aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border/10 last:border-0">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-28 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-60 h-60 rounded-full bg-accent/15 blur-3xl -z-10" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-xs font-semibold text-primary tracking-wide uppercase border border-border">
                <Compass size={14} className="animate-gentle-pulse" />
                AI & Robotics Engineer
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] max-w-3xl">
                From neural networks to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">rotordynamic sensors</span>.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
                I'm Mohammed Al-Yousif — I build deployed web tools, train custom ML models, and design mechatronic sensor systems. Currently finishing my B.Sc. at AUIS and targeting AI-driven roles in the energy sector.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#projects" className="bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-semibold px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all btn-glow flex items-center gap-2">
                  View My Work <ChevronRight size={16} />
                </a>
                <a href="/cv/Mohammed_AlYousif_CV.pdf" download className="bg-surface-container text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface-container-high active:scale-95 transition-all border border-border flex items-center gap-2">
                  Download CV <FileText size={16} />
                </a>
              </div>
            </div>

            {/* Quick stats sidebar */}
            <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-8 border border-border space-y-6 lg:mt-6 shadow-tonal dark:shadow-ambient">
              <h3 className="text-lg font-bold tracking-tight text-foreground border-b border-border pb-4">At a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-surface-container rounded-lg border border-border/10">
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Deployed Apps</p>
                </div>
                <div className="text-center p-3 bg-surface-container rounded-lg border border-border/10">
                  <p className="text-2xl font-bold text-primary">8</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Total Projects</p>
                </div>
                <div className="text-center p-3 bg-surface-container rounded-lg border border-border/10">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Research Papers</p>
                </div>
                <div className="text-center p-3 bg-surface-container rounded-lg border border-border/10">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Volunteer Hours</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ━━━ CURRENTLY WORKING ON ━━━ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <RevealSection>
          <div className="bg-surface-container-low rounded-xl p-6 border border-border shadow-tonal dark:shadow-ambient">
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={16} className="text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Currently Working On</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {currentWork.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface rounded-lg px-4 py-3 border border-border/10 flex-1">
                  <span className="flex h-2 w-2 relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ━━━ PROJECTS (before timeline) ━━━ */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <RevealSection>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Showcase</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mt-1">Featured Engineering Projects</h3>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <RevealSection key={project.id} className={`delay-${i * 50}`}>
              <div className="group bg-surface-container-low rounded-xl p-8 border border-border hover:bg-surface-container transition-all duration-300 shadow-tonal dark:shadow-ambient hover-lift flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-surface-container-high px-3 py-1 rounded-md border border-border">{project.category}</span>
                    <StatusDot status={project.status} />
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-container-highest text-foreground border border-border/10">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-6 mt-6 border-t border-border/10">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                      <ExternalLink size={14} /> Live Site
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-foreground flex items-center gap-1 hover:text-primary transition-colors">
                      <GithubIcon className="w-3.5 h-3.5" /> Repository
                    </a>
                  )}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ━━━ TIMELINE CONVEYOR BELT (after projects) ━━━ */}
      <section id="timeline" className="py-16 bg-surface-container-low border-y border-border overflow-hidden">
        <RevealSection>
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Career & Project Log</h2>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">Chronological Timeline</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-md font-medium">A scrolling log of projects, certifications, and milestones — sorted oldest to newest. Hover to pause.</p>
            </div>
          </div>
        </RevealSection>

        <div className="relative w-full flex items-center py-4">
          <div className="animate-marquee gap-6 pr-6">
            {[...timelineEvents, ...timelineEvents].map((event, i) => (
              <div key={`${event.id}-${i}`} className="w-80 flex-shrink-0 bg-surface rounded-xl p-6 border border-border shadow-tonal dark:shadow-ambient hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-surface-container-high">{event.displayDate}</span>
                    <span className="text-muted-foreground/30">
                      {event.icon === 'project' && <Cpu size={16} />}
                      {event.icon === 'work' && <Briefcase size={16} />}
                      {event.icon === 'award' && <Award size={16} />}
                      {event.icon === 'volunteering' && <GraduationCap size={16} />}
                    </span>
                  </div>
                  <h4 className="font-bold text-base tracking-tight text-foreground mb-1">{event.title}</h4>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{event.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SKILLS & CERTIFICATIONS ━━━ */}
      <section id="skills" className="py-24 bg-surface-container-low border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection>
            <div className="mb-16 text-center">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Competencies</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">Acquired Skills & Certifications</h3>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <RevealSection key={idx}>
                <div className="bg-surface rounded-xl p-8 border border-border shadow-tonal dark:shadow-ambient flex flex-col justify-between h-full">
                  <div>
                    <h4 className="font-bold text-lg tracking-tight mb-6 text-foreground flex items-center gap-2 border-b border-border pb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map(skill => (
                        <span key={skill} className="px-3.5 py-1.5 text-sm rounded-full bg-surface-container-high text-muted-foreground font-medium border border-border/20 transition-all duration-200 cursor-default hover:text-primary hover:border-primary/40 dark:hover:bg-primary/5 chip-glow">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div className="mt-12 bg-surface rounded-xl p-8 border border-border shadow-tonal dark:shadow-ambient max-w-4xl mx-auto">
              <h4 className="font-bold text-xl tracking-tight mb-6 text-center text-foreground flex items-center justify-center gap-2">
                <Award className="text-primary" /> Verified Professional Accreditations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-surface-container-low rounded-lg border border-border">
                  <p className="font-bold text-foreground text-sm">Certified Document Control</p>
                  <p className="text-xs font-semibold text-primary mt-1">CDCS Certification</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-border">
                  <p className="font-bold text-foreground text-sm">Project Management Foundations</p>
                  <p className="text-xs font-semibold text-primary mt-1">Coursera / PM</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-border">
                  <p className="font-bold text-foreground text-sm">Project Initiation Credentials</p>
                  <p className="text-xs font-semibold text-primary mt-1">Coursera / Google</p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <RevealSection>
          <div className="bg-gradient-to-tr from-surface-container-low to-surface rounded-xl p-8 md:p-16 border border-border shadow-tonal dark:shadow-ambient grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Contact Channel</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none text-foreground">Let's build something next.</h3>
              <p className="text-muted-foreground font-medium max-w-md leading-relaxed text-sm md:text-base">
                Open to discussions on machine learning applications, condition monitoring systems, engineering tools, and full-stack software development.
              </p>
              <div className="space-y-4 pt-4 text-sm font-semibold">
                <a href="mailto:m7md.raaed@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors text-foreground">
                  <Mail size={16} className="text-primary" /> m7md.raaed@gmail.com
                </a>
                <div className="flex items-center gap-3 text-foreground">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Active Freelance & Research Engagement
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-surface-container-low p-8 rounded-lg border border-border">
              <h4 className="font-bold text-lg text-foreground">Resume & Links</h4>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Download my curriculum vitae or find me on GitHub and LinkedIn.
              </p>
              <a href="/cv/Mohammed_AlYousif_CV.pdf" download className="w-full bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full text-center hover:brightness-110 active:scale-95 transition-all text-xs btn-glow flex items-center justify-center gap-2">
                <FileText size={14} /> Download CV (PDF)
              </a>
              <div className="flex justify-center gap-6 pt-4 text-muted-foreground text-sm font-medium border-t border-border/10">
                <a href="https://github.com/mo-raaed" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/mohammed-al-yousif-495989297/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-12 border-t border-border max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <div>© {new Date().getFullYear()} Mohammed Al-Yousif. All Rights Reserved.</div>
        <div className="flex gap-6">
          <a href="https://github.com/mo-raaed" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/mohammed-al-yousif-495989297/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}
