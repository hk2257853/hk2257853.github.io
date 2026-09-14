/**
 * App - Root component.
 * Orchestrates the scroll journey, manages active section state,
 * and renders the SystemMap + all sections.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { SystemMap } from './components/common/SystemMap/SystemMap';
import { TeachingMoment } from './components/common/TeachingMoment/TeachingMoment';
import { GridBackground } from './components/effects/GridBackground/GridBackground';
import { ParticleCanvas } from './components/effects/ParticleCanvas/ParticleCanvas';
import { RateLimitOverlay } from './components/effects/RateLimitOverlay/RateLimitOverlay';
import { KonamiOverlay } from './components/effects/KonamiOverlay/KonamiOverlay';
import { LandingPage } from './components/sections/LandingPage/LandingPage';
import { EntryPoint } from './components/sections/EntryPoint/EntryPoint';
import { ApiGateway } from './components/sections/ApiGateway/ApiGateway';
import { Microservices } from './components/sections/Microservices/Microservices';
import { AutoScaler } from './components/sections/AutoScaler/AutoScaler';
import { CacheHit } from './components/sections/CacheHit/CacheHit';
import { Response } from './components/sections/Response/Response';

import styles from './App.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for each section (for ScrollTrigger)
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  // Set up ScrollTrigger for each section
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  // Navigate to a section by ID
  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      // On mobile, offset by the fixed top nav bar height. On desktop, offset is 0.
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      let offsetY = 0;
      if (isMobile) {
        const nav = document.querySelector('[aria-label="Section navigation"]');
        offsetY = nav ? nav.getBoundingClientRect().height : 0;
      }

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY },
        ease: 'power3.inOut',
      });
    }
  }, []);

  return (
    <div className={styles.app}>

      {/* Ambient backgrounds */}
      <GridBackground />
      <ParticleCanvas />

      {/* Easter Eggs */}
      <RateLimitOverlay />
      <KonamiOverlay />

      {/* Global Overlays */}
      <TeachingMoment activeIndex={activeIndex} />
      
      {/* Navigation */}
      <SystemMap activeIndex={activeIndex} onNavigate={handleNavigate} />

      {/* Sections */}
      <LandingPage ref={setSectionRef(0)} />
      <EntryPoint ref={setSectionRef(1)} />
      <ApiGateway ref={setSectionRef(2)} />
      <Microservices ref={setSectionRef(3)} />
      <AutoScaler ref={setSectionRef(4)} />
      <CacheHit ref={setSectionRef(5)} />
      <Response ref={setSectionRef(6)} />

      {/* HTML comment easter egg */}
      {/* If you're reading this source, you're my kind of person. Let's talk. */}
    </div>
  );
}
