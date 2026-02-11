import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  motion, AnimatePresence, 
  Pill, Heading, BodyText, IconButton, StatItem, ArtifactCard, 
  GlobalHeader, SlideFooter, FullCenteredLayout, SplitLayout, SectionHeader,
  Colors, Typography, CardTitle, CardLabel, CardBody, BaseCard, SafeIcon
} from "./ui-kit";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Assets
import teamImage1 from 'figma:asset/e3a22d6960490a45ffcc0d24e1a869dfca4ffa88.png';
import eventImage from 'figma:asset/5844756e19790e7d1433c2abbd9dec891e645057.png';
import groupImage from 'figma:asset/63fac24f37631fc5c6e93637e122a66a63c6002c.png';
import gpTeamPhoto from 'figma:asset/bbc15dc266cae7d12a3fa31f99b613e6d84f5a48.png';
import maturityFramework from 'figma:asset/6c5385c5b1dbcb1880f29de40d3a7f77097e5b57.png';
import maturityScales from 'figma:asset/1684521193bcc9d1dac5e3348a4b96f4098fbac5.png';
import effortModel from 'figma:asset/a227bff4af1daa63b9939c4bdc5ec6ae409eebc6.png';

// --- DATA ---
const slides = [
  { id: 'cover', title: 'Experience Center of Excellence', subtitle: 'Transforming organizational design into measurable customer experience impact.', category: 'GRUP Petersen', sidebarLabel: 'COVER', metadata: 'Head of Customer Experience', year: '2023 — 2025' },
  { id: 'context', title: 'A fragmented landscape with shared interfaces', category: '01 / CONTEXT', sidebarLabel: 'CONTEXT', content: 'In 2022, UX existed as a small, execution-focused UI team. Across four banks, there were four designers, working mainly on digital interfaces.\n\nProduct definitions and interfaces were partially unified, but service models and technology stacks were still different.' },
  { id: 'challenge', title: 'Evolving at the speed of change', category: '02 / THE CHALLENGE', sidebarLabel: 'CHALLENGE', contextPoints: ['DECENTRALIZING BACKLOGS', 'BUILDING AUTONOMY', 'FUSING BUSINESS & TECH'], introText: 'To meet the group’s expansion needs, I led a collaborative process with UX leadership to design a new operational discipline.', missionBullets: [{ icon: 'Share2', label: 'MULTI-BANK', text: 'Operate across 4 bank realities.' }, { icon: 'Zap', label: 'AUTONOMY', text: 'Support product teams.' }, { icon: 'Target', label: 'ALIGNMENT', text: 'Business priorities first.' }, { icon: 'Layers', label: 'SYSTEMIC', text: 'Scale without friction.' }] },
  { id: 'role', title: 'Architecting the System', category: '03 / MY ROLE', sidebarLabel: 'MY ROLE', roleIntro: 'I led the creation and scaling of a Customer Experience Center of Excellence, with responsibility for CX Strategy, Organizational Design, and Talent Development.', roleBullets: [{ label: 'STRATEGY', title: 'CX Strategy & Governance', text: 'Establishing the North Star for all group banks.' }, { label: 'DESIGN', title: 'Organizational Design', text: 'Defining the matrix model and operating discipline.' }, { label: 'CAPABILITY', title: 'Talent Development', text: 'Scaling UX, Research, and Design skills group-wide.' }], collage: [gpTeamPhoto, eventImage, groupImage, teamImage1] },
  { id: 'strategy', category: '04 / THE STRATEGY', title: 'Architecture of Convergence', sidebarLabel: 'STRATEGY', subtitle: 'From Fragmented Design to Systemic Growth', description: 'We didn’t just build a team; we built a shared operating system. By abstracting complexity, we allowed 4 independent banks to scale UX maturity.', pillars: [{ id: 'foundation', title: 'Foundation', label: 'CORE', text: 'Shared Design System and Methodological Toolkit.', icon: 'Layers' }, { id: 'orchestration', title: 'Orchestration', label: 'FLOW', text: 'Governance models that sync 50+ designers.', icon: 'Zap' }, { id: 'enablement', title: 'Enablement', label: 'IMPACT', text: 'Coaching and growth paths for localized squads.', icon: 'Target' }, { id: 'metrics', title: 'CX Metrics & Insights', label: 'DATA', text: 'Measuring impact and user feedback group-wide.', icon: 'Target' }] },
  { id: 'toolkit', category: '05 / THE TOOLKIT', title: 'Governance through Design', sidebarLabel: 'TOOLKIT', description: 'We developed custom methodological frameworks to move from tactical design to strategic influence.', artifacts: [
    { 
      id: 'maturity', title: 'Maturity Framework', tag: 'EVALUATION', text: 'CX/UX team maturity assessment across the 4 banks.', image: maturityFramework,
      insights: [
        'Cross-bank evaluation methodology.',
        'Identification of operational gaps.',
        'Strategic UX scalability roadmap.',
        'Standardized maturity scoring.'
      ]
    },
    { 
      id: 'scales', title: 'Role Maturity Scales', tag: 'IMPACT', text: 'Definition of how each role contributes to strategic influence.', image: maturityScales,
      insights: [
        'Seniority based on business impact.',
        'Clear promotion criteria.',
        'Alignment with Central CoE.',
        'Skill mapping across entities.'
      ]
    },
    { 
      id: 'effort', title: 'Effort–Uncertainty Model', tag: 'PRIORITIZATION', text: 'A collaborative model for risk-based backlog planning.', image: effortModel,
      insights: [
        'Risk-based prioritization.',
        'Technical uncertainty reduction.',
        'Design backlog optimization.',
        'Stakeholder alignment tool.'
      ]
    }
  ] },
  { id: 'impact', title: 'Outcomes at scale', category: '06 / THE IMPACT', sidebarLabel: 'IMPACT', stats: [{ value: '+10', label: 'NPS INCREASE', sub: 'Across priority journeys' }, { value: '−30%', label: 'REWORK REDUCTION', sub: 'In CX initiatives' }, { value: '100+', label: 'ALIGNED PROJECTS', sub: 'Under shared OKRs' }], whatChanged: ['CX governance implemented across 4 banks', '50+ UX professionals operating under shared principles', 'UX, CX, and VoC integrated into a single experience model', 'Experience initiatives managed through measurable OKRs', 'Design System adopted across 4 brands'] },
  { id: 'governance', category: '07 / GOVERNANCE', title: 'The Rituals of Scale', sidebarLabel: 'GOVERNANCE', description: 'Scaling to 50+ professionals across 4 banks required more than a chart; it required a heartbeat.', rituals: [{ icon: 'Users', title: 'CX Chapter', freq: 'Bi-weekly', text: 'Knowledge sharing and craft alignment across all banks.' }, { icon: 'Eye', title: 'Design Critiques', freq: 'Weekly', text: 'Peer reviews to ensure quality.' }, { icon: 'ClipboardCheck', title: 'Sync Meetings', freq: 'Monthly', text: 'Strategic alignment with Business and Tech.' }] },
  { id: 'learnings', category: '08 / REFLECTION', title: 'Systemic Learnings', sidebarLabel: 'LEARNINGS', description: 'Building a CoE is as much about cultural change as it is about organizational design.', lessons: [{ title: 'Trust over Tools', text: 'Methodologies only work when there is a foundation of psychological safety.', icon: 'Heart' }, { title: 'Scale is a Craft', text: 'Designing the team is as critical as designing the product.', icon: 'Layers' }, { title: 'Business Language', text: 'CX impact must be translated into business value.', icon: 'Target' }] },
  { id: 'closing', category: '09 / THE FUTURE', title: 'Building for what comes next', sidebarLabel: 'CLOSING', subtitle: 'From a Center of Excellence to a Culture of Excellence.', description: 'The transformation demonstrating that experience design is the ultimate business advantage.', contactInfo: { name: 'Viviana Fernández', role: 'CX & Organizational Design Specialist', email: 'vfernandezdieguez@gmail.com', linkedIn: 'linkedin.com/in/vfernandezdieguez/' } }
];

// --- COMPONENTS ---

const BackgroundMotion = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 bg-[#FBF8F1]">
    {/* Aurora Blobs */}
    <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#1A8E9F]/10 to-transparent blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-[#D8614E]/10 to-transparent blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
    
    {/* Pattern de puntos Marimekko sutil */}
    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0E4E68 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
  </div>
);

// --- CUSTOM ICONOGRAPHY & DIAGRAMS (MARIMEKKO & APPLE INSPIRED) ---

const MarimekkoDot = ({ color = "#D8614E", size = 20, className = "" }: any) => (
  <div className={`rounded-full ${className}`} style={{ backgroundColor: color, width: size, height: size, filter: 'blur(0.5px)' }} />
);

const CustomIcon = ({ name, size = 24, className = "" }: any) => {
  const icons: any = {
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
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
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
        <path d="M23 21V19C23 17.83 22.44 16.79 21.58 16.11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    MessageSquare: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    ClipboardCheck: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M16 4H18C19.1046 4 20 4.89543 20 6V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6C4 4.89543 4.89543 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="2" width="8" height="4" rx="1" fill="currentColor" />
        <path d="M9 14L11 16L15 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Heart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    Mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" />
        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  };
  return icons[name] || <div className="w-6 h-6 bg-slate-200 rounded-sm" />;
};

const ChallengeDiagram = () => (
  <div className="relative w-full h-full flex items-center justify-center p-2 lg:p-6">
    {/* Contenedor Glassmorphism con alto contraste para destacar del fondo */}
    <div className="relative w-full aspect-square flex items-center justify-center rounded-[64px] lg:rounded-[80px] bg-white/70 backdrop-blur-[40px] border border-white/90 shadow-[0_80px_160px_-40px_rgba(14,78,104,0.25),0_0_100px_rgba(26,142,159,0.05)] overflow-visible group transition-transform duration-700 hover:scale-[1.02]">
      
      {/* Grano y aura interna optimizada */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none rounded-[64px] lg:rounded-[80px]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1A8E9F]/20 via-transparent to-[#D8614E]/15 rounded-[64px] lg:rounded-[80px] opacity-40" />

      <svg viewBox="0 0 700 700" className="w-full h-full overflow-visible relative z-10 p-12 lg:p-16">
        <defs>
          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Background Network */}
        <g stroke="#0E4E68" strokeWidth="1.2" strokeDasharray="8 24" opacity="0.4">
          <circle cx="350" cy="350" r="280" fill="none" />
          <circle cx="350" cy="350" r="180" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line 
              key={angle}
              x1="350" y1="350" 
              x2={350 + 280 * Math.cos(angle * Math.PI / 180)} 
              y2={350 + 280 * Math.sin(angle * Math.PI / 180)} 
            />
          ))}
        </g>

        {/* FLOWING PARTICLES - Radiating from COE to Banks */}
        <g>
          {[
            { path: "M 350 350 L 120 120", delay: 0 },
            { path: "M 350 350 L 580 120", delay: 1.5 },
            { path: "M 350 350 L 120 580", delay: 0.7 },
            { path: "M 350 350 L 580 580", delay: 2.2 }
          ].map((flow, i) => (
            <circle key={`out-${i}`} r="3" fill="#1A8E9F">
              <animateMotion dur="3s" repeatCount="indefinite" path={flow.path} begin={`${flow.delay}s`} />
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin={`${flow.delay}s`} />
            </circle>
          ))}
        </g>

        {/* FLOWING PARTICLES - Returning from Banks to COE */}
        <g>
          {[
            { path: "M 120 120 L 350 350", delay: 0.5 },
            { path: "M 580 120 L 350 350", delay: 2.0 },
            { path: "M 120 580 L 350 350", delay: 1.2 },
            { path: "M 580 580 L 350 350", delay: 2.7 }
          ].map((flow, i) => (
            <circle key={`in-${i}`} r="2.5" fill="#D8614E">
              <animateMotion dur="4s" repeatCount="indefinite" path={flow.path} begin={`${flow.delay}s`} />
              <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" begin={`${flow.delay}s`} />
            </circle>
          ))}
        </g>

        {/* Central Core (Center of Excellence) */}
        <g filter="url(#centerGlow)">
          <circle cx="350" cy="350" r="95" fill="#0E4E68" />
          <text x="350" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" letterSpacing="0.4em" className="font-sans opacity-70">CENTER OF</text>
          <text x="350" y="372" textAnchor="middle" fill="white" fontSize="28" className={`${Typography.title} italic font-normal`}>Excellence</text>
          <circle cx="435" cy="350" r="8" fill="#D8614E" />
        </g>

        {/* Entity Nodes (Banks) */}
        {[
          { x: 120, y: 120, label: 'BANK A' },
          { x: 580, y: 120, label: 'BANK B' },
          { x: 120, y: 580, label: 'BANK C' },
          { x: 580, y: 580, label: 'BANK D' }
        ].map((bank, i) => (
          <g key={i}>
            <circle cx={bank.x} cy={bank.y} r="65" fill="white" fillOpacity="1" stroke="#0E4E68" strokeWidth="1.5" />
            <text x={bank.x} y={bank.y + 6} textAnchor="middle" fill="#0E4E68" fontSize="14" fontWeight="900" letterSpacing="0.25em" className="font-sans">
              {bank.label}
            </text>
          </g>
        ))}

        {/* Strategic Flow Connections */}
        <g>
          {[
            "M 120 120 L 350 350",
            "M 580 120 L 350 350",
            "M 120 580 L 350 350",
            "M 580 580 L 350 350"
          ].map((path, i) => (
            <path key={i} d={path} stroke="#1A8E9F" strokeWidth="2.5" strokeDasharray="10 10" opacity="0.3" />
          ))}
        </g>
      </svg>
    </div>
  </div>
);

const StrategyDiagram = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="relative w-full h-full flex items-center justify-center">
      <svg 
        viewBox="-160 0 1260 500" 
        className="w-full h-full overflow-visible drop-shadow-sm" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. Agencies & Focal Points (Left Side) */}
        <g transform="translate(-80, 250)">
          {[
            { y: -80, label: 'AGENCY A' },
            { y: 80, label: 'AGENCY B' }
          ].map((item, i) => (
            <g key={i} transform={`translate(0, ${item.y})`}>
               <rect x="-40" y="-15" width="80" height="30" rx="4" fill="white" stroke="#0E4E68" strokeWidth="0.5" strokeOpacity="0.2" className="drop-shadow-sm" />
               <text textAnchor="middle" y="4" fill="#0E4E68" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.4">{item.label}</text>
               <line x1="40" y1="0" x2="75" y2="0" stroke="#0E4E68" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
               <circle cx="100" cy="0" r="25" fill="white" stroke="#0E4E68" strokeWidth="0.5" strokeOpacity="0.1" className="drop-shadow-sm" />
               <text x="100" textAnchor="middle" y="-2" fill="#0E4E68" fontSize="6" fontWeight="900" letterSpacing="0.1em" opacity="0.3">FOCAL</text>
               <text x="100" textAnchor="middle" y="6" fill="#0E4E68" fontSize="6" fontWeight="900" letterSpacing="0.1em" opacity="0.3">POINT</text>
               <path d="M 125 0 Q 180 0 200 0" fill="none" stroke="#1A8E9F" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            </g>
          ))}
        </g>

        {/* 2. Operational VERTICAL Bars (CX & OPS) */}
        <g transform="translate(500, 0)">
          {[
            { x: 0, label: 'CX', sub: 'ORCHESTRATION' },
            { x: 150, label: 'OPS', sub: 'FOUNDATION' }
          ].map((col, i) => (
            <g key={i} transform={`translate(${col.x}, 0)`}>
               {/* Vertical Bar Body - Improved contrast using brand navy with slight tint */}
               <rect 
                 x="-25" y="60" width="50" height="420" 
                 rx="25" 
                 fill="#0E4E68" fillOpacity="0.07"
                 stroke="white" strokeWidth="1.5" strokeOpacity="0.8"
                 className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
               />
               {/* Column Label */}
               <text x="0" y="10" textAnchor="middle" fill="#0E4E68" fontSize="11" fontWeight="900" letterSpacing="0.2em">{col.label}</text>
               <text x="0" y="24" textAnchor="middle" fill="#0E4E68" fontSize="7" fontWeight="500" letterSpacing="0.1em" opacity="0.6">{col.sub}</text>
            </g>
          ))}
        </g>

        {/* 3. Business Units Background Columns (Dashed Rects) */}
        <g transform="translate(500, 0)">
          {[
            { x: 320, label: 'RETAIL', sub: 'BUSINESS UNIT' },
            { x: 470, label: 'CORPORATE', sub: 'BUSINESS UNIT' }
          ].map((col, i) => (
            <g key={i} transform={`translate(${col.x}, 0)`}>
               <rect 
                 x="-60" y="60" width="120" height="420" 
                 rx="12" 
                 fill="#1A8E9F" 
                 fillOpacity="0.04" 
                 stroke="#1A8E9F" 
                 strokeWidth="1" 
                 strokeDasharray="4 4" 
                 strokeOpacity="0.4" 
               />
               <text x="0" y="10" textAnchor="middle" fill="#D8614E" fontSize="10" fontWeight="900" letterSpacing="0.2em">{col.label}</text>
               <text x="0" y="24" textAnchor="middle" fill="#0E4E68" fontSize="7" fontWeight="500" letterSpacing="0.1em" opacity="0.6">{col.sub}</text>
               
               {/* Product Teams & Channels labels at the bottom of the column */}
               <g transform="translate(0, 455)">
                 <text textAnchor="middle" fill="#0E4E68" fontSize="7" fontWeight="900" letterSpacing="0.1em" opacity="0.5">PRODUCT TEAMS</text>
                 <text textAnchor="middle" y="10" fill="#0E4E68" fontSize="7" fontWeight="900" letterSpacing="0.1em" opacity="0.5">& CHANNELS</text>
               </g>
            </g>
          ))}
        </g>

        {/* 4. Horizontal Discipline Rows */}
        <g transform="translate(0, 250)">
          {[
            { y: -90, label: 'PRODUCT DESIGN' },
            { y: -30, label: 'CONTENT DESIGN' },
            { y: 30, label: 'RESEARCH' },
            { y: 90, label: 'DESIGN OPS' }
          ].map((row, i) => (
            <g key={i} transform={`translate(0, ${row.y})`}>
               {/* Row Bar - Improved contrast using brand navy with slight tint */}
               <rect 
                 x="250" y="-22" width="800" height="44" 
                 rx="22" 
                 fill="#0E4E68" fillOpacity="0.07"
                 stroke="white" strokeWidth="1.5" strokeOpacity="0.8"
                 className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
               />
               {/* Row Label */}
               <text x="280" y="4" fill="#0E4E68" fontSize="11" fontWeight="900" letterSpacing="0.3em">{row.label}</text>
               
               {/* Intersections (Dots at crossings) */}
               {[500, 650, 820, 970].map(x => (
                 <circle key={x} cx={x} cy="0" r="5" fill="#1A8E9F" stroke="white" strokeWidth="2" className="drop-shadow-sm" />
               ))}
            </g>
          ))}
        </g>

        {/* 5. COE CX Nucleus */}
        <g transform="translate(180, 250)">
          <circle r="110" fill="#1A4A63" stroke="white" strokeWidth="5" className="drop-shadow-2xl" />
          <circle r="95" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
          <text textAnchor="middle" y="14" fill="white" fontSize="42" fontWeight="900" letterSpacing="-0.02em">COE CX</text>
          <circle cx="60" cy="-40" r="8" fill="#D8614E" />
        </g>
      </svg>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export function CaseStudy() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Open by default as requested
  const slide = slides[currentSlide] || slides[0];

  const handleSelectDoc = (doc: any) => {
    setSelectedDoc(doc);
    setSidebarCollapsed(false); // Reset to open when selecting a new document
  };

  const paginate = useCallback((newDirection: number) => {
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return 0;
      if (next >= slides.length) return slides.length - 1;
      return next;
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen selection:bg-[#0E4E68]/10 text-[#0E4E68] overflow-x-hidden relative flex flex-col">
      <BackgroundMotion />
      
      {/* Texture de Grano Físico Global */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      <GlobalHeader logoName="Viviana Fernández" />

      <main className="pt-[60px] lg:pt-[75px] min-h-screen flex flex-col relative z-20">
        <AnimatePresence>
          <motion.div key={currentSlide} className="w-full flex-grow flex flex-col">
            <SlideRenderer slide={slide} onSelectDoc={handleSelectDoc} onPrint={handlePrint} />
          </motion.div>
        </AnimatePresence>
      </main>

      <SlideFooter 
        current={currentSlide} total={slides.length} label={slide.sidebarLabel} 
        onPrev={() => paginate(-1)} onNext={() => paginate(1)} onRestart={() => setCurrentSlide(0)}
      />

      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[2000] bg-[#FBF8F1] flex flex-col overflow-hidden">
            {/* High-End Header */}
            <header className="h-[100px] lg:h-[120px] px-8 lg:px-16 bg-white flex justify-between items-center relative z-[60] border-b border-[#0E4E68]/5">
               <div className="flex flex-col gap-1">
                  <span className={`${Typography.body} text-[10px] lg:text-[11px] font-black text-[#1A8E9F] uppercase tracking-[0.3em]`}>
                    {selectedDoc.tag}
                  </span>
                  <h2 className={`${Typography.title} text-[28px] lg:text-[42px] text-[#0E4E68] leading-none tracking-tight`}>
                    {selectedDoc.title}
                  </h2>
               </div>
               
               <div className="flex items-center gap-4 lg:gap-6">
                 {/* Sidebar Toggle - Elegant Pill */}
                 <button 
                   onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                   className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0E4E68]/10 hover:border-[#1A8E9F] hover:bg-[#1A8E9F]/5 transition-all text-[#0E4E68]/60 group"
                 >
                   <SafeIcon icon={sidebarCollapsed ? "BookOpen" : "ChevronRight"} size={16} className="group-hover:text-[#1A8E9F]" />
                   <span className="text-[11px] font-bold tracking-widest uppercase">{sidebarCollapsed ? "Show Notes" : "Hide Notes"}</span>
                 </button>

                 <button 
                   onClick={() => setSelectedDoc(null)}
                   className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0E4E68]/10 flex items-center justify-center hover:bg-[#D8614E] hover:border-[#D8614E] hover:text-white transition-all duration-500 text-[#0E4E68]/40"
                 >
                   <SafeIcon icon="X" size={24} />
                 </button>
               </div>
            </header>
            
            <div className="flex-grow flex overflow-hidden relative">
               {/* Main Viewer Area with Advanced Zoom & Pan */}
               <div className="flex-grow bg-[#FBF8F1] relative overflow-hidden group/viewer">
                  <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit={true}
                    wheel={{ step: 0.1 }}
                    doubleClick={{ disabled: false }}
                  >
                    {({ zoomIn, zoomOut, resetTransform }: any) => (
                      <>
                        {/* Zoom Controls Overlay */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl rounded-full border border-[#0E4E68]/10 shadow-2xl opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300">
                           <button onClick={() => zoomOut()} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#0E4E68]/5 text-[#0E4E68]">
                              <SafeIcon icon="Minus" size={18} />
                           </button>
                           <div className="w-px h-6 bg-[#0E4E68]/10 mx-1" />
                           <button onClick={() => resetTransform()} className="px-4 h-10 rounded-full flex items-center justify-center hover:bg-[#0E4E68]/5 text-[11px] font-bold text-[#0E4E68] tracking-widest uppercase">
                              Reset
                           </button>
                           <div className="w-px h-6 bg-[#0E4E68]/10 mx-1" />
                           <button onClick={() => zoomIn()} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#0E4E68]/5 text-[#0E4E68]">
                              <SafeIcon icon="Plus" size={18} />
                           </button>
                        </div>

                        {/* Instruction Tooltip */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[70] pointer-events-none opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-500 delay-300">
                           <div className="px-5 py-2 rounded-full bg-[#0E4E68]/80 text-white backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3">
                              <SafeIcon icon="MousePointer2" size={12} />
                              Drag to pan · Scroll to zoom
                           </div>
                        </div>

                        <TransformComponent
                          wrapperStyle={{ width: "100%", height: "100%", cursor: "grab" }}
                          contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <div className="relative p-12 lg:p-24 flex items-center justify-center min-w-full min-h-full">
                            <motion.img 
                              layoutId={`img-${selectedDoc.id}`}
                              src={selectedDoc.image} 
                              className="max-w-[90vw] lg:max-w-[80vw] h-auto shadow-[0_60px_150px_rgba(14,78,104,0.15)] rounded-[40px] border border-white/80 pointer-events-auto" 
                              style={{ maxHeight: '85vh' }}
                            />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
               </div>

               {/* Sidebar - Overlay Layer */}
               <AnimatePresence>
                 {!sidebarCollapsed && (
                   <motion.aside 
                     initial={{ x: "100%", opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: "100%", opacity: 0 }}
                     transition={{ type: "spring", damping: 28, stiffness: 220 }}
                     className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] lg:w-[550px] bg-white/95 backdrop-blur-3xl border-l border-[#0E4E68]/5 z-[80] overflow-y-auto shadow-[-40px_0_100px_rgba(0,0,0,0.08)]"
                   >
                     <div className="p-10 lg:p-16 space-y-16">
                        <div className="space-y-6">
                          <CardLabel>Project Context</CardLabel>
                          <BodyText size="lg" className="text-[#0E4E68]/80 leading-relaxed font-medium">
                            {selectedDoc.text}
                          </BodyText>
                        </div>

                        <div className="space-y-10">
                          <CardLabel>Strategic Insights</CardLabel>
                          <div className="space-y-8">
                            {selectedDoc.insights?.map((insight: string, idx: number) => (
                              <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                key={idx} 
                                className="flex gap-8 items-start group"
                              >
                                <div className="mt-3 w-2.5 h-2.5 rounded-full bg-[#D8614E] shrink-0 group-hover:scale-150 transition-transform duration-500" />
                                <p className={`${Typography.body} text-[17px] lg:text-[19px] text-[#0E4E68] leading-snug font-medium tracking-tight`}>
                                  {insight}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-16 border-t border-[#0E4E68]/10">
                           <div className="bg-[#1A8E9F]/5 p-8 rounded-[32px] border border-[#1A8E9F]/10 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#1A8E9F] flex items-center justify-center text-white">
                                  <SafeIcon icon="Zap" size={18} />
                                </div>
                                <p className={`${Typography.body} text-[11px] font-black text-[#1A8E9F] uppercase tracking-[0.2em]`}>VF Methodology</p>
                              </div>
                              <p className={`${Typography.body} text-[15px] text-[#0E4E68]/60 italic leading-relaxed`}>
                                Framework designed to evaluate the maturity of CX/UX teams and identify improvement areas across collaboration and consistency.
                              </p>
                           </div>
                        </div>
                     </div>
                   </motion.aside>
                 )}
               </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideRenderer({ slide, onSelectDoc, onPrint }: any) {
  const { id } = slide;
  const [zoomDiagram, setZoomDiagram] = useState<boolean>(false);

  const toggleZoom = () => setZoomDiagram(!zoomDiagram);

  if (id === 'cover') {
    return (
      <FullCenteredLayout centered={true} className="!pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 items-center max-w-[1100px] mx-auto">
          <div className="col-span-1 lg:col-span-4 lg:border-r border-[#0E4E68]/10 lg:pr-16 text-center lg:text-right">
            <p className={`${Typography.body} text-[11px] font-black tracking-[0.4em] uppercase mb-4 text-[#D8614E]`}>{slide.year}</p>
            <p className={`${Typography.body} text-[14px] font-semibold text-[#0E4E68] tracking-tight leading-relaxed`}>{slide.metadata}</p>
          </div>
          <div className="col-span-1 lg:col-span-8 lg:pl-16 text-center lg:text-left">
            <Heading className="mb-8 !text-[clamp(2.5rem,6vw,4rem)] leading-[1.1]">
              Experience <br /> <span className="text-[#1A8E9F] italic font-normal">Center of Excellence</span>
            </Heading>
            <BodyText size="lg" className="max-w-[450px] mx-auto lg:mx-0 opacity-80">{slide.subtitle}</BodyText>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'context') {
    return (
      <SplitLayout 
        ratio="5:7"
        centered={true}
        left={
          <div className="lg:pr-10 max-w-[400px]">
            <SectionHeader category={slide.category} title={slide.title} />
          </div>
        }
        right={
          <div className="space-y-8 lg:space-y-10 lg:pl-16 border-l border-[#0E4E68]/10">
            {slide.content.split('\n\n').map((para: string, idx: number) => (
              <BodyText key={idx} size="lg" className="leading-relaxed text-[#0E4E68]/80 text-[16px] lg:text-[18px]">
                {para}
              </BodyText>
            ))}
          </div>
        }
      />
    );
  }

  if (id === 'challenge') {
    return (
      <SplitLayout 
        ratio="7:5"
        centered={true}
        className="!pt-[4vh] lg:!pt-[6vh]" 
        left={
          <div className="space-y-10 lg:space-y-12 pr-4">
            <SectionHeader 
              category={slide.category} 
              title={slide.title} 
              description={slide.introText} 
              className="max-w-[800px]"
            />
            
            {/* Arquitectura de Grilla 2x2 para Bullets - Optimización Vertical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-12 pt-4">
              {slide.missionBullets.map((bullet: any, i: number) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-[3px] h-12 lg:h-14 bg-[#0E4E68]/10 group-hover:bg-[#D8614E] transition-all duration-500 rounded-full shrink-0" />
                  <div className="pt-0.5">
                    <CardLabel className="mb-1.5 text-[10px] lg:text-[11px] text-[#1A8E9F] font-black tracking-[0.3em] uppercase opacity-80">{bullet.label}</CardLabel>
                    <h3 className={`${Typography.title} text-[20px] lg:text-[24px] font-medium text-[#0E4E68] group-hover:text-[#1A8E9F] transition-colors mb-2 tracking-tight leading-tight`}>
                      {bullet.text}
                    </h3>
                    <p className={`${Typography.body} text-[13px] lg:text-[14px] text-[#0E4E68]/60 leading-relaxed group-hover:text-[#0E4E68]/80 transition-colors`}>
                      {i === 0 && "Navigating complex stakeholder ecosystems across four diverse banking entities."}
                      {i === 1 && "Empowering decentralized product units with shared tools and expertise."}
                      {i === 2 && "Bridging the gap between user needs and business objectives."}
                      {i === 3 && "Building a scalable framework that grows without operational friction."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Context Tags en la base */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {slide.contextPoints?.map((p: string, i: number) => (
                 <div key={i} className="flex gap-2.5 items-center bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#D8614E]" />
                   <p className={`${Typography.body} text-[10px] font-black text-[#0E4E68]/60 uppercase tracking-[0.25em]`}>{p}</p>
                 </div>
              ))}
            </div>
          </div>
        }
        right={
          <div className="w-full h-full flex items-center justify-center lg:pl-6 relative">
             <div className="w-full max-w-[650px] aspect-square relative">
               {/* Pattern sutil de fondo para el diagrama */}
               <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0E4E68 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
               <ChallengeDiagram />
             </div>
          </div>
        }
      />
    );
  }

  if (id === 'role') {
    return (
      <SplitLayout 
        ratio="5:7"
        centered={true}
        left={
          <div className="space-y-10 lg:space-y-12">
            <SectionHeader category={slide.category} title={slide.title} description={slide.roleIntro} />
            <div className="space-y-6 lg:space-y-8">
              {slide.roleBullets.map((b: any, i: number) => (
                <div key={i} className="flex gap-5 lg:gap-6 group">
                  <div className="w-[3px] h-10 lg:h-12 bg-[#0E4E68]/10 group-hover:bg-[#D8614E] transition-all rounded-full shrink-0" />
                  <div className="pt-0.5">
                    <CardLabel className="mb-1 text-[9px] lg:text-[10px] text-[#1A8E9F] font-black tracking-[0.2em] uppercase opacity-80">{b.label}</CardLabel>
                    <p className={`${Typography.title} text-[20px] lg:text-[24px] font-medium text-[#0E4E68] group-hover:text-[#1A8E9F] transition-colors mb-0.5 tracking-tight`}>{b.title}</p>
                    <CardBody className="leading-snug text-[13px] lg:text-[15px] max-w-[90%] text-[#0E4E68]/70">{b.text}</CardBody>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        right={
          <div className="grid grid-cols-6 grid-rows-6 gap-4 lg:gap-5 w-full aspect-[4/3] lg:h-[480px]">
             <div className="col-span-4 row-span-4 rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl shadow-[#0E4E68]/5 border border-white/20">
               <img src={slide.collage[0]} className="w-full h-full object-cover" />
             </div>
             <div className="col-span-2 row-span-3 rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-xl shadow-[#0E4E68]/5 border border-white/20">
               <img src={slide.collage[1]} className="w-full h-full object-cover" />
             </div>
             <div className="col-span-2 row-span-3 rounded-[24px] lg:rounded-[32px] bg-[#D8614E] p-6 lg:p-8 flex flex-col justify-end text-white shadow-lg shadow-[#D8614E]/20">
                <p className={`${Typography.title} italic text-[18px] lg:text-[24px] leading-tight tracking-tight`}>50+ professionals. <br />4 banks. <br />One ecosystem.</p>
             </div>
             <div className="col-span-4 row-span-2 rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-lg shadow-[#0E4E68]/5 border border-white/20">
               <img src={slide.collage[2]} className="w-full h-full object-cover" />
             </div>
          </div>
        }
      />
    );
  }

  if (id === 'strategy') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start lg:!justify-center relative">
        {/* Editorial Header */}
        <header className="mb-2 lg:mb-4 shrink-0">
          <SectionHeader 
            category={slide.category} 
            title={slide.title} 
            description="Building a shared operating system that allows independent banks to scale UX maturity."
          />
        </header>
        
        {/* Diagram Area - Re-balanced for breathing room */}
        <div 
          className="w-full h-[28vh] lg:h-[32vh] flex items-center justify-center relative py-2 lg:py-3 min-h-0 cursor-zoom-in group/diagram transition-all duration-500 hover:bg-white/40 rounded-[40px]"
          onClick={toggleZoom}
        >
           <StrategyDiagram />
           {/* Hint for zoom */}
           <div className="absolute top-2 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#0E4E68]/10 flex items-center gap-2 opacity-0 group-hover/diagram:opacity-100 transition-all duration-300 shadow-sm translate-y-2 group-hover/diagram:translate-y-0">
             <SafeIcon icon="Maximize2" size={14} className="text-[#1A8E9F]" />
             <span className="text-[10px] font-black text-[#0E4E68] uppercase tracking-widest">Focus</span>
           </div>
        </div>

        {/* Strategic Pillars - Re-balanced Spacing and Weight */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6 shrink-0 relative z-10 w-full">
          {slide.pillars.map((p: any, i: number) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/80 p-4 lg:p-5 rounded-[24px] lg:rounded-[32px] transition-all duration-500 group hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0E4E68]/8 cursor-default flex flex-col h-full shadow-[0_4px_20px_rgba(14,78,104,0.04)]">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#0E4E68]/5 flex items-center justify-center text-[#1A8E9F] group-hover:bg-[#1A8E9F] group-hover:text-white transition-all duration-500 shrink-0">
                  <SafeIcon icon={p.icon} size={18} />
                </div>
                <h4 className={`${Typography.title} text-[14px] lg:text-[17px] font-medium text-[#0E4E68] group-hover:text-[#1A8E9F] transition-colors tracking-tight leading-tight`}>{p.title}</h4>
              </div>
              
              <div className="relative flex-grow">
                <CardBody className="text-[11px] lg:text-[13px] leading-snug group-hover:text-[#0E4E68]/90 transition-all">
                  {p.text}
                </CardBody>
              </div>
            </div>
          ))}
        </div>

        {/* ZOOM MODAL - Advanced Glassmorphism & Focus */}
        <AnimatePresence>
          {zoomDiagram && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12"
            >
              {/* Ultra-Blur Background */}
              <motion.div 
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(32px)" }}
                className="absolute inset-0 bg-[#FBF8F1]/80 cursor-zoom-out"
                onClick={toggleZoom}
              />
              
              {/* Diagram Container */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-7xl aspect-video bg-white/40 backdrop-blur-md rounded-[48px] border border-white/80 shadow-[0_40px_100px_rgba(14,78,104,0.15)] p-8 lg:p-16 flex flex-col items-center justify-center"
              >
                {/* Close Trigger */}
                <button 
                  onClick={toggleZoom}
                  className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] hover:text-[#D8614E] hover:rotate-90 transition-all duration-500 group shadow-lg"
                >
                  <SafeIcon icon="X" size={24} />
                </button>

                {/* Info Overlay */}
                <div className="absolute top-10 left-12 max-w-md hidden lg:block">
                   <CardLabel className="text-[#1A8E9F] mb-2">Detailed Architecture</CardLabel>
                   <h3 className={`${Typography.title} text-[28px] lg:text-[36px] text-[#0E4E68] leading-tight tracking-tight`}>Experience Center of Excellence</h3>
                </div>

                <div className="w-full h-full p-4 lg:p-8">
                  <StrategyDiagram />
                </div>

                {/* Escape hint */}
                <div className="absolute bottom-8 text-[#0E4E68]/30 text-[10px] font-black uppercase tracking-[0.3em]">
                  Press anywhere to return
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </FullCenteredLayout>
    );
  }

  if (id === 'toolkit') {
    return (
      <FullCenteredLayout centered={true} className="!pt-[4vh] lg:!pt-[6vh]">
        <header className="mb-6 lg:mb-10 w-full">
          <SectionHeader category={slide.category} title={slide.title} description={slide.description} />
        </header>
        <div className="mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 w-full items-start">
           {slide.artifacts.map((art: any, i: number) => (
             <div key={art.id} onClick={() => onSelectDoc(art)} className="group cursor-zoom-in">
                <div className="relative aspect-[3/2] rounded-[32px] lg:rounded-[40px] overflow-hidden bg-[#F3F1EA] border border-[#0E4E68]/5 mb-5 shadow-sm group-hover:shadow-2xl group-hover:shadow-[#0E4E68]/10 transition-all duration-700">
                   <img src={art.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={art.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0E4E68]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2.5 px-2">
                   <CardLabel className="text-[10px] text-[#1A8E9F] font-black tracking-[0.2em] uppercase">{art.tag}</CardLabel>
                   <h4 className={`${Typography.title} text-[22px] lg:text-[26px] text-[#0E4E68] leading-tight tracking-tight group-hover:text-[#1A8E9F] transition-colors`}>{art.title}</h4>
                   <CardBody className="text-[13px] lg:text-[14px] leading-relaxed text-[#0E4E68]/60">{art.text}</CardBody>
                </div>
             </div>
           ))}
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'impact') {
    return (
      <FullCenteredLayout centered={true} className="!justify-center relative overflow-hidden">
        {/* Subtle Slide-Specific Aurora Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#1A8E9F]/5 rounded-full blur-[100px] -z-10" />
        
        <header className="mb-8 lg:mb-12 w-full">
          <SectionHeader category={slide.category} title="Tangible Evolution" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-center relative">
          {/* Left Column: Monumental Stats - Compacted for single scroll */}
          <div className="col-span-1 lg:col-span-5 space-y-6 lg:space-y-8">
            {slide.stats.map((s: any, i: number) => (
              <div key={i} className="group flex items-center gap-6 lg:gap-8 relative">
                {/* Architectural Line - Shorter */}
                <div className="w-[1px] h-16 lg:h-20 bg-[#0E4E68]/10 relative shrink-0">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    className="absolute top-0 left-0 w-full bg-[#D8614E]"
                  />
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-3">
                    <span className={`${Typography.title} text-[56px] lg:text-[84px] text-[#D8614E] leading-none tracking-tighter tabular-nums`}>
                      {s.value}
                    </span>
                    <span className={`${Typography.body} text-[9px] lg:text-[10px] font-black text-[#0E4E68] uppercase tracking-[0.2em] mb-2`}>
                      {s.label}
                    </span>
                  </div>
                  <p className={`${Typography.body} text-[12px] lg:text-[14px] text-[#0E4E68]/50 font-medium leading-tight max-w-[220px]`}>
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Narrative - Simplified and cleaned up */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-white/30 backdrop-blur-md rounded-[40px] p-8 lg:p-12 relative overflow-hidden border border-white/40">
              <div className="relative z-10 space-y-8">
                {/* Clean Narrative List - No competing titles */}
                <div className="grid grid-cols-1 gap-5 lg:gap-6">
                  {slide.whatChanged.map((item: string, i: number) => (
                    <div key={i} className="flex gap-5 items-start group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D8614E] shrink-0" />
                      <p className={`${Typography.body} text-[16px] lg:text-[19px] text-[#0E4E68]/80 leading-snug font-medium tracking-tight`}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#0E4E68]/5">
                   <p className={`${Typography.title} text-[18px] lg:text-[22px] text-[#1A8E9F] italic font-normal`}>
                     From individual effort to <span className="text-[#0E4E68] not-italic font-semibold">organizational discipline</span>.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'governance') {
    return (
      <FullCenteredLayout centered={true} className="!justify-center relative overflow-hidden h-screen max-h-screen">
        {/* Dynamic Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#1A8E9F]/5 to-[#D8614E]/5 rounded-full blur-[120px] -z-10" />

        <header className="mb-10 lg:mb-12 w-full text-center max-w-4xl mx-auto shrink-0">
          <SectionHeader 
            category={slide.category} 
            title={slide.title} 
            description={slide.description} 
            className="text-center"
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 w-full max-w-7xl mx-auto relative px-8 flex-grow items-start">
          {slide.rituals.map((r: any, i: number) => (
            <div key={i} className="group relative flex flex-col items-center text-center">
              
              {/* Numeric & Icon Visual */}
              <div className="relative mb-8 h-28 lg:h-36 flex items-center justify-center">
                <span className="text-[100px] lg:text-[140px] font-serif italic text-[#0E4E68]/5 leading-none absolute inset-0 flex items-center justify-center group-hover:text-[#1A8E9F]/20 transition-all duration-1000 ease-in-out pointer-events-none select-none">
                  0{i + 1}
                </span>
                
                <div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center text-[#D8614E] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                   <SafeIcon icon={r.icon} size={36} className="opacity-80 group-hover:opacity-100" />
                   <div className="absolute inset-0 bg-[#D8614E]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Pure Typography Content */}
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <span className={`${Typography.body} text-[10px] font-black text-[#D8614E] uppercase tracking-[0.2em] mb-1 opacity-60`}>
                    {r.freq}
                  </span>
                  <h4 className={`${Typography.title} text-[26px] lg:text-[32px] text-[#0E4E68] leading-tight transition-all duration-700 group-hover:text-[#1A8E9F] tracking-tighter`}>
                    {r.title}
                  </h4>
                </div>
                
                <div className="w-8 h-[1px] bg-[#D8614E]/20 mx-auto group-hover:w-16 group-hover:bg-[#1A8E9F]/40 transition-all duration-700" />
                
                <p className={`${Typography.body} text-[15px] lg:text-[17px] leading-relaxed text-[#0E4E68]/60 group-hover:text-[#0E4E68]/90 transition-colors max-w-[280px] mx-auto`}>
                  {r.text}
                </p>
              </div>

              {/* Vertical accent (no border) */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-[#0E4E68]/5 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Marimekko Detail */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
           <svg width="100" height="30" viewBox="0 0 120 40">
             <circle cx="20" cy="20" r="15" fill="#1A8E9F" />
             <circle cx="60" cy="20" r="15" fill="#D8614E" />
             <circle cx="100" cy="20" r="15" fill="#1A8E9F" />
           </svg>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'learnings') {
    return (
      <FullCenteredLayout centered={true} className="!justify-center relative overflow-hidden h-screen max-h-screen">
        {/* Dynamic Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D8614E]/5 to-[#1A8E9F]/5 rounded-full blur-[120px] -z-10" />

        <header className="mb-10 lg:mb-12 w-full text-center max-w-4xl mx-auto shrink-0">
          <SectionHeader 
            category={slide.category} 
            title={slide.title} 
            description={slide.description} 
            className="text-center"
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 w-full max-w-7xl mx-auto relative px-8 flex-grow items-start">
          {slide.lessons.map((lesson: any, i: number) => (
            <div key={i} className="group relative flex flex-col items-center text-center">
              
              {/* Numeric & Icon Visual */}
              <div className="relative mb-8 h-28 lg:h-36 flex items-center justify-center">
                <span className="text-[100px] lg:text-[140px] font-serif italic text-[#0E4E68]/5 leading-none absolute inset-0 flex items-center justify-center group-hover:text-[#1A8E9F]/20 transition-all duration-1000 ease-in-out pointer-events-none select-none">
                  0{i + 1}
                </span>
                
                <div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center text-[#D8614E] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                   <SafeIcon icon={lesson.icon} size={36} className="opacity-80 group-hover:opacity-100" />
                   <div className="absolute inset-0 bg-[#D8614E]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Pure Typography Content */}
              <div className="space-y-4">
                <h4 className={`${Typography.title} text-[26px] lg:text-[32px] text-[#0E4E68] leading-tight transition-all duration-700 group-hover:text-[#1A8E9F] tracking-tighter`}>
                  {lesson.title}
                </h4>
                
                <div className="w-8 h-[1px] bg-[#D8614E]/20 mx-auto group-hover:w-16 group-hover:bg-[#1A8E9F]/40 transition-all duration-700" />
                
                <p className={`${Typography.body} text-[15px] lg:text-[17px] leading-relaxed text-[#0E4E68]/60 group-hover:text-[#0E4E68]/90 transition-colors max-w-[280px] mx-auto`}>
                  {lesson.text}
                </p>
              </div>

              {/* Vertical accent (no border) */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-[#0E4E68]/5 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'closing') {
    return (
      <FullCenteredLayout centered={true} className="!justify-center relative overflow-hidden h-screen max-h-screen pb-8 pt-6">
        {/* Apple-style Aurora Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] -z-10">
          <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] bg-[#1A8E9F]/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-[#D8614E]/5 rounded-full blur-[140px]" />
        </div>
        
        {/* Marimekko Dots Depth */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0E4E68 1.5px, transparent 1.5px)', backgroundSize: '70px 70px' }} />

        <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-6 relative z-10 w-full">
          
          {/* 1. SECTION LABEL (Consistent Pill Style) - Compact */}
          <div className="mb-6 lg:mb-8">
            <div className="bg-[#1A8E9F]/10 px-5 py-1.5 rounded-full border border-[#1A8E9F]/20">
              <span className={`${Typography.body} text-[10px] font-black text-[#1A8E9F] uppercase tracking-[0.3em]`}>
                09 / THE FUTURE
              </span>
            </div>
          </div>

          {/* 2. THE HOOK (Slide Title) - Adjusted Size/Leading */}
          <h2 className={`${Typography.title} text-[38px] lg:text-[54px] text-[#0E4E68] leading-[1.0] tracking-tight mb-6 max-w-3xl`}>
            Building for what comes next
          </h2>

          {/* 3. THE BRAND (Consistent with high-end Petroleum palette) - Adjusted Size */}
          <div className="flex flex-col items-center mb-6 lg:mb-8">
            <h3 className={`${Typography.title} text-[30px] lg:text-[44px] text-[#0E4E68] leading-none mb-2 tracking-tighter`}>
              {slide.contactInfo.name}
            </h3>
            <p className={`${Typography.body} text-[10px] lg:text-[11px] font-black text-[#1A8E9F] uppercase tracking-[0.5em] opacity-80`}>
              {slide.contactInfo.role}
            </p>
          </div>

          {/* 4. THE MANIFESTO (Now using Inter as requested) */}
          <p className={`${Typography.body} text-[15px] lg:text-[17px] text-[#0E4E68]/70 font-medium leading-relaxed max-w-xl mb-8 lg:mb-10`}>
             "Architecting systems that align business goals with human needs, transforming organizational complexity into customer value."
          </p>

          {/* 5. CONTACT & CTAS (Unified Horizontal Row) - Compact padding */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-8 lg:gap-10">
            
            {/* Contact Group (Subtle & Elegant) - Reduced Padding */}
            <div className="flex flex-wrap justify-center gap-x-12 lg:gap-x-16 gap-y-4 border-y border-[#0E4E68]/5 py-5 w-full px-8">
              <a href={`mailto:${slide.contactInfo.email}`} className="flex items-center gap-4 group hover:no-underline no-underline">
                <div className="w-9 h-9 rounded-full border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] transition-all duration-500 group-hover:bg-[#1A8E9F] group-hover:text-white group-hover:border-transparent shrink-0">
                  <SafeIcon icon="Mail" size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black text-[#1A8E9F] uppercase tracking-widest mb-0.5 opacity-60 leading-none">LET'S TALK</p>
                  <p className={`${Typography.body} text-[14px] lg:text-[16px] font-bold text-[#0E4E68] tracking-tight leading-none`}>{slide.contactInfo.email}</p>
                </div>
              </a>

              <a href={`https://${slide.contactInfo.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:no-underline no-underline">
                <div className="w-9 h-9 rounded-full border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] transition-all duration-500 group-hover:bg-[#1A8E9F] group-hover:text-white group-hover:border-transparent shrink-0">
                  <SafeIcon icon="Share2" size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black text-[#1A8E9F] uppercase tracking-widest mb-0.5 opacity-60 leading-none">FOLLOW</p>
                  <p className={`${Typography.body} text-[14px] lg:text-[16px] font-bold text-[#0E4E68] tracking-tight leading-none`}>{slide.contactInfo.linkedIn.replace('linkedin.com/in/', '')}</p>
                </div>
              </a>
            </div>

            {/* CTA Group - Positions Refined (Primary focus on Next Case) */}
            <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-8 lg:gap-12">
              <button className="bg-[#0E4E68] text-white pl-10 pr-8 py-4 rounded-full flex items-center gap-5 group hover:bg-[#1A8E9F] transition-all duration-700 shadow-[0_15px_30px_-8px_rgba(14,78,104,0.2)] cursor-pointer active:scale-95">
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">SIGUIENTE CASO</span>
                <div className="w-4 h-4 flex items-center justify-center transition-transform group-hover:translate-x-1.5">
                  <SafeIcon icon="ArrowRight" size={14} />
                </div>
              </button>
              
              <button 
                onClick={onPrint}
                className={`${Typography.body} text-[10px] font-black text-[#0E4E68]/40 uppercase tracking-[0.4em] hover:text-[#D8614E] transition-all cursor-pointer border-b border-[#0E4E68]/10 hover:border-[#D8614E]/30 pb-0.5`}
              >
                DESCARGAR PORTFOLIO (PDF)
              </button>
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  return null;
}
