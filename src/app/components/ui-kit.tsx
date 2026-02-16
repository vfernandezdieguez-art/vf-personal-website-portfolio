import React, { useState, forwardRef, createElement } from 'react';
import { motion as Motion, AnimatePresence as AP } from 'motion/react';

// --- UI KIT CONSTANTS ---
export const motion = Motion;
export const AnimatePresence = AP;

export const Colors = {
  petroleo: "#0E4E68",
  turquesa: "#1A8E9F",
  coral: "#D8614E",
  marfil: "#FBF8F1",
  marfilDark: "#F3F1EA",
  textDark: "#2F3B40" 
};

export const Typography = {
  title: "font-serif", // Playfair Display
  body: "font-sans",  // Inter
};

// --- COMPONENTS ---

export const Pill = ({ children, className = "" }: any) => (
  <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-[#1A8E9F] text-white text-[10px] font-normal uppercase tracking-[0.2em] shadow-sm ${className}`}>
    {children}
  </div>
);

export const Heading = ({ children, level = 1, className = "" }: any) => {
  const styles: any = {
    1: "text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.0] font-normal tracking-[-0.04em]",
    2: "text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] font-normal tracking-[-0.03em]",
    3: "text-[1.5rem] md:text-[2rem] lg:text-[2.25rem] leading-[1.2] font-normal tracking-[-0.02em]",
    4: "text-[1.1rem] lg:text-[1.25rem] leading-[1.3] font-normal tracking-[-0.01em]"
  };
  const Tag = `h${level}`;
  return createElement(Tag, { 
    className: `${Typography.title} text-[#0E4E68] ${styles[level] || styles[1]} ${className}` 
  }, children);
};

export const BodyText = ({ children, size = "md", className = "" }: any) => {
  const styles: any = {
    sm: "text-[13px] lg:text-[14px] font-normal leading-[1.5] text-[#2F3B40]",
    md: "text-[15px] lg:text-[16px] leading-[1.6] font-normal text-[#2F3B40]",
    lg: "text-[17px] lg:text-[19px] leading-[1.6] font-normal text-[#2F3B40]"
  };
  return <p className={`${Typography.body} ${styles[size] || styles.md} ${className}`}>{children}</p>;
};

export const CardTitle = ({ children, className = "" }: any) => (
  <h4 className={`${Typography.title} text-[#0E4E68] text-[20px] lg:text-[24px] font-normal leading-[1.2] tracking-tight ${className}`}>{children}</h4>
);

export const CardLabel = ({ children, className = "" }: any) => (
  <p className={`${Typography.body} text-[9px] font-normal text-[#1A8E9F] uppercase tracking-[0.2em] ${className}`}>{children}</p>
);

export const CardBody = ({ children, className = "" }: any) => (
  <p className={`${Typography.body} text-[13px] lg:text-[14px] text-[#2F3B40] leading-[1.6] font-normal opacity-80 ${className}`}>{children}</p>
);

export const BaseCard = ({ children, className = "", hover = true }: any) => (
  <motion.div className={`bg-white/40 backdrop-blur-[24px] rounded-[32px] lg:rounded-[48px] border border-white/80 p-6 lg:p-8 relative overflow-hidden group ${hover ? 'hover:bg-white/60 hover:-translate-y-1' : ''} transition-all duration-700 shadow-sm ${className}`}>
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#1A8E9F]/5 to-[#D8614E]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export const StatItem = ({ value, label, sub }: any) => (
  <motion.div className="text-center space-y-3 p-6 bg-white/40 backdrop-blur-md rounded-[32px] border border-[#0E4E68]/5 shadow-sm">
    <p className={`${Typography.title} text-[36px] lg:text-[72px] text-[#D8614E] leading-none font-normal`}>{value}</p>
    <div className="space-y-0.5">
      <p className={`${Typography.body} text-[9px] font-normal text-[#2F3B40] uppercase tracking-[0.2em]`}>{label}</p>
      <p className={`${Typography.body} text-[11px] text-[#2F3B40]/60 font-normal`}>{sub}</p>
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

export const GlobalHeader = ({ logoName, lang = "EN", onLangChange }: any) => {
  const [showCases, setShowCases] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const translations: any = {
    EN: { cases: "Cases", about: "About", resume: "Resume", talk: "Let's Talk" },
    ES: { cases: "Casos", about: "Sobre mí", resume: "CV", talk: "Hablemos" }
  };

  const t = translations[lang] || translations.EN;

  const cases = [
    { name: lang === 'EN' ? "Experience CoE" : "CoE de Experiencia", path: "#", active: true },
    { name: lang === 'EN' ? "Digital Transformation" : "Transformación Digital", path: "#" },
    { name: lang === 'EN' ? "Service Design" : "Diseño de Servicios", path: "#" },
    { name: lang === 'EN' ? "Organizational Design" : "Diseño Organizacional", path: "#" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[60px] lg:h-[68px] px-6 lg:px-12 flex items-center justify-between z-[1000] bg-white/10 backdrop-blur-[12px] transition-all duration-700">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2.5 no-underline group shrink-0">
            <div className="text-[#0E4E68] group-hover:scale-105 transition-transform duration-500 shrink-0 flex items-center">
              <svg width="22" height="20" viewBox="0 0 70 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[20px] lg:w-[24px] lg:h-[22px]">
                <g clipPath="url(#clip0_logo)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M39.3135 0.175405C37.4441 -0.0161883 33.0809 -0.052548 31.5498 0.0748188C24.7619 0.639294 18.1123 2.71627 12.7842 6.06896C9.70117 8.00901 6.39276 11.1545 4.28613 14.1666C2.21371 17.1298 0.974655 20.1791 0.331055 23.8795C0.0858612 25.2892 0.032608 25.4813 0 44.1559V63.9781H8.52734V44.1695L8.7373 25.4713L8.83691 24.1695C8.90226 23.7691 8.92431 23.6495 8.96094 23.484L9.15918 23.5299C11.5369 24.247 14.4387 25.9744 16.4385 27.7672C18.0933 29.2508 20.4567 32.2362 21.9111 34.9264C24.1042 38.983 26.5491 45.5969 28.0322 51.4371C28.4053 52.9062 29.7749 59.1574 30.3369 61.8912L30.3398 61.902L30.7949 64.0026L31.6025 64.0006L35.001 63.9967C35.4908 63.999 36.3563 63.9983 37.0977 63.9977C37.47 63.9974 37.8126 63.9971 38.0615 63.9967H38.4658L39.2734 63.9947L39.4424 63.2057L39.4463 63.1861C39.4491 63.1728 39.4534 63.1524 39.459 63.1266C39.4701 63.0747 39.4867 62.9981 39.5078 62.9C39.5501 62.7033 39.6113 62.4188 39.6865 62.0699C39.8369 61.3719 40.0435 60.4138 40.2695 59.3746C40.7223 57.2928 41.2496 54.8942 41.5537 53.5983C43.2159 46.5129 45.3643 40.2973 47.5752 35.9977C49.3031 32.6373 51.1066 30.0422 52.8584 28.3326C55.1284 26.1176 57.6518 24.6401 60.7861 23.6149L60.959 23.5592C61.0554 23.9591 61.1182 24.206 61.1768 24.5758C61.249 25.0321 61.3069 25.665 61.3496 26.8951C61.4353 29.3605 61.4587 34.0751 61.4756 44.2584V63.9781H70.002V44.1559L69.9775 34.0162C69.9685 31.4231 69.9581 29.5445 69.9434 28.1686C69.9144 25.455 69.8713 24.6209 69.7764 24.0768C68.7655 18.2818 66.3342 14.0474 61.8994 9.85314C58.3112 6.45941 55.1343 4.43001 50.5078 2.70861C46.8396 1.34385 43.4879 0.60333 39.3135 0.175405ZM35.2012 8.01427C37.6381 8.03927 38.4486 8.13399 39.5947 8.3004C45.2048 9.11476 50.2485 10.911 53.4629 13.2682C54.4628 14.0015 56.233 15.6092 57.1758 16.61C55.4101 17.1685 54.3641 17.6132 53.1846 18.2047C48.4993 20.5545 44.2832 24.6747 41.292 29.8922C38.7349 34.3528 37.0542 38.4238 34.9707 45.4156C34.8809 45.1355 34.7851 44.8447 34.6904 44.5475C32.4474 37.5046 31.2129 34.3424 29.2441 30.7965C26.6696 26.1597 23.9161 22.9607 20.1045 20.2633C17.8312 18.6546 15.4337 17.5146 12.7168 16.6422C13.1097 16.2289 13.5482 15.7881 13.8877 15.4762C16.6972 12.8948 20.1761 10.9409 23.8369 9.74767C26.1094 9.00689 29.1753 8.33762 31.4189 8.10802C31.8555 8.06342 33.5353 7.99715 35.2012 8.01427ZM55.3896 18.2994L55.877 18.11C55.895 18.1032 55.9135 18.0972 55.9316 18.0904C55.7432 18.1606 55.5632 18.2297 55.3896 18.2994ZM3.76367 16.8912L4.07227 16.3473L4.0752 16.3434C3.96829 16.5252 3.86449 16.7078 3.76367 16.8912ZM7.7627 11.5348C7.77952 11.5172 7.79562 11.4986 7.8125 11.4811C7.82856 11.4643 7.84522 11.448 7.86133 11.4313C7.82826 11.4656 7.79557 11.5004 7.7627 11.5348ZM10.9648 8.60021C10.999 8.5729 11.0322 8.54428 11.0664 8.5172C11.0897 8.49878 11.1134 8.48084 11.1367 8.46251C11.0792 8.50779 11.0223 8.55431 10.9648 8.60021ZM55.3926 6.0924C55.588 6.20773 55.7806 6.32696 55.9727 6.44689C55.7661 6.31788 55.5579 6.19108 55.3477 6.06701L55.3926 6.0924ZM45.6074 2.23693C45.8068 2.28573 46.0057 2.33629 46.2041 2.3883L45.5449 2.22228L45.6074 2.23693ZM41.4385 1.44005C41.5651 1.45808 41.6911 1.47691 41.8164 1.49572C41.6179 1.46591 41.4177 1.43759 41.2158 1.40978C41.2902 1.42006 41.3645 1.42953 41.4385 1.44005ZM38.8447 1.13634C38.976 1.14676 39.0988 1.15795 39.2119 1.16955C39.4682 1.19582 39.7216 1.22285 39.9717 1.25158C40.0233 1.2575 40.0747 1.26409 40.126 1.27013C39.8257 1.23486 39.5212 1.20125 39.2119 1.16955C39.0639 1.15437 38.8992 1.14053 38.7207 1.12755C38.7628 1.13062 38.8042 1.13313 38.8447 1.13634Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_logo">
                    <rect width="70.002" height="64.0026" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className={`${Typography.title} text-[#0E4E68] text-[18px] lg:text-[20px] font-normal tracking-tight leading-none`}>
              <span className="hidden sm:inline">Viviana Fernández</span>
              <span className="inline sm:hidden">VF</span>
            </span>
          </a>
        </div>
        
        <nav className={`${Typography.body} flex items-center gap-2 lg:gap-4`}>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 mr-6">
            <div className="relative group">
              <button 
                onMouseEnter={() => setShowCases(true)}
                onMouseLeave={() => setShowCases(false)}
                className="flex items-center gap-1.5 text-[13px] text-[#0E4E68] hover:text-[#1A8E9F] transition-colors py-2"
              >
                {t.cases}
                <SafeIcon icon="ChevronDown" size={12} className={`transition-transform duration-300 ${showCases ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showCases && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setShowCases(true)}
                    onMouseLeave={() => setShowCases(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#0E4E68]/10 py-3 mt-1 overflow-hidden"
                  >
                    {cases.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.path}
                        className={`block px-5 py-2.5 text-[12px] transition-all hover:bg-[#0E4E68]/5 ${item.active ? 'text-[#1A8E9F]' : 'text-[#0E4E68]/70 hover:text-[#0E4E68]'}`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a href="https://vivi-personal-website.example" className="text-[13px] text-[#0E4E68]/70 hover:text-[#0E4E68] transition-colors">{t.about}</a>
            <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#0E4E68]/70 hover:text-[#0E4E68] transition-colors">{t.resume}</a>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4 lg:border-l border-[#0E4E68]/10 lg:pl-4">
            <button 
              onClick={() => onLangChange(lang === 'EN' ? 'ES' : 'EN')} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#0E4E68]/5 transition-colors group"
            >
              <SafeIcon icon="Languages" size={14} className="text-[#0E4E68]/60 group-hover:text-[#0E4E68]" />
              <span className="text-[12px] font-normal text-[#0E4E68]">{lang}</span>
            </button>
            
            <a 
              href="mailto:viviana@example.com"
              className="hidden sm:flex bg-[#0E4E68] text-white px-6 py-2.5 rounded-full text-[13px] font-normal hover:bg-[#1A8E9F] transition-all duration-500 shadow-lg shadow-[#0E4E68]/10 active:scale-95 items-center gap-2 group no-underline"
            >
              {t.talk}
              <SafeIcon icon="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
            </a>

            {/* Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border border-[#0E4E68]/10 text-[#0E4E68] hover:bg-[#0E4E68]/5 transition-colors"
            >
              <SafeIcon icon={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[900] bg-[#FBF8F1] pt-[80px] px-8 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-normal text-[#1A8E9F] uppercase tracking-[0.2em] mb-4">{t.cases}</p>
                {cases.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.path}
                    className={`block text-[24px] ${Typography.title} ${item.active ? 'text-[#1A8E9F]' : 'text-[#0E4E68] opacity-60'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="h-px bg-[#0E4E68]/5 w-full" />
              <div className="space-y-6">
                <a href="#" className={`block text-[20px] ${Typography.title} text-[#0E4E68]`}>{t.about}</a>
                <a href="#" className={`block text-[20px] ${Typography.title} text-[#0E4E68]`}>{t.resume}</a>
              </div>
              <div className="mt-8">
                <a 
                  href="mailto:viviana@example.com"
                  className="bg-[#0E4E68] text-white w-full py-4 rounded-full text-[15px] font-normal flex items-center justify-center gap-3 no-underline shadow-xl shadow-[#0E4E68]/20"
                >
                  {t.talk}
                  <SafeIcon icon="ArrowRight" size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SlideFooter = ({ current, total, label, onPrev, onNext, onRestart, onGoTo, lang = "EN" }: any) => {
  const isEn = lang === 'EN';
  const isLast = current === total - 1;
  const progress = ((current + 1) / total) * 100;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onGoTo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const targetSlide = Math.min(Math.floor(percentage * total), total - 1);
    onGoTo(targetSlide);
  };

  return (
    <footer className="fixed bottom-6 left-0 right-0 z-[1000] px-6 lg:px-12 flex justify-center pointer-events-none">
      {/* Floating Navigation Dock - Advanced Glassmorphism */}
      <div className="flex items-center gap-2 bg-white/30 backdrop-blur-[24px] border border-white/40 rounded-full p-2 px-4 shadow-[0_8px_32px_rgba(14,78,104,0.08)] pointer-events-auto group hover:bg-white/40 transition-all duration-700">
        
        {/* Progress & Label Group */}
        <div className="flex flex-col items-start pl-4 pr-6 border-r border-[#0E4E68]/10 mr-2">
          <div className={`${Typography.body} flex items-baseline gap-1.5`}>
            <span className="text-[15px] font-normal text-[#0E4E68] tracking-tighter">
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-normal text-[#0E4E68]/30">/</span>
            <span className="text-[11px] font-normal text-[#0E4E68]/40">
              {String(total).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[8px] font-normal uppercase tracking-[0.3em] text-[#1A8E9F] leading-none">
            {label}
          </span>
        </div>

        {/* Navigation Arrows - Using semi-translucent buttons for integration */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onPrev} 
            disabled={current === 0} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              current === 0 
              ? 'text-[#0E4E68]/10 opacity-30 cursor-not-allowed' 
              : 'text-[#0E4E68] bg-white/40 hover:bg-[#0E4E68] hover:text-white cursor-pointer active:scale-90 shadow-sm'
            }`}
            aria-label="Previous slide"
          >
            <SafeIcon icon="ChevronLeft" size={24} strokeWidth={2} />
          </button>
          
          <button 
            onClick={onNext} 
            disabled={current === total - 1} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              current === total - 1 
              ? 'text-[#0E4E68]/10 opacity-30 cursor-not-allowed' 
              : 'text-[#0E4E68] bg-white/40 hover:bg-[#0E4E68] hover:text-white cursor-pointer active:scale-90 shadow-sm'
            }`}
            aria-label="Next slide"
          >
            <SafeIcon icon="ChevronRight" size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Restart / Final Action */}
        {isLast ? (
          <div className="pl-2 ml-2 border-l border-[#0E4E68]/10">
            <button 
              onClick={onRestart} 
              className="px-5 py-3 rounded-full bg-[#1A8E9F]/10 backdrop-blur-md text-[#0E4E68] border border-[#0E4E68]/10 text-[11px] font-normal hover:bg-[#0E4E68] hover:text-white transition-all duration-500 cursor-pointer active:scale-95 flex items-center gap-2"
            >
               <SafeIcon icon="RotateCcw" size={13} />
               <span className="hidden sm:inline">{isEn ? 'Restart Case' : 'Reiniciar caso'}</span>
            </button>
          </div>
        ) : (
          /* Visual Progress Bar - Integrated with higher transparency */
          <div 
            onClick={handleProgressClick}
            className="w-24 lg:w-32 h-[12px] flex items-center cursor-pointer ml-4 mr-4 hidden md:flex group/progress"
          >
            <div className="relative w-full h-[3px] bg-[#0E4E68]/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1A8E9F] to-[#D8614E] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Hover indicator */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export const FullCenteredLayout = ({ children, className = "", centered = false }: any) => (
  <section className={`flex-grow w-full flex flex-col ${centered ? 'justify-center' : 'items-start'} pt-[40px] lg:pt-[60px] pb-[160px] lg:pb-[220px] px-8 lg:px-20 max-w-[1600px] mx-auto min-h-screen ${className}`}>
    <div className={`w-full flex flex-col items-start ${centered ? 'mb-[2vh]' : ''}`}>{children}</div>
  </section>
);

export const SplitLayout = ({ left, right, className = "", ratio = "5:7", centered = false }: any) => {
  const leftSpan = ratio === "5:7" ? "lg:col-span-5" : ratio === "7:5" ? "lg:col-span-7" : "lg:col-span-6";
  const rightSpan = ratio === "5:7" ? "lg:col-span-7" : ratio === "7:5" ? "lg:col-span-5" : "lg:col-span-6";
  return (
    <section className={`flex-grow w-full flex flex-col ${centered ? 'justify-center' : 'items-start'} pt-[40px] lg:pt-[60px] pb-[160px] lg:pb-[180px] px-8 lg:px-20 max-w-[1600px] mx-auto min-h-0 ${className}`}>
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

export const SectionHeader = ({ category, title, description, subtitle, className = "", descriptionClassName = "", descriptionSize = "lg" }: any) => {
  const isCentered = className.includes('text-center');
  return (
    <header className={`w-full ${className}`}>
      <div className="space-y-4">
        <div className={`inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20 ${isCentered ? 'mx-auto' : ''}`}>
          <CardLabel className="text-[10px] lg:text-[11px] text-[#1A8E9F] font-normal tracking-[0.2em]">{category}</CardLabel>
        </div>
        <Heading level={2} className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.1] tracking-tight">{title}</Heading>
        {subtitle && <p className={`${Typography.body} text-[12px] font-normal text-[#D8614E] uppercase tracking-[0.1em]`}>{subtitle}</p>}
      </div>
      {description && (
        <BodyText size={descriptionSize} className={`mt-6 lg:mt-8 max-w-[650px] text-[#2F3B40] whitespace-pre-line font-normal ${isCentered ? 'mx-auto' : ''} ${descriptionClassName}`}>
          {description}
        </BodyText>
      )}
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
