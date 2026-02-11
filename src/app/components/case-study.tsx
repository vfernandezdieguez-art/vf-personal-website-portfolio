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

// ... (rest of the file remains as previously read)
