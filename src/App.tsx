import { LazyMotion, MotionConfig } from 'motion/react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurrentWork from './components/CurrentWork';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/primitives/CursorGlow';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <LazyMotion features={() => import('./motionFeatures').then(mod => mod.default)} strict>
      {/* reducedMotion="user": transform/layout animations are disabled for
          prefers-reduced-motion users; opacity fades remain (Bug 1) */}
      <MotionConfig reducedMotion="user">
        {/* No bg here: body carries bg-background so the fixed CursorGlow can
            sit above the canvas yet behind every opaque section/card. */}
        <div className="min-h-screen text-foreground">
          <CursorGlow />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <CurrentWork />
            <Projects />
            <Timeline />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
