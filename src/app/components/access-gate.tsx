import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from './ui-kit';

interface AccessGateProps {
  onAccessGranted: () => void;
}

export function AccessGate({ onAccessGranted }: AccessGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPassword = password.trim().toLowerCase();
    if (normalizedPassword === 'portfolio' || normalizedPassword === 'demo') {
      onAccessGranted();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: '#FBF8F1' }}>
      <div className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center opacity-40 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0E4E68] flex items-center justify-center">
            <span className="text-white text-xs font-bold font-serif">VF</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, color: '#0E4E68' }}>Viviana Fernández</span>
        </div>
      </div>

      <motion.div className="w-full max-w-2xl text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0E4E68]/5 text-[#0E4E68] text-[10px] font-bold tracking-widest uppercase">
            <Lock className="w-3 h-3" /> Protected Presentation
          </div>
          
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 600,
              color: '#0E4E68',
              lineHeight: 1.1,
            }}
          >
            A closer look at <br />strategic execution.
          </h1>

          <p className="text-lg opacity-60 max-w-lg mx-auto leading-relaxed">
            This case study contains confidential work from Viviana's portfolio. Please enter your access code to continue.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              className="w-full pl-8 pr-16 py-6 rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(14,78,104,0.08)] border border-[#0E4E68]/5 focus:border-[#1A8E9F]/30 outline-none transition-all text-center text-lg placeholder:opacity-30"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0E4E68] text-white flex items-center justify-center hover:bg-[#1A8E9F] transition-colors shadow-lg active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {error && (
              <p className="absolute -bottom-8 left-0 w-full text-center text-xs font-bold text-[#D8614E] uppercase tracking-widest">
                Invalid access code
              </p>
            )}
          </form>
        </div>

        <div className="pt-8">
          <a
            href="mailto:vfernandezdieguez@gmail.com"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity no-underline"
          >
            <Mail className="w-3.5 h-3.5" /> Request Access
          </a>
        </div>
      </motion.div>

      <div className="fixed top-[-10%] right-[-10%] w-[40%] aspect-square bg-[#1A8E9F]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-[#D8614E]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <p className="fixed bottom-8 text-[10px] uppercase tracking-[0.4em] opacity-20 text-[#0E4E68]">Demo Code: portfolio</p>
    </div>
  );
}
