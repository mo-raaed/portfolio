import { useState, useEffect } from 'react';
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
  Compass
} from 'lucide-react';

// Custom SVG Icons for Brands (since Lucide v0.400+ does not include brand icons)
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Project interface definition
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  accent: string; // Gradient color configuration
}

// Timeline event interface
interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  role: string;
  description: string;
  icon: 'project' | 'work' | 'education' | 'award' | 'volunteering';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Sync state with HTML class list and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync with system preference changes if user hasn't manually selected
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Projects data loaded from CV
  const projects: Project[] = [
    {
      id: 'gradify',
      title: 'Gradify 2.0',
      category: 'Academic Web Application',
      description: 'An advanced full-stack GPA calculator and simulation hub built specifically for AUIS students. Reads transcripts, separates courses by semester, manages retakes, and synchronizes state across devices.',
      stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
      live: 'https://gradify.netlify.app',
      accent: 'from-sky-500 to-indigo-500',
    },
    {
      id: 'ghi-prediction',
      title: 'GHI Predicting Neural Networks',
      category: 'Machine Learning Research',
      description: 'Designed and trained four neural network architectures (FFNN, CFNN, LSTM, EMNN) to forecast Global Horizontal Irradiance (GHI) in Oman using cyclical encoding, lag features, and satellite data.',
      stack: ['Python', 'TensorFlow', 'Scikit-learn', 'GroupKFold'],
      github: 'https://github.com/mo-raaed/CNN-Architecture-Evaluator',
      accent: 'from-amber-500 to-orange-500',
    },
    {
      id: 'predictive-maintenance',
      title: 'Rotordynamic Sensor Fusion Framework',
      category: 'Mechatronics & Signal Processing',
      description: 'Research track lead for a mechatronics system fusing a MEMS accelerometer (ADXL354) and high-frequency PZT sensor (Bosch KS4-P) for dual-path machinery fault diagnostics. Designed analog front-end signal conditioning and digital filters (FFT and Hilbert envelope analysis) on ESP32.',
      stack: ['Sensor Fusion', 'Analog Front-End', 'Signal Processing', 'ESP32', 'FFT & Hilbert'],
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'schedule-maker',
      title: 'Atmospheric Schedule Maker',
      category: 'Utility Web Application',
      description: 'Weekly task planner and organizer that schedules tasks dynamically and exports custom calendars into download-ready high-quality PNG or PDF formats.',
      stack: ['React', 'TypeScript', 'Convex', 'Clerk Auth', 'Tailwind CSS'],
      live: 'https://github.com/mo-raaed/schedule-maker', 
      accent: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'rag-assistant',
      title: 'AUIS Academic Catalog RAG Assistant',
      category: 'Local AI System',
      description: 'A fully offline, local RAG question-answering tool. Reads the AUIS Academic Catalog, parses PDF data, retrieves vector embeddings via ChromaDB, and performs inference using quantized Phi-3-mini locally.',
      stack: ['Python', 'Phi-3-mini', 'ChromaDB', 'Gradio', 'CUDA'],
      accent: 'from-violet-500 to-purple-500',
    },
    {
      id: 'gamut',
      title: 'Gamut Photo Scopes Lab',
      category: 'WebGL Visualization',
      description: 'WebGL-accelerated image analysis playground featuring high-performance histograms, waveforms, vectorscopes, and real-time contrast/gamma tuning.',
      stack: ['React', 'TypeScript', 'WebGL', 'Vite'],
      github: 'https://github.com/mo-raaed/gamut',
      accent: 'from-rose-500 to-pink-500',
    },
    {
      id: 'stereo-depth',
      title: 'Stereo Depth Computer Vision',
      category: 'Computer Vision',
      description: 'Depth estimation engine using block-matching algorithms and camera calibration systems to process stereo imagery and output spatial depth maps.',
      stack: ['Python', 'OpenCV', 'NumPy', 'Camera Calibration'],
      github: 'https://github.com/mo-raaed/StereoDepth-CV',
      accent: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'emotion-music',
      title: 'Emotion-Adaptive Music Player',
      category: 'Computer Vision & AI',
      description: 'Facial expression analyzer using ResNet-18 trained on FER2013. Detects emotion in real-time from webcam feed and triggers context-aware playlist adjustments using a smoothing window.',
      stack: ['Python', 'PyTorch', 'ResNet-18', 'OpenCV'],
      accent: 'from-fuchsia-500 to-pink-500',
    }
  ];

  // Timeline chronology: Earliest (Gradify 2.0 in 2025) to Latest (Capstone in 2026)
  const timelineEvents: TimelineEvent[] = [
    {
      id: 't1',
      date: 'Early 2025',
      title: 'Gradify 2.0 Launched',
      role: 'Full-stack Developer',
      description: 'Designed and deployed the initial version of Gradify, helping fellow students easily import transcripts and calculate GPAs.',
      icon: 'project'
    },
    {
      id: 't2',
      date: 'Mid 2024',
      title: 'VEX Robotics Head Scorekeeper',
      role: 'Volunteering',
      description: 'Organized and refereed match records for the national VEX Robotics tournament held on the AUIS campus.',
      icon: 'volunteering'
    },
    {
      id: 't3',
      date: 'Late 2024',
      title: 'AUIS Admissions & Podcast',
      role: 'Volunteering Award',
      description: 'Completed over 50 hours of verified volunteering, assisting registrar data compilation and filming/editing campus podcast series.',
      icon: 'volunteering'
    },
    {
      id: 't4',
      date: 'Jan 2025',
      title: 'Shift Agency Video Intern',
      role: 'Video Editor & Filmmaker',
      description: 'Managed production lifecycles and edited cinematic videos for corporate clients using DaVinci Resolve.',
      icon: 'work'
    },
    {
      id: 't5',
      date: 'Mid 2025',
      title: 'Certified Document Control (CDCS)',
      role: 'Professional Certification',
      description: 'Acquired professional certification as a Document Control Specialist, key for operations in engineering sectors.',
      icon: 'award'
    },
    {
      id: 't6',
      date: 'Late 2025',
      title: 'GHI Solar Prediction Research',
      role: 'AI Researcher',
      description: 'Engineered deep neural network predictors for GHI forecasting, laying foundations for an upcoming academic publication.',
      icon: 'project'
    },
    {
      id: 't7',
      date: '2026',
      title: 'Capstone: Sensor Fusion Framework',
      role: 'Research Lead',
      description: 'Spearheading signal analysis and MEMS-PZT sensor fusion for rotating machinery condition monitoring in the engineering domain.',
      icon: 'project'
    }
  ];

  const skillGroups = [
    {
      category: "AI, Machine Learning & Vision",
      skills: ["TensorFlow", "PyTorch", "Neural Networks", "LSTM", "CNN", "RAG Systems", "LLMs", "OpenCV", "Computer Vision"]
    },
    {
      category: "Web & Core Programming",
      skills: ["TypeScript", "Python", "React", "Vite", "Tailwind CSS v4", "Convex", "Clerk Auth", "WebGL", "MATLAB"]
    },
    {
      category: "Operations & Industry Skills",
      skills: ["Document Control (CDCS)", "Project Management", "Git / GitHub", "Data Preprocessing", "Video Production", "Photography"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* 1. TOP NAVBAR (Glassmorphism + Dynamic Ambient Shadow) */}
      <nav className="fixed top-0 w-full z-50 glass shadow-tonal dark:shadow-ambient transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
              M
            </div>
            <a href="#" className="text-xl font-bold tracking-tighter text-foreground hover:opacity-80 transition-opacity">
              mo-alyousif.com
            </a>
          </div>

          <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-tight">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#timeline" className="hover:text-primary transition-colors">Journal</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-surface-container-high dark:bg-surface-container-highest hover:text-primary transition-all duration-200 active:scale-95"
              aria-label="Toggle theme mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a 
              href="#contact" 
              className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-semibold text-xs px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all btn-glow"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Off-center Asymmetric Layout) */}
      <section id="about" className="pt-32 pb-24 md:pt-48 md:pb-36 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
        {/* Decorative Blurred Gradient Aura */}
        <div className="absolute top-1/4 right-1/10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse duration-10000" />
        <div className="absolute bottom-10 left-1/4 w-60 h-60 rounded-full bg-accent/15 blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-xs font-semibold text-primary tracking-wide uppercase border border-border">
              <Compass size={14} className="animate-spin" />
              AI & Robotics Engineer
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] max-w-3xl">
              Building intelligent tools for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">practical engineering</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
              I am Mohammed Al-Yousif, an Artificial Intelligence and Robotics Engineering student at AUIS. I develop high-performance software, train custom neural network predictors, and build intelligent workflows designed to address real-world industrial and operational challenges.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#projects" 
                className="bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-semibold px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all btn-glow flex items-center gap-2"
              >
                View My Work
                <ChevronRight size={16} />
              </a>
              <a 
                href="/cv/Mohammed_AlYousif_CV.pdf" 
                download
                className="bg-surface-container text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface-container-high active:scale-95 transition-all border border-border flex items-center gap-2"
              >
                Review CV
                <FileText size={16} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-8 border border-border space-y-6 lg:mt-6 shadow-tonal dark:shadow-ambient">
            <h3 className="text-lg font-bold tracking-tight text-foreground border-b border-border pb-4">Overview Profile</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Education</span>
                <span className="text-foreground text-right">AUIS (AI & Robotics B.Sc.)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground text-right">Basra / Sulaimani, Iraq</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Focus</span>
                <span className="text-foreground text-right">Machine Learning & Web Systems</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Industry Target</span>
                <span className="text-foreground text-right">Oil & Gas Operations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE CONVEYOR BELT SECTION (Infinite Slider) */}
      <section id="timeline" className="py-16 bg-surface-container-low border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Career & Project Log</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">Infinite Chronological Timeline</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-medium">
              A scrolling log of my academic projects, freelance video editing work, certifications, and volunteering activities. Hover to pause.
            </p>
          </div>
        </div>

        {/* Outer Marquee Container */}
        <div className="relative w-full flex items-center py-4">
          <div className="animate-marquee gap-6 pr-6">
            {/* First Set of Items */}
            {timelineEvents.map((event) => (
              <div 
                key={event.id} 
                className="w-80 flex-shrink-0 bg-surface rounded-xl p-6 border border-border shadow-tonal dark:shadow-ambient hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-surface-container-high">
                      {event.date}
                    </span>
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
            
            {/* Duplicated Set for Infinite Effect */}
            {timelineEvents.map((event) => (
              <div 
                key={`${event.id}-dup`} 
                className="w-80 flex-shrink-0 bg-surface rounded-xl p-6 border border-border shadow-tonal dark:shadow-ambient hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-surface-container-high">
                      {event.date}
                    </span>
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

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Showcase</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mt-1">Featured Engineering Projects</h3>
        </div>

        {/* 2-Column Responsive Card Grid (No dividers, layout separation via backgrounds) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group bg-surface-container-low rounded-xl p-8 border border-border hover:bg-surface-container transition-all duration-300 shadow-tonal dark:shadow-ambient hover-lift flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-surface-container-high px-3 py-1 rounded-md border border-border">
                    {project.category}
                  </span>
                  
                  {/* Decorative Gradient Capsule */}
                  <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${project.accent}`} />
                </div>
                
                <h4 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {project.description}
                </p>
                
                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-container-highest text-foreground border border-border/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project CTA Links */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-border/10">
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink size={14} />
                    Live Site
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-foreground flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Repository
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SKILLS & CERTIFICATIONS SECTION (Celestial Chips) */}
      <section id="skills" className="py-24 bg-surface-container-low border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Competencies</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">Acquired Skills & Certifications</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillGroups.map((group, idx) => (
              <div 
                key={idx} 
                className="bg-surface rounded-xl p-8 border border-border shadow-tonal dark:shadow-ambient flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg tracking-tight mb-6 text-foreground flex items-center gap-2 border-b border-border pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    {group.category}
                  </h4>
                  
                  {/* Flex Wrapping Chips (Celestial Glow style) */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3.5 py-1.5 text-sm rounded-full bg-surface-container-high text-muted-foreground font-medium border border-border/20 transition-all duration-200 cursor-default hover:text-primary hover:border-primary/40 dark:hover:bg-primary/5 chip-glow"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Control and Other Major Accreditations */}
          <div className="mt-12 bg-surface rounded-xl p-8 border border-border shadow-tonal dark:shadow-ambient max-w-4xl mx-auto">
            <h4 className="font-bold text-xl tracking-tight mb-6 text-center text-foreground flex items-center justify-center gap-2">
              <Award className="text-primary" />
              Verified Professional Accreditations
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
        </div>
      </section>

      {/* 6. CONTACT & FOOTER */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-tr from-surface-container-low to-surface rounded-xl p-8 md:p-16 border border-border shadow-tonal dark:shadow-ambient grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Contact Channel</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none text-foreground">
              Let's build something next.
            </h3>
            <p className="text-muted-foreground font-medium max-w-md leading-relaxed text-sm md:text-base">
              I am open to discussions on machine learning applications, predictive maintenance systems, engineering consultancy tools, and custom software systems.
            </p>
            
            <div className="space-y-4 pt-4 text-sm font-semibold">
              <a href="mailto:m7md.raaed@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors text-foreground">
                <Mail size={16} className="text-primary" />
                m7md.raaed@gmail.com
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active Freelance & Research Engagement
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-surface-container-low p-8 rounded-lg border border-border">
            <h4 className="font-bold text-lg text-foreground">Reference Verification</h4>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              If you require a copy of my curriculum vitae or certificates, they can be obtained below or requested via email.
            </p>
            <div className="grid grid-cols-1 gap-3">
              <a 
                href="/cv/Mohammed_AlYousif_CV.pdf" 
                download
                className="w-full bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full text-center hover:brightness-110 active:scale-95 transition-all text-xs btn-glow flex items-center justify-center gap-2"
              >
                <FileText size={14} />
                Download CV (PDF)
              </a>
            </div>
            <div className="flex justify-center gap-6 pt-4 text-muted-foreground text-sm font-medium border-t border-border/10">
              <a href="https://github.com/mo-raaed" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <GithubIcon className="w-4 h-4 text-muted-foreground hover:text-primary" /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <LinkedinIcon className="w-4 h-4 text-muted-foreground hover:text-primary" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Mohammed Al-Yousif. All Rights Reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Credits</a>
        </div>
      </footer>

    </div>
  );
}
