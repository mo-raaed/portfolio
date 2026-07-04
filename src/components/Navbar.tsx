import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/profile';
import type { Theme } from '../hooks/useTheme';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Journey' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* Bug 3: mobile menu closes on Escape (focus returns to the hamburger)
     and on any click outside the nav. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-md bg-primary-solid text-white font-display font-semibold flex items-center justify-center text-sm"
          >
            M
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {profile.domain}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-flex bg-primary-solid text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:brightness-110 transition-[filter]"
          >
            Get in touch
          </a>
          {/* Mobile hamburger (Bug 3) */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            className="md:hidden p-2 rounded-full border border-border text-foreground hover:text-primary transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
