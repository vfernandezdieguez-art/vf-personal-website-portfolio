import React, { useState, forwardRef, createElement } from 'react';

// --- MOTOR DE SIMULACIÓN (ZERO-DEPENDENCY) ---
// Reemplaza motion/react para evitar errores de dependencias y asegurar estabilidad.

const SafeRender = (Tag: string) => {
  const Component = forwardRef((props: any, ref: any) => {
    const { 
      initial, animate, exit, transition, variants, whileHover, whileTap, 
      whileInView, viewport, layout, layoutId, onPan, onPanStart, onPanEnd,
      children, ...rest 
    } = props;
    return createElement(Tag, { ...rest, ref }, children);
  });
  Component.displayName = `Motion.${Tag}`;
  return Component;
};

export const motion: any = {
  div: SafeRender('div'),
  span: SafeRender('span'),
  p: SafeRender('p'),
  section: SafeRender('section'),
  article: SafeRender('article'),
  header: SafeRender('header'),
  footer: SafeRender('footer'),
  nav: SafeRender('nav'),
  main: SafeRender('main'),
  aside: SafeRender('aside'),
  button: SafeRender('button'),
  a: SafeRender('a'),
  ul: SafeRender('ul'),
  li: SafeRender('li'),
  h1: SafeRender('h1'),
  h2: SafeRender('h2'),
  h3: SafeRender('h3'),
  h4: SafeRender('h4'),
  h5: SafeRender('h5'),
  h6: SafeRender('h6'),
  img: SafeRender('img'),
  svg: SafeRender('svg'),
  path: SafeRender('path'),
  circle: SafeRender('circle'),
  rect: SafeRender('rect'),
  line: SafeRender('line'),
};

export const AnimatePresence = ({ children }: any) => <>{children}</>;

// --- UI KIT CONSTANTS ---

export const Colors = {
  petroleo: "#0E4E68",
  turquesa: "#1A8E9F",
  coral: "#D8614E",
  marfil: "#FBF8F1",
  marfilDark: "#F3F1EA",
  textDark: "#334155" 
};

export const Typography = {
  title: "font-serif", // Playfair Display
  body: "font-sans",  // Inter
};

// --- COMPONENTS ---

export const Pill = ({ children, className = "" }: any) => (
  <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-[#1A8E9F] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${className}`}>
    {children}
  </div>
);

export const Heading = ({ children, level = 1, className = "" }: any) => {
  const styles: any = {
    1: "text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.0] font-semibold tracking-[-0.04em]",
    2: "text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] font-semibold tracking-[-0.03em]",
    3: "text-[1.5rem] md:text-[2rem] lg:text-[2.25rem] leading-[1.2] font-medium tracking-[-0.02em]",
    4: "text-[1.1rem] lg:text-[1.25rem] leading-[1.3] font-semibold tracking-[-0.01em]"
  };
  const Tag = `h${level}`;
  // Aplicamos un degradado sutil de azul petróleo a un tono ligeramente más claro para dar vibración
  return createElement(Tag, { 
    className: `${Typography.title} bg-gradient-to-br from-[#0E4E68] via-[#0E4E68] to-[#1A8E9F] bg-clip-text text-transparent ${styles[level] || styles[1]} ${className}` 
  }, children);
};

export const BodyText = ({ children, size = "md", className = "" }: any) => {
  const styles: any = {
    sm: "text-[13px] lg:text-[14px] font-normal leading-[1.5] text-[#0E4E68]/60",
    md: "text-[15px] lg:text-[16px] leading-[1.6] font-normal text-[#0E4E68]/70",
    lg: "text-[17px] lg:text-[19px] leading-[1.6] font-normal text-[#0E4E68]/80"
  };
  return <p className={`${Typography.body} ${styles[size] || styles.md} ${className}`}>{children}</p>;
};

export const CardTitle = ({ children, className = "" }: any) => (
  <h4 className={`${Typography.title} text-[#0E4E68] text-[20px] lg:text-[24px] font-medium leading-[1.2] tracking-tight ${className}`}>{children}</h4>
);

export const CardLabel = ({ children, className = "" }: any) => (
  <p className={`${Typography.body} text-[9px] font-black text-[#1A8E9F] uppercase tracking-[0.2em] ${className}`}>{children}</p>
);

export const CardBody = ({ children, className = "" }: any) => (
  <p className={`${Typography.body} text-[14px] lg:text-[15px] text-[#0E4E68]/60 leading-[1.5] ${className}`}>{children}</p>
);

export const BaseCard = ({ children, className = "", hover = true }: any) => (
  <motion.div className={`bg-white/50 backdrop-blur-[16px] rounded-[24px] border border-white/60 p-5 lg:p-6 relative overflow-hidden group ${hover ? 'hover:bg-white/80' : ''} ${className}`}>
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#1A8E9F]/5 to-[#D8614E]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export const StatItem = ({ value, label, sub }: any) => (
  <motion.div className="text-center space-y-3 p-6 bg-white/40 backdrop-blur-md rounded-[32px] border border-[#0E4E68]/5 shadow-sm">
    <p className={`${Typography.title} text-[36px] lg:text-[72px] text-[#D8614E] leading-none`}>{value}</p>
    <div className="space-y-0.5">
      <p className={`${Typography.body} text-[9px] font-black text-[#0E4E68] uppercase tracking-[0.2em]`}>{label}</p>
      <p className={`${Typography.body} text-[11px] text-[#0E4E68]/40 font-normal`}>{sub}</p>
    </div>
  </motion.div>
);

export const ArtifactCard = ({ art, onClick }: any) => (
  <motion.div onClick={onClick} className="flex flex-col sm:flex-row gap-5 p-6 rounded-[24px] bg-white/50 backdrop-blur-[16px] border border-white/60 hover:bg-white/80 transition-all cursor-zoom-in group relative overflow-hidden">
    <div className="w-full sm:w-28 lg:w-40 aspect-square rounded-xl overflow-hidden relative bg-[#F3F1EA] shrink-0 border border-[#0E4E68]/5">
       <img src={art.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" alt={art.title} />
    </div>
    <div className="flex flex-col justify-center relative z-10">
       <CardLabel className="mb-1">{art.tag}</CardLabel>
       <CardTitle className="mb-2 group-hover:text-[#1A8E9F] transition-colors">{art.title}</CardTitle>
       <CardBody className="line-clamp-3">{art.text}</CardBody>
    </div>
  </motion.div>
);

export const GlobalHeader = ({ logoName }: any) => {
  const [lang, setLang] = useState('EN');
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] lg:h-[70px] px-6 lg:px-12 flex items-center justify-between z-[1000] bg-[#FBF8F1]/60 backdrop-blur-xl border-b border-[#0E4E68]/5">
      <a href="/" className="flex items-center gap-3 no-underline group">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1A8E9F] to-[#0E4E68] flex items-center justify-center text-white text-[10px] font-bold group-hover:scale-110 transition-transform">VF</div>
        <span className={`${Typography.title} text-[#0E4E68] text-[15px] lg:text-[17px] font-medium`}>{logoName}</span>
      </a>
      
      <nav className={`${Typography.body} flex items-center gap-6 lg:gap-8`}>
        <div className="hidden md:flex items-center gap-6 text-[12px] font-bold tracking-widest uppercase text-[#0E4E68]/50">
          <a href="#" className="text-[#0E4E68] border-b-2 border-[#1A8E9F] pb-1">Work</a>
          <a href="#" className="hover:text-[#0E4E68] transition-colors">Resume</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'EN' ? 'ES' : 'EN')} className="font-black text-[10px] w-7 h-7 rounded-full border border-[#0E4E68]/10 flex items-center justify-center hover:bg-white transition-colors">{lang}</button>
          <button className="bg-[#0E4E68] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#1A8E9F] transition-all shadow-lg shadow-[#0E4E68]/10 active:scale-95">Let's Talk</button>
        </div>
      </nav>
    </header>
  );
};

export const SlideFooter = ({ current, total, label, onPrev, onNext, onRestart }: any) => {
  const isLast = current === total - 1;
  const progress = ((current + 1) / total) * 100;

  return (
    <footer className="fixed bottom-6 left-0 right-0 z-[1000] px-6 lg:px-12 flex justify-center pointer-events-none">
      {/* Floating Navigation Dock */}
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-2xl border border-[#0E4E68]/15 rounded-full p-2 px-4 shadow-[0_20px_50px_rgba(14,78,104,0.15)] pointer-events-auto group">
        
        {/* Progress & Label Group */}
        <div className="flex flex-col items-start pl-4 pr-6 border-r border-[#0E4E68]/5 mr-2">
          <div className={`${Typography.body} flex items-baseline gap-1.5`}>
            <span className="text-[15px] font-black text-[#0E4E68] tracking-tighter">
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold text-[#0E4E68]/20">/</span>
            <span className="text-[11px] font-bold text-[#0E4E68]/30">
              {String(total).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#1A8E9F] leading-none">
            {label}
          </span>
        </div>

        {/* Navigation Arrows (Large & Centralized) */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onPrev} 
            disabled={current === 0} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              current === 0 
              ? 'text-[#0E4E68]/10 opacity-30 cursor-not-allowed' 
              : 'text-[#0E4E68] hover:bg-[#0E4E68] hover:text-white cursor-pointer active:scale-90 shadow-sm hover:shadow-md'
            }`}
            aria-label="Previous slide"
          >
            <SafeIcon icon="ChevronLeft" size={24} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onNext} 
            disabled={current === total - 1} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              current === total - 1 
              ? 'text-[#0E4E68]/10 opacity-30 cursor-not-allowed' 
              : 'text-[#0E4E68] hover:bg-[#0E4E68] hover:text-white cursor-pointer active:scale-90 shadow-sm hover:shadow-md'
            }`}
            aria-label="Next slide"
          >
            <SafeIcon icon="ChevronRight" size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Restart / Final Action */}
        {isLast ? (
          <div className="pl-2 ml-2 border-l border-[#0E4E68]/5">
            <button 
              onClick={onRestart} 
              className="px-5 py-3 rounded-full bg-[#0E4E68] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#1A8E9F] transition-all duration-500 cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
            >
               <SafeIcon icon="RotateCcw" size={14} />
               <span className="hidden sm:inline">RESTART</span>
            </button>
          </div>
        ) : (
          /* Visual Progress Bar - Integrated into Dock */
          <div className="w-20 h-[3px] bg-[#0E4E68]/5 rounded-full overflow-hidden ml-4 mr-4 hidden md:block">
            <div 
              className="h-full bg-gradient-to-r from-[#1A8E9F] to-[#0E4E68] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </footer>
  );
};

export const FullCenteredLayout = ({ children, className = "", centered = false }: any) => (
  <section className={`flex-grow w-full flex flex-col ${centered ? 'justify-center' : 'items-start'} pt-[80px] lg:pt-[100px] pb-[120px] lg:pb-[140px] px-8 lg:px-20 max-w-[1600px] mx-auto min-h-0 ${className}`}>
    <div className={`w-full flex flex-col items-start ${centered ? 'mb-[2vh]' : ''}`}>{children}</div>
  </section>
);

export const SplitLayout = ({ left, right, className = "", ratio = "5:7", centered = false }: any) => {
  const leftSpan = ratio === "5:7" ? "lg:col-span-5" : ratio === "7:5" ? "lg:col-span-7" : "lg:col-span-6";
  const rightSpan = ratio === "5:7" ? "lg:col-span-7" : ratio === "7:5" ? "lg:col-span-5" : "lg:col-span-6";
  return (
    <section className={`flex-grow w-full flex flex-col ${centered ? 'justify-center' : 'items-start'} pt-[80px] lg:pt-[100px] pb-[120px] lg:pb-[140px] px-8 lg:px-20 max-w-[1600px] mx-auto min-h-0 ${className}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-12 w-full gap-12 lg:gap-24 ${centered ? 'items-center' : 'items-start'} ${centered ? 'mb-[2vh]' : ''}`}>
        <div className={`col-span-1 ${leftSpan} flex flex-col`}>
          {left}
        </div>
        <div className={`col-span-1 ${rightSpan} flex items-center justify-center min-h-[400px]`}>
          {right}
        </div>
      </div>
    </section>
  );
};

export const SectionHeader = ({ category, title, description, subtitle, className = "" }: any) => {
  const isCentered = className.includes('text-center');
  return (
    <header className={`space-y-4 lg:space-y-6 w-full ${className}`}>
      <div className="space-y-3">
        <div className={`inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20 mb-2 ${isCentered ? 'mx-auto' : ''}`}>
          <CardLabel className="text-[10px] lg:text-[11px] text-[#1A8E9F] font-black tracking-[0.2em]">{category}</CardLabel>
        </div>
        <Heading level={2} className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.1] tracking-tight">{title}</Heading>
        {subtitle && <p className={`${Typography.body} text-[12px] font-bold text-[#D8614E] uppercase tracking-[0.1em] mt-2`}>{subtitle}</p>}
      </div>
      {description && <BodyText size="lg" className={`max-w-[600px] text-[#0E4E68]/70 ${isCentered ? 'mx-auto' : ''}`}>{description}</BodyText>}
    </header>
  );
};

// Fallback robusto para iconos con soporte de custom SVG
import * as Icons from "lucide-react";

export const SafeIcon = ({ icon, size = 18, className = "" }: any) => {
  // Primero intentamos buscar en un set de iconos customizados con estética Marimekko/Apple
  const customIcons: any = {
    Share2: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="18" cy="5" r="3" fill="currentColor" opacity="0.9" />
        <circle cx="6" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="18" cy="19" r="3" fill="currentColor" opacity="0.9" />
        <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
      </svg>
    ),
    Target: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    Layers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.4" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    MessageSquare: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  };

  if (customIcons[icon]) return customIcons[icon];

  const IconComponent = (Icons as any)[icon];
  if (!IconComponent) {
    return <div className={`inline-block bg-[#0E4E68]/10 rounded-sm ${className}`} style={{ width: size, height: size }} />;
  }
  return <IconComponent size={size} className={className} strokeWidth={1.5} />;
};

export const IconButton = ({ onClick, disabled, icon }: any) => (
  <button onClick={onClick} disabled={disabled} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#0E4E68]/10 text-[#0E4E68] flex items-center justify-center disabled:opacity-20">{icon}</button>
);
