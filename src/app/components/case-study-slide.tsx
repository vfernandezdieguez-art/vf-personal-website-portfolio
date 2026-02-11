import { ReactNode } from 'react';
import { motion } from './ui-kit';

interface SlideProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Slide({ id, children, className = '' }: SlideProps) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center px-6 md:px-12 py-20 snap-start relative overflow-hidden ${className}`}
    >
      <motion.div className="w-full max-w-[1440px] z-10">
        {children}
      </motion.div>
    </section>
  );
}

export function AnimatedText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div className={className}>
        {children}
      </motion.div>
    </div>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-[3rem] backdrop-blur-md ${className}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 40px 100px -10px rgba(14, 78, 104, 0.1)',
      }}
    >
      {children}
    </motion.div>
  );
}
