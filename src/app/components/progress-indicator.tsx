import { useEffect, useState } from 'react';
import { motion, useScroll } from 'motion/react';

interface ProgressIndicatorProps {
  sections: string[];
}

export function ProgressIndicator({ sections }: ProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const updateActiveSection = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = scrollTop / (documentHeight - windowHeight);
      
      const sectionIndex = Math.min(
        Math.floor(scrollPercentage * sections.length),
        sections.length - 1
      );
      
      setActiveSection(sectionIndex);
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
    
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [sections.length]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const element = document.getElementById(section.toLowerCase().replace(/\s+/g, '-'));
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-end"
          >
            {/* Section Label - appears on hover */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-10 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#2F3B40',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              {section}
            </motion.span>

            {/* Dot Indicator */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'scale-150' : 'scale-100 opacity-40'
              }`}
              style={{
                backgroundColor: activeSection === index ? '#0E4E68' : '#2F3B40',
              }}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute -left-1 top-0 w-0.5 rounded-full"
        style={{
          height: '100%',
          backgroundColor: 'rgba(14, 78, 104, 0.1)',
        }}
      >
        <motion.div
          style={{
            scaleY: scrollYProgress,
            backgroundColor: '#0E4E68',
          }}
          className="w-full rounded-full origin-top"
        />
      </motion.div>
    </div>
  );
}
