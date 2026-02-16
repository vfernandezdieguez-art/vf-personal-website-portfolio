import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as LucideIcons from "lucide-react";
import { 
  motion, AnimatePresence, 
  Pill, Heading, BodyText, IconButton, StatItem, ArtifactCard, 
  GlobalHeader, SlideFooter, FullCenteredLayout, SplitLayout, SectionHeader,
  Colors, Typography, CardTitle, CardLabel, CardBody, BaseCard, SafeIcon
} from "./ui-kit";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Assets
import teamImage1 from '../../assets/e3a22d6960490a45ffcc0d24e1a869dfca4ffa88.png';
import eventImage from '../../assets/5844756e19790e7d1433c2abbd9dec891e645057.png';
import groupImage from '../../assets/63fac24f37631fc5c6e93637e122a66a63c6002c.png';
import gpTeamPhoto from '../../assets/bbc15dc266cae7d12a3fa31f99b613e6d84f5a48.png';
import maturityFramework from '../../assets/6c5385c5b1dbcb1880f29de40d3a7f77097e5b57.png';
import maturityScales from '../../assets/1684521193bcc9d1dac5e3348a4b96f4098fbac5.png';
import effortModel from '../../assets/a227bff4af1daa63b9939c4bdc5ec6ae409eebc6.png';

// --- DATA ---
const slidesData = [
  { 
    id: 'cover', 
    sidebarLabel: { EN: 'COVER', ES: 'INICIO' },
    EN: { title: 'Experience Center of Excellence', subtitle: 'Transforming organizational design into measurable customer experience impact.', category: 'GRUP Petersen', metadata: 'Head of Customer Experience', year: '2023 — 2025' },
    ES: { title: 'Centro de Excelencia de Experiencia', subtitle: 'Transformando el diseño organizacional en un impacto medible en la experiencia del cliente.', category: 'GRUP Petersen', metadata: 'Responsable de Experiencia del Cliente', year: '2023 — 2025' }
  },
  { 
    id: 'context', 
    sidebarLabel: { EN: 'CONTEXT', ES: 'CONTEXTO' },
    EN: { title: 'From interfaces to products', category: '01 / CONTEXT', content: 'In 2022, UX existed as a small, execution-focused UI team.\nAcross four banks, there were four designers — mostly working on digital interfaces.\n\nAt the same time, the group began moving toward product-based teams.\nDigital channels were partially unified.\nServices, processes, and technology weren’t.\n\nEach bank still operated with its own realities.\nDifferent priorities.\nDifferent decision paths.\nSame customers.\n\nThis wasn’t only fragmentation.\nIt was a shift in how products would need to be built.' },
    ES: { title: 'De interfaces a productos', category: '01 / CONTEXTO', content: 'En 2022, UX existía como un equipo pequeño de UI enfocado en la ejecución.\nEn cuatro bancos, había cuatro diseñadores — trabajando mayormente en interfaces digitales.\n\nAl mismo tiempo, el grupo comenzó a transicionar hacia equipos basados en productos.\nLos canales digitales se unificaron parcialmente.\nLos servicios, procesos y tecnología no.\n\nCada banco seguía operando con sus propias realidades.\nPrioridades distintas.\nCaminos de decisión diferentes.\nMismos clientes.\n\nEsto no era solo fragmentación.\nEra un cambio en la forma en que los productos debían construirse.' }
  },
  { 
    id: 'challenge', 
    sidebarLabel: { EN: 'CHALLENGE', ES: 'DESAFÍO' },
    EN: { title: 'The Fragmentation Barrier', category: '02 / THE CHALLENGE', introText: 'Product teams were starting to form. The ambition was there: move faster, ship more, own outcomes.\n\nBut the capability behind those teams wasn’t ready yet. Without shared research, standards, governance, and measurement, autonomy turns into inconsistency — and speed turns into rework.\n\nWhat we needed wasn’t “more design”. We needed a system that could scale across four realities.' },
    ES: { title: 'La barrera de la fragmentación', category: '02 / EL DESAFÍO', introText: 'Los equipos de producto estaban empezando a formarse. La ambición estaba ahí: moverse más rápido, entregar más, ser dueños de los resultados.\n\nPero la capacidad detrás de esos equipos aún no estaba lista. Sin investigación compartida, estándares, gobernanza y medición, la autonomía se convierte en inconsistencia — y la velocidad en retrabajo.\n\nLo que necesitábamos no era "más diseño". Necesitábamos un sistema que pudiera escalar a través de cuatro realidades.' }
  },
  { 
    id: 'pillars', 
    sidebarLabel: { EN: 'OPERATING MODEL', ES: 'MODELO OPERATIVO' },
    EN: { 
      title: 'The Operating Model', category: '03 / SYSTEM', 
      introText: 'To bridge the gap between autonomy and consistency, we defined four operational mandates that became the backbone of the CoE.\n\nThese pillars allowed us to protect the craft while empowering product squads to move at their own pace.', 
      missionBullets: [
        { icon: 'Share2', label: 'MULTI-BANK', text: 'Operate across four bank realities.', subtext: 'Different services, processes, and tech constraints — one operating model.' }, 
        { icon: 'Zap', label: 'AUTONOMY', text: 'Support product teams.', subtext: 'Shared tools and rituals so teams could move without waiting for a central backlog.' }, 
        { icon: 'Target', label: 'ALIGNMENT', text: 'Business priorities first.', subtext: 'A way to make trade-offs visible and align decisions across Business and Tech.' }, 
        { icon: 'Layers', label: 'SYSTEMIC', text: 'Scale without friction.', subtext: 'Research loops, standards, and metrics that reduce rework over time.' }
      ] 
    },
    ES: { 
      title: 'El modelo operativo', category: '03 / SISTEMA', 
      introText: 'Para cerrar la brecha entre autonomía y consistencia, definimos cuatro mandatos operativos que se convirtieron en la columna vertebral del CoE.\n\nEstos pilares nos permitieron proteger el oficio mientras empoderábamos a las células de producto para moverse a su propio ritmo.', 
      missionBullets: [
        { icon: 'Share2', label: 'MULTI-BANCO', text: 'Operar en cuatro realidades bancarias.', subtext: 'Diferentes servicios, procesos y restricciones tecnológicas — un solo modelo operativo.' }, 
        { icon: 'Zap', label: 'AUTONOMÍA', text: 'Soporte a equipos de producto.', subtext: 'Herramientas y rituales compartidos para que los equipos avancen sin esperar un backlog central.' }, 
        { icon: 'Target', label: 'ALINEACIÓN', text: 'Prioridades de negocio primero.', subtext: 'Una forma de visibilizar los compromisos y alinear decisiones entre Negocio y Tecnología.' }, 
        { icon: 'Layers', label: 'SISTÉMICO', text: 'Escalar sin fricciones.', subtext: 'Ciclos de investigación, estándares y métricas que reducen el retrabajo con el tiempo.' }
      ] 
    }
  },
  { 
    id: 'strategy', 
    sidebarLabel: { EN: 'STRATEGY', ES: 'ESTRATEGIA' },
    EN: { 
      category: '04 / THE STRATEGY', title: 'Architecture of Convergence', subtitle: 'From Fragmented Design to Systemic Growth', 
      description: 'We didn’t just build a team; we built a shared operating system. By abstracting complexity, we allowed 4 independent banks to scale UX maturity.', 
      pillars: [
        { id: 'foundation', title: 'Foundation', label: 'CORE', text: 'Shared Design System and Methodological Toolkit.', icon: 'Layers' }, 
        { id: 'orchestration', title: 'Orchestration', label: 'FLOW', text: 'Governance models that sync 50+ designers.', icon: 'Zap' }, 
        { id: 'enablement', title: 'Enablement', label: 'IMPACT', text: 'Coaching and growth paths for localized squads.', icon: 'Target' }, 
        { id: 'metrics', title: 'CX Metrics & Insights', label: 'DATA', text: 'Measuring impact and user feedback group-wide.', icon: 'Target' }
      ] 
    },
    ES: { 
      category: '04 / LA ESTRATEGIA', title: 'Arquitectura de convergencia', subtitle: 'Del diseño fragmentado al crecimiento sistémico', 
      description: 'No solo construimos un equipo; construimos un sistema operativo compartido. Al abstraer la complejidad, permitimos que 4 bancos independientes escalaran su madurez de UX.', 
      pillars: [
        { id: 'foundation', title: 'Cimientos', label: 'NÚCLEO', text: 'Design System compartido y toolkit metodológico.', icon: 'Layers' }, 
        { id: 'orchestration', title: 'Orquestación', label: 'FLUJO', text: 'Modelos de gobernanza que sincronizan a más de 50 diseñadores.', icon: 'Zap' }, 
        { id: 'enablement', title: 'Habilitación', label: 'IMPACTO', text: 'Caminos de coaching y crecimiento para equipos localizados.', icon: 'Target' }, 
        { id: 'metrics', title: 'Métricas e Insights de CX', label: 'DATOS', text: 'Midiendo el impacto y el feedback de usuarios en todo el grupo.', icon: 'Target' }
      ] 
    }
  },
  { 
    id: 'role', 
    sidebarLabel: { EN: 'MY ROLE', ES: 'MI ROL' },
    collage: [gpTeamPhoto, eventImage, groupImage, teamImage1],
    EN: { 
      title: 'Architecting the System', category: '05 / MY ROLE', roleIntro: 'My role was to design and install the operating model behind Experience across four banks.\n\nNot to centralize decisions.\nNot to take over product.\n\nI worked across three layers:', 
      roleBullets: [
        { label: 'STRATEGY', title: 'Strategy', text: 'Defining principles and governance.' }, 
        { label: 'ORGANIZATION', title: 'Organization', text: 'Designing the CoE model.' }, 
        { label: 'CAPABILITY', title: 'Capability', text: 'Developing talent and maturity paths.' }
      ] 
    },
    ES: { 
      title: 'Arquitecto del sistema', category: '05 / MI ROL', roleIntro: 'Mi rol fue diseñar e instalar el modelo operativo detrás de Experiencia en los cuatro bancos.\n\nNo para centralizar decisiones.\nNo para apropiarme del producto.\n\nTrabajé en tres capas:', 
      roleBullets: [
        { label: 'ESTRATEGIA', title: 'Estrategia', text: 'Definición de principios y gobernanza.' }, 
        { label: 'ORGANIZACIÓN', title: 'Organización', text: 'Diseño del modelo de CoE.' }, 
        { label: 'CAPACIDAD', title: 'Capacidad', text: 'Desarrollo de talento y rutas de madurez.' }
      ] 
    }
  },
  { 
    id: 'toolkit', 
    sidebarLabel: { EN: 'TOOLKIT', ES: 'HERRAMIENTAS' },
    EN: { 
      category: '06 / THE TOOLKIT', title: 'Governance through Design', description: 'We developed custom methodological frameworks to move from tactical design to strategic influence.', 
      artifacts: [
        { 
          id: 'maturity', title: 'Maturity Framework', tag: 'EVALUATION', image: maturityFramework,
          text: 'CX/UX maturity assessment across four banks.', 
          methodology: 'A maturity model used to align priorities and stop low-impact work — so effort was directed toward structural consistency across entities.',
          insights: [
            'A shared baseline for decision-making.',
            'Clear capability gaps by discipline and by bank.',
            'A roadmap anchored in capability — not incoming requests.',
            'Consistent scoring to track progress over time.'
          ]
        },
        { 
          id: 'scales', title: 'Role Maturity Scales', tag: 'IMPACT', image: maturityScales,
          text: 'Definition of how each role contributes to strategic influence.', 
          description: 'We needed a shared language to define what “senior” meant across four banks.\n\nRoles existed.\nTitles existed.\nExpectations did not.',
          methodology: 'A maturity model used to:\n\n• Clarify decision ownership across roles.\n• Align growth paths with product impact.\n• Identify capability gaps before hiring.\n• Redirect effort from tactical output to strategic influence.',
          quote: 'The framework allowed us to stop misaligned growth. Not every team needed more designers; some needed stronger product thinking.',
          insights: [
            'Seniority defined by business impact — not years of experience.',
            'Clear contribution levels across Product, Design, and Research.',
            'Alignment with the Central CoE operating principles.',
            'Cross-bank skill visibility and capability mapping.'
          ]
        },
        { 
          id: 'effort', title: 'Effort–Uncertainty Model', tag: 'PRIORITIZATION', image: effortModel,
          text: 'A shared model to plan and challenge CX initiatives across entities.', 
          methodology: 'A prioritization model that allowed us to stop projects — not just rank them — and reduce rework before delivery started.',
          insights: [
            'Risk-based backlog planning.',
            'Technical and discovery uncertainty visibility.',
            'Design effort aligned with business validation.',
            'Shared decision criteria across banks.'
          ]
        }
      ] 
    },
    ES: { 
      category: '06 / EL TOOLKIT', title: 'Gobernanza a través del diseño', description: 'Desarrollamos marcos metodológicos a medida para pasar del diseño táctico a la influencia estratégica.', 
      artifacts: [
        { 
          id: 'maturity', title: 'Marco de Madurez', tag: 'EVALUACIÓN', image: maturityFramework,
          text: 'Evaluación de madurez de CX/UX en los cuatro bancos.', 
          methodology: 'Un modelo de madurez utilizado para alinear prioridades y detener el trabajo de bajo impacto, de modo que el esfuerzo se dirigiera a la consistencia estructural entre entidades.',
          insights: [
            'Una base compartida para la toma de decisiones.',
            'Brechas de capacidad claras por disciplina y por banco.',
            'Una hoja de ruta anclada en la capacidad, no en solicitudes entrantes.',
            'Puntaje consistente para seguir el progreso en el tiempo.'
          ]
        },
        { 
          id: 'scales', title: 'Escalas de Madurez de Rol', tag: 'IMPACTO', image: maturityScales,
          text: 'Definición de cómo cada rol contribuye a la influencia estratégica.', 
          description: 'Necesitábamos un lenguaje compartido para definir qué significaba "senior" en los cuatro bancos.\n\nLos roles existían.\nLos títulos existían.\nLas expectativas no.',
          methodology: 'Un modelo de madurez utilizado para:\n\n• Clarificar la propiedad de decisiones por rol.\n• Alineación de rutas de crecimiento con el impacto en producto.\n• Identificar brechas de capacidad antes de contratar.\n• Redirigir el esfuerzo de resultados tácticos a la influencia estratégica.',
          quote: 'El marco nos permitió detener el crecimiento desalineado. No todos los equipos necesitaban más diseñadores; algunos necesitaban un pensamiento de producto más sólido.',
          insights: [
            'Seniority definida por impacto de negocio, no por años de experiencia.',
            'Niveles de contribución claros en Producto, Diseño e Investigación.',
            'Alineación con los principios operativos del CoE Central.',
            'Visibilidad de habilidades y mapeo de capacidades entre bancos.'
          ]
        },
        { 
          id: 'effort', title: 'Modelo Esfuerzo-Incertidumbre', tag: 'PRIORIZACIÓN', image: effortModel,
          text: 'Un modelo compartido para planificar y desafiar iniciativas de CX entre entidades.', 
          methodology: 'Un modelo de priorización que nos permitió detener proyectos, no solo clasificarlos, y reducir el retrabajo antes de que comenzara la entrega.',
          insights: [
            'Planificación de backlog basada en riesgos.',
            'Visibilidad de la incertidumbre técnica y de descubrimiento.',
            'Esfuerzo de diseño alineado con la validación de negocio.',
            'Criterios de decisión compartidos entre los bancos.'
          ]
        }
      ] 
    }
  },
  { 
    id: 'governance', 
    sidebarLabel: { EN: 'GOVERNANCE', ES: 'GOBERNANZA' },
    EN: { 
      category: '07 / GOVERNANCE', title: 'The Operating Cadence', description: 'Scaling to 50+ professionals across 4 banks required more than a heartbeat.', 
      introTitle: 'Scaling 50+ professionals across 4 banks required a shared decision rhythm.',
      introSubtitle: 'This cadence replaced ad-hoc coordination with institutional discipline.',
      rituals: [
        { num: "01", title: "CX Chapter", freq: "Bi-weekly", desc: ["Craft alignment across banks.", "Shared criteria for what “good” looks like."] }, 
        { num: "02", title: "Design Critiques", freq: "Weekly", desc: ["Peer reviews to ensure quality.", "Scaling standards without centralizing output."] }, 
        { num: "03", title: "Sync Meetings", freq: "Monthly", desc: ["Strategic alignment with Business & Tech.", "Ensuring UX maturity scales with product speed."] }
      ] 
    },
    ES: { 
      category: '07 / GOBERNANZA', title: 'Los rituales del escalado', description: 'Escalar a más de 50 profesionales en 4 bancos requirió más que solo coordinación.', 
      introTitle: 'Escalar a más de 50 profesionales en 4 bancos requirió un ritmo compartido de decisiones.',
      introSubtitle: 'Esta cadencia reemplazó la coordinación ad-hoc con una disciplina institucional.',
      rituals: [
        { num: "01", title: "CX Chapter", freq: "Quincenal", desc: ["Alineación del oficio en todos los bancos.", "Criterios compartidos sobre qué es calidad."] }, 
        { num: "02", title: "Design Critiques", freq: "Semanal", desc: ["Revisiones entre pares para asegurar la calidad.", "Escalar estándares sin centralizar la producción."] }, 
        { num: "03", title: "Sync Meetings", freq: "Mensual", desc: ["Alineación estratégica con Negocio y Tecnología.", "Asegurar que la madurez escala con la velocidad de producto."] }
      ] 
    }
  },
  { 
    id: 'impact', 
    sidebarLabel: { EN: 'IMPACT', ES: 'IMPACTO' },
    EN: { 
      title: 'Tangible Evolution', category: '08 / THE IMPACT', 
      stats: [
        { value: '+10', label: 'NPS INCREASE', sub: 'Across priority journeys' }, 
        { value: '−30%', label: 'REWORK REDUCTION', sub: 'In CX initiatives' }, 
        { value: '100+', label: 'ALIGNED PROJECTS', sub: 'Under shared OKRs' }
      ], 
      narrative: [
        "CX governance implemented across 4 banks.",
        "50+ UX professionals operating under shared principles.",
        "UX, CX, and VoC integrated into one operating model.",
        "Design System adopted across 4 brands."
      ],
      closingNote: "Results were not driven by isolated design improvements. They were the outcome of installing a shared operating model across banks.",
      bullets: ["The shift was structural.", "Alignment reduced rework.", "Governance increased predictability."]
    },
    ES: { 
      title: 'Evolución Tangible', category: '08 / EL IMPACTO', 
      stats: [
        { value: '+10', label: 'INCREMENTO NPS', sub: 'En viajes prioritarios' }, 
        { value: '−30%', label: 'REDUCCIÓN RETRABAJO', sub: 'En iniciativas de CX' }, 
        { value: '100+', label: 'PROYECTOS ALINEADOS', sub: 'Bajo OKRs compartidos' }
      ], 
      narrative: [
        "Gobernanza de CX implementada en 4 bancos.",
        "Más de 50 profesionales de UX operando bajo principios compartidos.",
        "UX, CX y VoC integrados en un único modelo de experiencia.",
        "Design System adoptado en las 4 marcas."
      ],
      closingNote: "Los resultados no fueron impulsados por mejoras de diseño aisladas. Fueron el resultado de instalar un modelo operativo compartido entre bancos.",
      bullets: ["El cambio fue estructural.", "La alineación redujo el retrabajo.", "La gobernanza aumentó la previsibilidad."]
    }
  },
  { 
    id: 'impact-practice', 
    sidebarLabel: { EN: 'IMPACT', ES: 'IMPACTO' },
    EN: { 
      category: '08 / THE IMPACT', title: 'What Changed in Practice', introTitle: 'The transformation was not structural only.', introSubtitle: 'It changed how product decisions were made.', 
      changes: [
        "Experience criteria became part of roadmap conversations.", 
        "Research was embedded in priority journeys.", 
        "Cross-bank inconsistencies were escalated and resolved at governance level.", 
        "Design moved from execution to influence."
      ], 
      footerNote: "Product teams gained autonomy — but within shared standards." 
    },
    ES: { 
      category: '08 / EL IMPACTO', title: 'Qué cambió en la práctica', introTitle: 'La transformación no fue solo estructural.', introSubtitle: 'Cambió la forma en que se tomaban las decisiones de producto.', 
      changes: [
        "Los criterios de experiencia se volvieron parte de las conversaciones de roadmap.",
        "La investigación se integró en los viajes prioritarios del cliente.",
        "Las inconsistencias entre bancos se escalaron y resolvieron a nivel de gobernanza.",
        "El diseño pasó de la ejecución a la influencia estratégica."
      ], 
      footerNote: "Los equipos de producto ganaron autonomía, pero dentro de estándares compartidos." 
    }
  },
  { 
    id: 'learnings', 
    sidebarLabel: { EN: 'LEARNINGS', ES: 'APRENDIZAJES' },
    EN: { 
      category: '09 / REFLECTIONS', title: 'Systemic Learnings', description: 'Building a CoE is as much about organizational architecture\nas it is about cultural discipline.', 
      lessons: [
        { title: 'Trust over Tools', text: 'Frameworks only work when executive trust exists.', icon: 'Heart' }, 
        { title: 'Scale is a Craft', text: 'Capability grows through structure, feedback loops, and consistency.', icon: 'Layers' }, 
        { title: 'Business Language', text: 'Experience becomes strategic only when translated into measurable value.', icon: 'Target' }
      ] 
    },
    ES: { 
      category: '09 / REFLEXIONES', title: 'Aprendizajes sistémicos', description: 'Construir un CoE es tanto sobre arquitectura organizacional\ncomo sobre disciplina cultural.', 
      lessons: [
        { title: 'Confianza sobre herramientas', text: 'Los marcos de trabajo solo funcionan cuando existe confianza ejecutiva.', icon: 'Heart' }, 
        { title: 'Escalar es un oficio', text: 'La capacidad crece a través de la estructura, los ciclos de retroalimentación y la consistencia.', icon: 'Layers' }, 
        { title: 'Lenguaje de negocios', text: 'La experiencia se vuelve estratégica solo cuando se traduce en valor medible.', icon: 'Target' }
      ] 
    }
  },
  { 
    id: 'closing', 
    sidebarLabel: { EN: 'CLOSING', ES: 'CIERRE' },
    EN: { 
      category: '10 / THE FUTURE', title: 'Building for what comes next', subtitle: 'From a Center of Excellence to a Culture of Excellence.', 
      description: 'The transformation demonstrating that experience design is the ultimate business advantage.', 
      manifesto: "Bridging organizational architecture and business strategy to build high-performance systems that drive scalability and cultural alignment.",
      nextCase: "View next case",
      pdf: "Download Portfolio (PDF)",
      contactInfo: { name: 'Viviana Fernández', role: 'CX & Organizational Design Specialist', email: 'vfernandezdieguez@gmail.com', linkedIn: 'linkedin.com/in/vfernandezdieguez/' } 
    },
    ES: { 
      category: '10 / EL FUTURO', title: 'Construyendo para lo que viene', subtitle: 'De un Centro de Excelencia a una Cultura de Excelencia.', 
      description: 'La transformación demuestra que el diseño de experiencia es la ventaja competitiva definitiva.', 
      manifesto: "Uniendo la arquitectura organizacional y la estrategia de negocio para construir sistemas de alto rendimiento que impulsen el escalado y la alineación cultural.",
      nextCase: "Siguiente caso",
      pdf: "Descargar Portfolio (PDF)",
      contactInfo: { name: 'Viviana Fernández', role: 'Especialista en CX y Diseño Organizacional', email: 'vfernandezdieguez@gmail.com', linkedIn: 'linkedin.com/in/vfernandezdieguez/' } 
    }
  }
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

// --- CUSTOM ICONOGRAPHY & DIAGRAMS ---

const ChallengeDiagram = ({ lang }: { lang: string }) => (
  <div className="relative w-full h-full flex items-center justify-center p-2 lg:p-6">
    <div className="relative w-full aspect-square flex items-center justify-center rounded-[64px] lg:rounded-[80px] bg-white/70 backdrop-blur-[40px] border border-white/90 shadow-[0_80px_160px_-40px_rgba(14,78,104,0.25),0_0_100px_rgba(26,142,159,0.05)] overflow-visible group transition-transform duration-700 hover:scale-[1.02]">
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none rounded-[64px] lg:rounded-[80px]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1A8E9F]/20 via-transparent to-[#D8614E]/15 rounded-[64px] lg:rounded-[80px] opacity-40" />

      <svg viewBox="0 0 700 700" className="w-full h-full overflow-visible relative z-10 p-12 lg:p-16">
        <defs>
          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

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

        {/* DIAGONAL CONNECTING LINES - Moved here to be behind the circles */}
        <g>
          {["M 120 120 L 350 350", "M 580 120 L 350 350", "M 120 580 L 350 350", "M 580 580 L 350 350"].map((path, i) => (
            <path key={i} d={path} stroke="#1A8E9F" strokeWidth="2.5" strokeDasharray="10 10" opacity="0.3" />
          ))}
        </g>

        {/* FLOWING PARTICLES */}
        <g>
          {[
            { path: "M 350 350 L 120 120", delay: 0 },
            { path: "M 350 350 L 580 120", delay: 1.5 },
            { path: "M 350 350 L 120 580", delay: 0.7 },
            { path: "M 350 350 L 580 580", delay: 2.2 },
            { path: "M 350 350 L 120 120", delay: 1 },
            { path: "M 350 350 L 580 120", delay: 2.5 },
            { path: "M 350 350 L 120 580", delay: 1.7 },
            { path: "M 350 350 L 580 580", delay: 3.2 }
          ].map((flow, i) => (
            <circle key={`out-${i}`} r="4" fill="#1A8E9F" opacity="0">
              <animateMotion dur="4s" repeatCount="indefinite" path={flow.path} begin={`${flow.delay}s`} />
              <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin={`${flow.delay}s`} />
            </circle>
          ))}
        </g>

        <g filter="url(#centerGlow)">
          <circle cx="350" cy="350" r="95" fill="#0E4E68" />
          <text x="350" y="335" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" letterSpacing="0.4em" className="font-sans opacity-70 uppercase">
            {lang === 'EN' ? 'CENTER OF' : 'CENTRO DE'}
          </text>
          <text x="350" y="372" textAnchor="middle" fill="white" fontSize="28" className={`${Typography.title} font-normal`}>
            {lang === 'EN' ? 'Excellence' : 'Excelencia'}
          </text>
          <circle cx="435" cy="350" r="8" fill="#D8614E" />
        </g>

        {[
          { x: 120, y: 120, label: lang === 'EN' ? 'BANK A' : 'BANCO A' },
          { x: 580, y: 120, label: lang === 'EN' ? 'BANK B' : 'BANCO B' },
          { x: 120, y: 580, label: lang === 'EN' ? 'BANK C' : 'BANCO C' },
          { x: 580, y: 580, label: lang === 'EN' ? 'BANK D' : 'BANCO D' }
        ].map((bank, i) => (
          <g key={i}>
            <circle cx={bank.x} cy={bank.y} r="65" fill="white" fillOpacity="1" stroke="#0E4E68" strokeWidth="1.5" />
            <text x={bank.x} y={bank.y + 6} textAnchor="middle" fill="#0E4E68" fontSize="14" fontWeight="900" letterSpacing="0.25em" className="font-sans">{bank.label}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const StrategyDiagram = ({ lang }: { lang: string }) => (
  <div className="relative w-full h-full flex items-center justify-center overflow-visible group/diagram">
    <svg viewBox="0 0 1200 500" className="w-full h-full overflow-visible drop-shadow-sm" preserveAspectRatio="xMidYMid meet">
      {/* Agencies Group (Left) */}
      <g transform="translate(100, 250)">
        {[
          { y: -80, label: lang === 'EN' ? 'AGENCY A' : 'AGENCIA A' },
          { y: 80, label: lang === 'EN' ? 'AGENCY B' : 'AGENCIA B' }
        ].map((item, i) => (
          <g key={i} transform={`translate(0, ${item.y})`}>
            <rect x="-45" y="-18" width="90" height="36" rx="6" fill="white" stroke="#0E4E68" strokeWidth="0.5" strokeOpacity="0.2" className="drop-shadow-sm" />
            <text textAnchor="middle" y="4" fill="#0E4E68" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</text>
            <line x1="45" y1="0" x2="85" y2="0" stroke="#0E4E68" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <circle cx="110" cy="0" r="28" fill="white" stroke="#0E4E68" strokeWidth="0.5" strokeOpacity="0.1" className="drop-shadow-sm" />
            <text x="110" textAnchor="middle" y="-2" fill="#0E4E68" fontSize="6" fontWeight="900" letterSpacing="0.1em" opacity="0.4">{lang === 'EN' ? 'FOCAL' : 'PUNTO'}</text>
            <text x="110" textAnchor="middle" y="6" fill="#0E4E68" fontSize="6" fontWeight="900" letterSpacing="0.1em" opacity="0.4">{lang === 'EN' ? 'POINT' : 'FOCAL'}</text>
            <path d="M 138 0 Q 200 0 240 0" fill="none" stroke="#1A8E9F" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* Operational Vertical Columns (Center-Right) */}
      <g transform="translate(680, 0)">
        {[
          { x: 0, label: 'CX', sub: lang === 'EN' ? 'ORCHESTRATION' : 'ORQUESTACIÓN' },
          { x: 140, label: 'OPS', sub: lang === 'EN' ? 'FOUNDATION' : 'CIMIENTO' }
        ].map((col, i) => (
          <g key={i} transform={`translate(${col.x}, 0)`}>
            <rect x="-30" y="60" width="60" height="420" rx="30" fill="#0E4E68" fillOpacity="0.05" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" className="drop-shadow-sm" />
            <text x="0" y="30" textAnchor="middle" fill="#0E4E68" fontSize="12" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'Inter, sans-serif' }}>{col.label}</text>
            <text x="0" y="45" textAnchor="middle" fill="#0E4E68" fontSize="8" fontWeight="500" letterSpacing="0.1em" opacity="0.6" style={{ fontFamily: 'Inter, sans-serif' }}>{col.sub}</text>
          </g>
        ))}
      </g>

      {/* Business Units (Far Right) */}
      <g transform="translate(680, 0)">
        {[
          { x: 300, label: lang === 'EN' ? 'RETAIL' : 'MINORISTA' },
          { x: 460, label: lang === 'EN' ? 'CORPORATE' : 'CORPORATIVO' }
        ].map((col, i) => (
          <g key={i} transform={`translate(${col.x}, 0)`}>
            <rect x="-65" y="60" width="130" height="420" rx="16" fill="#1A8E9F" fillOpacity="0.03" stroke="#1A8E9F" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />
            <text x="0" y="30" textAnchor="middle" fill="#D8614E" fontSize="11" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'Inter, sans-serif' }}>{col.label}</text>
            <text x="0" y="45" textAnchor="middle" fill="#0E4E68" fontSize="8" fontWeight="500" letterSpacing="0.1em" opacity="0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{lang === 'EN' ? 'BUSINESS UNIT' : 'UNIDAD DE NEGOCIO'}</text>
            <g transform="translate(0, 460)">
              <text textAnchor="middle" fill="#0E4E68" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.4" style={{ fontFamily: 'Inter, sans-serif' }}>{lang === 'EN' ? 'PRODUCT TEAMS' : 'EQUIPOS DE PRODUCTO'}</text>
              <text textAnchor="middle" y="10" fill="#0E4E68" fontSize="8" fontWeight="900" letterSpacing="0.1em" opacity="0.4" style={{ fontFamily: 'Inter, sans-serif' }}>{lang === 'EN' ? '& CHANNELS' : 'Y CANALES'}</text>
            </g>
          </g>
        ))}
      </g>

      {/* Horizontal Operational Rows - Restored and adjusted to avoid overlap */}
      <g transform="translate(0, 250)">
        {[
          { y: -100, label: lang === 'EN' ? 'PRODUCT DESIGN' : 'DISEÑO DE PRODUCTO' },
          { y: -40, label: lang === 'EN' ? 'CONTENT DESIGN' : 'DISEÑO DE CONTENIDO' },
          { y: 40, label: lang === 'EN' ? 'RESEARCH' : 'INVESTIGACIÓN' },
          { y: 100, label: lang === 'EN' ? 'DESIGN OPS' : 'OPERACIONES DE DISEÑO' }
        ].map((row, i) => (
          <g key={i} transform={`translate(0, ${row.y})`}>
            {/* Start at 430 to clear the COE circle (which ends at 420) */}
            <rect x="430" y="-22" width="720" height="44" rx="22" fill="#0E4E68" fillOpacity="0.06" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" className="drop-shadow-sm" />
            <text x="460" y="4" fill="#0E4E68" fontSize="11" fontWeight="900" letterSpacing="0.3em" style={{ fontFamily: 'Inter, sans-serif' }}>{row.label}</text>
            {/* Connection dots with the vertical pillars */}
            {[680, 820, 980, 1140].map(x => (
              <circle key={x} cx={x} cy="0" r="5" fill="#1A8E9F" stroke="white" strokeWidth="2" className="drop-shadow-sm" />
            ))}
          </g>
        ))}
      </g>

      {/* Central COE CX Nucleus - Positioned to barely overlap the bars container but not the text */}
      <g transform="translate(345, 250)">
        <circle r="105" fill="#1A4A63" stroke="white" strokeWidth="5" className="shadow-2xl" />
        <circle r="92" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
        <text textAnchor="middle" y="12" fill="white" fontSize="38" fontWeight="900" letterSpacing="-0.02em" style={{ fontFamily: 'Playfair Display, serif' }}>COE CX</text>
        <circle cx="55" cy="-45" r="7" fill="#D8614E" />
      </g>
    </svg>
  </div>
);

// --- MAIN APP COMPONENT ---

export function CaseStudy() {
  const [lang, setLang] = useState<'EN' | 'ES'>('EN');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const slides = slidesData.map(s => {
    const langData = (s as any)[lang] || s['EN'];
    return {
      ...s,
      ...langData,
      sidebarLabel: (s.sidebarLabel as any)[lang] || (s.sidebarLabel as any)['EN']
    };
  });

  const slide = slides[currentSlide] || slides[0];

  const handleSelectDoc = (doc: any) => {
    setSelectedDoc(doc);
    // Si es un diagrama o estamos en móvil, colapsamos el sidebar por defecto para priorizar la visualización
    if (doc.id?.includes('diagram') || window.innerWidth < 768) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  };

  const paginate = useCallback((newDirection: number) => {
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      if (next < 0) return 0;
      if (next >= slides.length) return slides.length - 1;
      return next;
    });
  }, [slides.length]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen selection:bg-[#0E4E68]/10 text-[#0E4E68] overflow-x-hidden relative flex flex-col">
      <BackgroundMotion />
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      <GlobalHeader logoName="Viviana Fernández" lang={lang} onLangChange={setLang} />

      <main className="pt-[60px] lg:pt-[75px] min-h-screen flex flex-col relative z-20 overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={`${currentSlide}-${lang}`} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-grow flex flex-col"
          >
            <SlideRenderer slide={slide} lang={lang} onSelectDoc={handleSelectDoc} onPrint={handlePrint} />
          </motion.div>
        </AnimatePresence>
      </main>

      <SlideFooter 
        current={currentSlide} total={slides.length} label={slide.sidebarLabel} 
        onPrev={() => paginate(-1)} onNext={() => paginate(1)} onRestart={() => setCurrentSlide(0)}
        onGoTo={(index: number) => setCurrentSlide(index)}
        lang={lang}
      />

      <AnimatePresence>
        {selectedDoc && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[2000] bg-[#FBF8F1] flex flex-col overflow-hidden"
          >
            <header className="min-h-[100px] lg:h-[120px] px-6 lg:px-16 bg-white flex justify-between items-center relative z-[60] border-b border-[#0E4E68]/5 py-4">
               <div className="flex flex-col gap-1 pr-4">
                  <CardLabel className="text-[#1A8E9F] uppercase tracking-[0.3em] text-[8px] lg:text-[10px]">{selectedDoc.tag}</CardLabel>
                  <h2 className={`${Typography.title} text-[20px] lg:text-[42px] text-[#0E4E68] leading-tight tracking-tight`}>{selectedDoc.title}</h2>
               </div>
               <div className="flex items-center gap-3 lg:gap-6 shrink-0">
                  <button onClick={() => setSelectedDoc(null)} className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] hover:bg-[#0E4E68] hover:text-white transition-all duration-500 shadow-sm">
                    <SafeIcon icon="X" size={18} />
                  </button>
               </div>
            </header>

            <div className="flex-grow flex relative overflow-hidden">
               <div className="flex-grow bg-[#F3F1EA] overflow-hidden relative flex items-center justify-center">
                   <TransformWrapper 
                    key={selectedDoc.id}
                    initialScale={1} 
                    minScale={0.5} 
                    maxScale={8} 
                    centerOnInit={true}
                    limitToBounds={false}
                    panning={{ disabled: false, velocityDisabled: false }}
                    wheel={{ step: 0.1 }}
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <div className="relative w-full h-full flex flex-col">
                        {/* Floating Zoom Controls */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-[#0E4E68]/10 shadow-xl pointer-events-auto">
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); zoomOut(); }} 
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#1A8E9F]/10 text-[#0E4E68] transition-colors"
                          >
                            <SafeIcon icon="Minus" size={18} />
                          </button>
                          <div className="w-px h-4 bg-[#0E4E68]/10 mx-1" />
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); resetTransform(); }} 
                            className={`${Typography.body} text-[10px] uppercase tracking-widest px-3 hover:text-[#1A8E9F] transition-colors`}
                          >
                            {lang === 'EN' ? 'Reset' : 'Reiniciar'}
                          </button>
                          <div className="w-px h-4 bg-[#0E4E68]/10 mx-1" />
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); zoomIn(); }} 
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#1A8E9F]/10 text-[#0E4E68] transition-colors"
                          >
                            <SafeIcon icon="Plus" size={18} />
                          </button>
                        </div>

                        <TransformComponent 
                          wrapperClass="!w-full !h-full !max-h-full !max-w-full cursor-grab active:cursor-grabbing" 
                          contentClass="flex items-center justify-center min-w-full min-h-full"
                        >
                           <div className="flex items-center justify-center p-20 md:p-40">
                              {selectedDoc.id === 'strategy-diagram' ? (
                                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] lg:rounded-[48px] p-8 lg:p-16 shadow-2xl border border-white/60 origin-center">
                                  <div style={{ width: window.innerWidth < 768 ? '800px' : '1200px' }}>
                                    <StrategyDiagram lang={lang} />
                                  </div>
                                </div>
                              ) : selectedDoc.id === 'challenge-diagram' ? (
                                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] lg:rounded-[48px] p-8 lg:p-16 shadow-2xl border border-white/60 origin-center">
                                  <div style={{ width: window.innerWidth < 768 ? '700px' : '1000px' }}>
                                    <ChallengeDiagram lang={lang} />
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={selectedDoc.image} 
                                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain shadow-2xl rounded-sm origin-center" 
                                  alt={selectedDoc.title} 
                                  onDragStart={(e) => e.preventDefault()}
                                />
                              )}
                           </div>
                        </TransformComponent>
                      </div>
                    )}
                  </TransformWrapper>
               </div>

               {sidebarCollapsed && !selectedDoc.id?.includes('diagram') && (
                 <button 
                   onClick={() => setSidebarCollapsed(false)}
                   className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] bg-white border border-r-0 border-[#0E4E68]/10 py-10 px-2 rounded-l-[24px] shadow-2xl flex flex-col items-center gap-5 group hover:bg-[#1A8E9F]/5 transition-all duration-300"
                 >
                   <SafeIcon icon="ChevronLeft" size={16} className="text-[#1A8E9F] group-hover:-translate-x-1 transition-transform" />
                   <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] uppercase tracking-[0.4em] font-medium text-[#0E4E68]">{lang === 'EN' ? "View Details" : "Ver Detalles"}</span>
                 </button>
               )}

               <AnimatePresence>
                  {!sidebarCollapsed && !selectedDoc.id?.includes('diagram') && (
                    <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] lg:w-[550px] bg-white/95 backdrop-blur-3xl border-l border-[#0E4E68]/5 z-[110] overflow-y-auto p-8 lg:p-14 space-y-12">
                        <div className="flex items-center mb-6">
                           <button onClick={() => setSidebarCollapsed(true)} className="flex items-center gap-3 text-[#1A8E9F] group">
                             <SafeIcon icon="ChevronRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                             <span className="text-[10px] lg:text-[11px] font-normal uppercase tracking-widest">{lang === 'EN' ? "Hide Details" : "Ocultar Detalles"}</span>
                           </button>
                        </div>
                        <div className="space-y-6">
                          <CardLabel>{lang === 'EN' ? "Project Context" : "Contexto del Proyecto"}</CardLabel>
                          <h3 className={`${Typography.title} text-[28px] lg:text-[34px] text-[#0E4E68] leading-[1.15] tracking-tight`}>{selectedDoc.text}</h3>
                          {selectedDoc.description && <p className={`${Typography.body} text-[16px] lg:text-[17px] text-[#2F3B40] leading-relaxed whitespace-pre-line`}>{selectedDoc.description}</p>}
                          {selectedDoc.quote && <p className={`${Typography.body} text-[15px] lg:text-[16px] text-[#1A8E9F]/80 italic border-l-2 border-[#1A8E9F]/20 pl-6`}>"{selectedDoc.quote}"</p>}
                        </div>
                        <div className="space-y-8">
                          <CardLabel>{lang === 'EN' ? "Strategic Insights" : "Insights Estratégicos"}</CardLabel>
                          <div className="space-y-5">
                            {selectedDoc.insights?.map((insight: string, idx: number) => (
                              <div key={idx} className="flex gap-5 items-start group">
                                <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D8614E]/60 group-hover:bg-[#D8614E] transition-colors shrink-0" />
                                <p className={`${Typography.body} text-[15px] lg:text-[16px] text-[#2F3B40] leading-snug tracking-tight font-normal`}>{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-10 border-t border-[#0E4E68]/10">
                           <div className="bg-[#1A8E9F]/5 p-6 rounded-[24px] border border-[#1A8E9F]/10 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-[#1A8E9F] flex items-center justify-center text-white"><SafeIcon icon="Zap" size={14} /></div>
                                <p className={`${Typography.body} text-[10px] font-normal text-[#1A8E9F] uppercase tracking-[0.2em]`}>{lang === 'EN' ? "VF Methodology" : "Metodología VF"}</p>
                              </div>
                              <p className={`${Typography.body} text-[14px] text-[#2F3B40] leading-relaxed`}>{selectedDoc.methodology}</p>
                           </div>
                        </div>
                    </motion.aside>
                  )}
               </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideRenderer({ slide, lang, onSelectDoc, onPrint }: any) {
  const { id } = slide;
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  useEffect(() => {
    setActiveBlock(null);
  }, [id, lang]);

  if (id === 'cover') {
    return (
      <FullCenteredLayout centered={true} className="!pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 items-center max-w-[1100px] mx-auto">
          <div className="col-span-1 lg:col-span-4 lg:border-r border-[#0E4E68]/10 lg:pr-16 text-center lg:text-right">
            <p className={`${Typography.body} text-[11px] font-normal tracking-[0.4em] uppercase mb-4 text-[#D8614E]`}>{slide.year}</p>
            <p className={`${Typography.body} text-[14px] font-normal text-[#1A8E9F] tracking-tight leading-relaxed`}>{slide.metadata}</p>
          </div>
          <div className="col-span-1 lg:col-span-8 lg:pl-16 text-center lg:text-left">
            <Heading className="mb-8 !text-[clamp(2.5rem,6vw,4rem)] leading-[1.1]">
              {lang === 'EN' ? <>Experience <br /> <span className="text-[#1A8E9F] font-normal">Center of Excellence</span></> : <>Centro de Excelencia <br /> <span className="text-[#1A8E9F] font-normal">de Experiencia</span></>}
            </Heading>
            <BodyText size="lg" className="max-w-[450px] mx-auto lg:mx-0 opacity-80">{slide.subtitle}</BodyText>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'context') {
    return (
      <SplitLayout ratio="5:7" centered={true} 
        left={<div className="lg:pr-10 max-w-[400px]"><SectionHeader category={slide.category} title={slide.title} /></div>}
        right={<div className="space-y-8 lg:space-y-10 lg:pl-16 border-l border-[#0E4E68]/10">
          {(slide.content || "").split('\n\n').map((para: string, idx: number) => (<BodyText key={idx} size="md" className="leading-relaxed text-[#2F3B40] font-normal">{para}</BodyText>))}
        </div>}
      />
    );
  }

  if (id === 'challenge' || id === 'pillars') {
    const isPillars = id === 'pillars';
    return (
      <FullCenteredLayout centered={true} className="!pt-[60px] pb-[200px] lg:pb-[240px]">
        {isPillars && activeBlock !== null && (
          <div onClick={() => setActiveBlock(null)} className="absolute inset-0 z-30 cursor-default" />
        )}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          <div className="lg:col-span-5 space-y-10 lg:pr-6 pt-0">
            <div className="space-y-4">
              <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20"><CardLabel className="text-[10px] text-[#1A8E9F] font-medium tracking-[0.2em]">{slide.category}</CardLabel></div>
              <Heading level={2} className="text-[2.6rem] lg:text-[3.8rem] leading-[1.05] tracking-tighter">{slide.title}</Heading>
            </div>
            <div className="space-y-6 max-w-[520px]">
              {(slide.introText || "").split('\n\n').map((para: string, idx: number) => (
                <BodyText key={idx} size="md" className={`${idx === 0 ? 'text-[#2F3B40]' : 'text-[#2F3B40]/70'} leading-relaxed font-normal`}>
                  {para}
                </BodyText>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="w-full h-[350px] lg:h-[450px] relative flex items-center justify-center">
              <div 
                onClick={() => onSelectDoc({ 
                  id: 'challenge-diagram', 
                  title: lang === 'EN' ? 'The Fragmentation Barrier' : 'La barrera de la fragmentación',
                  tag: lang === 'EN' ? 'CONTEXT' : 'CONTEXTO',
                  text: slide.introText,
                  methodology: lang === 'EN' ? 'Visual representation of multi-bank fragmentation.' : 'Representación visual de la fragmentación multi-banco.'
                })}
                className="scale-[0.65] lg:scale-[0.75] w-full h-full flex items-center justify-center transition-all duration-700 cursor-zoom-in group" 
                style={{ filter: activeBlock !== null ? 'grayscale(0.6) opacity(0.15) blur(6px)' : 'none' }}
              >
                <ChallengeDiagram lang={lang} />
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-md p-3 rounded-full border border-[#0E4E68]/10 text-[#0E4E68] shadow-sm">
                  <LucideIcons.Maximize2 size={18} />
                </div>
              </div>
              {isPillars && slide.missionBullets && (
                <div className="absolute inset-0 pointer-events-none scale-90 lg:scale-100">
                  {slide.missionBullets.map((bullet: any, i: number) => {
                    const positions = ["top-[2%] left-[-5%]", "top-[2%] right-[-5%]", "bottom-[2%] left-[-5%]", "bottom-[2%] right-[-5%]"];
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className={`absolute ${positions[i]} pointer-events-auto`}
                      >
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveBlock(activeBlock === i ? null : i); }}
                          className={`w-[230px] lg:w-[270px] p-6 lg:p-7 rounded-[32px] border text-left transition-all duration-500 relative overflow-hidden ${
                            activeBlock === i ? 'bg-[#0E4E68] border-[#0E4E68] shadow-2xl z-50 text-white' : 'bg-white/80 backdrop-blur-xl border-white hover:bg-white z-20 shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-[2px] ${activeBlock === i ? 'bg-[#D8614E]' : 'bg-[#1A8E9F]'}`} />
                            <LucideIcons.Plus size={18} className={`transition-transform duration-500 ${activeBlock === i ? 'rotate-45' : ''}`} />
                          </div>
                          <CardLabel className={`text-[10px] mb-1.5 uppercase ${activeBlock === i ? 'text-white/60' : 'text-[#1A8E9F]'}`}>{bullet.label}</CardLabel>
                          <h4 className={`${Typography.title} text-[18px] lg:text-[21px] leading-tight`}>{bullet.text}</h4>
                          <AnimatePresence>
                            {activeBlock === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <p className={`${Typography.body} text-[14px] text-white/80 mt-5 leading-relaxed border-t border-white/10 pt-5`}>"{bullet.subtext}"</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'strategy') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start relative !pb-[180px] lg:!pb-[220px] !pt-6 lg:!pt-10">
        <header className="mb-4 lg:mb-6 shrink-0 text-center w-full">
          <SectionHeader 
            category={slide.category} 
            title={slide.title} 
            description={slide.description} 
            className="text-center"
            descriptionClassName="mx-auto"
            descriptionSize="md"
          />
        </header>
        
        <div 
          onClick={() => onSelectDoc({ 
            id: 'strategy-diagram', 
            title: lang === 'EN' ? 'Architecture of Convergence' : 'Arquitectura de convergencia',
            tag: lang === 'EN' ? 'STRATEGY' : 'ESTRATEGIA',
            text: slide.description,
            methodology: lang === 'EN' ? 'Operating system for multi-bank scaling.' : 'Sistema operativo para escalado multi-banco.'
          })}
          className="w-full flex-none flex items-center justify-center relative py-4 lg:py-6 cursor-zoom-in group transition-all duration-700 h-[22vh] lg:h-[28vh] min-h-[250px]"
        >
          <div className="w-full h-full max-w-[850px] mx-auto transition-transform duration-700 group-hover:scale-[1.02]">
            <StrategyDiagram lang={lang} />
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-md p-2 rounded-full border border-[#0E4E68]/10 text-[#0E4E68] shadow-md">
            <LucideIcons.Maximize2 size={14} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-4 lg:mt-6 shrink-0 relative z-10 w-full">
          {slide.pillars?.map((p: any, i: number) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/40 backdrop-blur-[20px] border border-white/80 p-5 lg:p-6 rounded-[32px] lg:rounded-[38px] shadow-sm flex flex-col h-full hover:bg-white/90 transition-all duration-700 hover:-translate-y-1 group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A8E9F]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A8E9F]/10 flex items-center justify-center text-[#1A8E9F] group-hover:bg-[#1A8E9F] group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                    <SafeIcon icon={p.icon} size={14} />
                  </div>
                  <h4 className={`${Typography.title} text-[15px] lg:text-[17px] font-normal text-[#0E4E68] group-hover:text-[#1A8E9F] transition-colors duration-500 leading-tight`}>{p.title}</h4>
                </div>
                <CardBody className="text-[11.5px] lg:text-[12.5px] leading-relaxed text-[#2F3B40] group-hover:text-[#2F3B40] transition-colors duration-500 font-normal">{p.text}</CardBody>
              </div>
            </motion.div>
          ))}
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'role') {
    return (
      <FullCenteredLayout centered={true} className="!pt-[60px] pb-[180px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:space-y-10">
            <header className="space-y-4">
              <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20"><CardLabel className="text-[10px] text-[#1A8E9F] font-medium tracking-[0.2em] uppercase">{slide.category}</CardLabel></div>
              <h2 className={`${Typography.title} text-[2.8rem] lg:text-[4.2rem] text-[#0E4E68] leading-[0.95] tracking-tight`}>{lang === 'EN' ? <>Architecting <br /> the System</> : <>Arquitecto <br /> del sistema</>}</h2>
            </header>
            <div className="space-y-6 lg:space-y-8">
              <p className={`${Typography.body} text-[15px] lg:text-[17px] text-[#2F3B40] font-normal leading-relaxed max-w-[460px]`}>{slide.roleIntro}</p>
              <div className="pt-6 border-t border-[#0E4E68]/10 space-y-6 lg:space-y-8">
                <CardLabel className="opacity-80 tracking-[0.3em]">{lang === 'EN' ? "I worked across three layers:" : "Trabajé en tres niveles:"}</CardLabel>
                <div className="grid grid-cols-1 gap-5 lg:gap-6">
                  {slide.roleBullets?.map((b: any, i: number) => (
                    <div key={i} className="group flex gap-5 items-start">
                      <span className={`${Typography.title} text-[15px] lg:text-[16px] text-[#D8614E] opacity-50 mt-0.5`}>0{i+1}</span>
                      <div className="space-y-0.5">
                        <h4 className={`${Typography.title} text-[17px] lg:text-[19px] text-[#0E4E68] font-normal tracking-tight group-hover:text-[#1A8E9F] transition-colors`}>{b.title}</h4>
                        <p className={`${Typography.body} text-[13px] lg:text-[14px] text-[#2F3B40] opacity-60 leading-snug`}>{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] flex items-center justify-center">
            <div className="relative w-full h-full">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="absolute top-[20%] left-0 w-[80%] aspect-[1.3] rounded-[48px] overflow-hidden shadow-2xl z-10 border border-white/40">
                <img src={slide.collage[0]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10, y: -10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="absolute top-[5%] right-[-5%] w-[45%] aspect-[0.75] rounded-[40px] overflow-hidden shadow-2xl z-20 border border-white/60">
                <img src={slide.collage[1]} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute bottom-[-2%] right-[-8%] w-[40%] lg:w-[45%] bg-[#D8614E] p-7 lg:p-10 rounded-[50px] shadow-2xl z-30 text-white">
                <p className={`${Typography.title} text-[18px] lg:text-[22px] leading-[1.3] tracking-tight`}>
                  {lang === 'EN' ? 
                    <>50+ professionals.<br />4 banks.<br />One ecosystem.</> : 
                    <>50+ profesionales.<br />4 bancos.<br />Un ecosistema.</>
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'toolkit') {
    return (
      <FullCenteredLayout centered={false} className="!pt-12 lg:!pt-16 !pb-32">
        <header className="mb-2 lg:mb-4 w-full"><SectionHeader category={slide.category} title={slide.title} description={slide.description} /></header>
        <div className="mt-4 lg:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 w-full max-w-[1160px] mx-auto items-start px-6 lg:px-0">
           {slide.artifacts?.map((art: any, i: number) => (
             <div key={art.id} onClick={() => onSelectDoc(art)} className="group cursor-zoom-in flex flex-col items-center text-center lg:text-left lg:items-start">
                <div className="relative aspect-[16/10] w-full max-w-[310px] rounded-[24px] lg:rounded-[32px] overflow-hidden bg-[#F3F1EA] border border-[#0E4E68]/5 mb-5 shadow-sm hover:shadow-2xl transition-all duration-700 flex items-center justify-center">
                   <img src={art.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={art.title} />
                </div>
                <div className="space-y-2 px-2 max-w-[310px]">
                   <CardLabel className="text-[#1A8E9F] uppercase text-[10px] tracking-[0.2em]">{art.tag}</CardLabel>
                   <h4 className={`${Typography.title} text-[19px] lg:text-[22px] text-[#0E4E68] leading-tight tracking-tight group-hover:text-[#1A8E9F] transition-colors`}>{art.title}</h4>
                   <CardBody className="text-[12.5px] lg:text-[13.5px] leading-relaxed text-[#0E4E68]/60 font-normal">{art.text}</CardBody>
                </div>
             </div>
           ))}
        </div>
        {/* Espaciador específico para evitar overlap con la barra de navegación inferior solo en esta slide */}
        <div className="h-[120px] lg:h-[180px] w-full pointer-events-none" />
      </FullCenteredLayout>
    );
  }

  if (id === 'governance') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start relative !pb-[220px]">
        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-4">
              <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20"><CardLabel className="text-[10px] text-[#1A8E9F] font-medium tracking-[0.2em]">{slide.category}</CardLabel></div>
              <h3 className={`${Typography.title} text-[38px] lg:text-[52px] text-[#0E4E68] leading-[1.05] tracking-tight`}>{slide.title}</h3>
              <BodyText size="lg" className="max-w-[500px]">{slide.introTitle}</BodyText>
            </div>
            <div className="pt-8 border-t border-[#0E4E68]/5 max-w-[400px]"><BodyText size="lg" className="opacity-80 font-normal">{slide.introSubtitle}</BodyText></div>
          </div>
          <div className="lg:w-3/5 space-y-10 border-l border-[#0E4E68]/10 pl-10 lg:pl-16 lg:pt-14">
            {slide.rituals?.map((r: any, i: number) => (
              <div key={i} className="flex gap-8 items-start group">
                <span className={`${Typography.title} text-[16px] text-[#D8614E] mt-1`}>{r.num}</span>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h4 className={`${Typography.title} text-[20px] lg:text-[24px] text-[#0E4E68] leading-tight group-hover:text-[#1A8E9F] transition-colors`}>{r.title}</h4>
                    <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20 w-fit whitespace-nowrap">
                      <CardLabel>{r.freq}</CardLabel>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {r.desc?.map((d: string, j: number) => (
                      <div key={j} className="flex items-center gap-4"><div className="w-1 h-1 rounded-full bg-[#D8614E]/30" /><p className={`${Typography.body} text-[14px] lg:text-[15px] text-[#2F3B40] leading-snug`}>{d}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'impact') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start py-0 !pb-[220px]">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="col-span-1 lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20">
                  <CardLabel>{slide.category}</CardLabel>
                </div>
                <h2 className={`${Typography.title} text-[38px] lg:text-[52px] text-[#0E4E68] leading-none tracking-tight`}>{slide.title}</h2>
              </div>
              <div className="flex flex-col gap-6 border-l border-[#0E4E68]/10 pl-8 lg:pl-10 pt-4">
                <div className="space-y-8 lg:space-y-10">
                  {slide.stats?.map((s: any, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }} className="group cursor-default">
                      <span className={`${Typography.title} text-[48px] lg:text-[60px] text-[#D8614E] leading-[0.9] tracking-tighter block mb-1 group-hover:text-[#1A8E9F] transition-colors`}>{s.value}</span>
                      <div className="space-y-0.5">
                        <CardLabel>{s.label}</CardLabel>
                        <p className="text-[12px] text-[#2F3B40]/70">{s.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-7 lg:pt-36">
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-5 lg:space-y-6">
                  {slide.narrative?.map((text: string, i: number) => (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="mt-1.5 w-4 h-4 rounded-full border border-[#1A8E9F]/30 flex items-center justify-center shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#1A8E9F]" /></div>
                      <BodyText size="md" className="leading-snug !text-[15px] lg:!text-[17px]">{text}</BodyText>
                    </div>
                  ))}
                </div>
                <div className="pt-6 mt-2 border-t border-[#0E4E68]/5 max-w-[580px]">
                   <p className="text-[#2F3B40] text-[15px] lg:text-[16px] leading-relaxed mb-6 opacity-80">{slide.closingNote}</p>
                   <div className="space-y-2.5">
                     {slide.bullets?.map((point: string, i: number) => (
                       <div key={i} className="flex items-center gap-4"><div className="w-1 h-1 rounded-full bg-[#D8614E]/30" /><span className="text-[#2F3B40]/70 text-[13px] lg:text-[14px]">{point}</span></div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'impact-practice') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start relative !pb-[220px]">
        <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-4">
              <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20"><CardLabel className="text-[10px] text-[#1A8E9F] font-medium tracking-[0.2em]">{slide.category}</CardLabel></div>
              <h3 className={`${Typography.title} text-[38px] lg:text-[52px] text-[#0E4E68] leading-[1.05] tracking-tight`}>{slide.title}</h3>
              <BodyText size="lg" className="max-w-[550px] text-[#2F3B40] leading-relaxed">{slide.introTitle}</BodyText>
            </div>
            <div className="pt-8 border-t border-[#0E4E68]/5 max-w-[400px]"><BodyText size="lg" className="text-[#2F3B40]/70 font-normal">{slide.introSubtitle}</BodyText></div>
          </div>
          <div className="lg:w-3/5 space-y-8 lg:space-y-10 border-l border-[#0E4E68]/10 pl-10 lg:pl-16 lg:pt-14">
            <div className="space-y-6 lg:space-y-7">
              {slide.changes?.map((text: string, i: number) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="mt-1.5 w-4 h-4 rounded-full border border-[#1A8E9F]/30 flex items-center justify-center shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#1A8E9F]" /></div>
                  <BodyText size="md" className="leading-snug !text-[15px] lg:!text-[17px]">{text}</BodyText>
                </div>
              ))}
            </div>
            <div className="pt-8 mt-4 border-t border-[#0E4E68]/5 max-w-[580px]"><p className={`${Typography.body} text-[15px] lg:text-[17px] text-[#1A8E9F] font-normal`}>{slide.footerNote}</p></div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'learnings') {
    return (
      <FullCenteredLayout centered={true} className="!justify-start pt-28 lg:pt-36 relative !pb-[240px]">
        <header className="mb-8 lg:mb-12 w-full text-center mx-auto shrink-0">
          <SectionHeader 
            category={slide.category} 
            title={slide.title} 
            description={slide.description} 
            className="text-center" 
          />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 w-full mt-4">
          {slide.lessons?.map((lesson: any, i: number) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative mb-8 h-24 lg:h-32 flex items-center justify-center w-full">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: -30 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 1.2 }}
                  className="text-[90px] lg:text-[130px] font-serif text-[#0E4E68]/5 absolute flex items-center justify-center pointer-events-none select-none"
                >
                  0{i+1}
                </motion.span>
                <div className="relative z-10 w-16 h-16 flex items-center justify-center translate-x-8 lg:translate-x-12 -translate-y-1 lg:-translate-y-2 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#1A8E9F]/5 backdrop-blur-sm rounded-full border border-[#1A8E9F]/10" />
                  <SafeIcon icon={lesson.icon} size={28} className="text-[#D8614E] relative z-20" />
                </div>
              </div>
              <div className="space-y-4 flex flex-col items-center">
                <h4 className={`${Typography.title} text-[24px] lg:text-[32px] text-[#0E4E68] tracking-tighter group-hover:text-[#1A8E9F] transition-colors leading-tight min-h-[1.5em] lg:min-h-[2.2em] flex items-center justify-center`}>{lesson.title}</h4>
                <p className={`${Typography.body} text-[15px] lg:text-[17px] leading-relaxed text-[#2F3B40] max-w-[300px] font-normal opacity-80`}>{lesson.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </FullCenteredLayout>
    );
  }

  if (id === 'closing') {
    const contactInfo = slide.contactInfo || {};
    return (
      <FullCenteredLayout centered={true} className="!justify-start pt-64 lg:pt-80 relative !pb-[180px]">
        <div className="flex flex-col items-center text-center relative z-10 w-full shrink-0">
          <div className="space-y-4 mb-8 lg:mb-12">
            <div className="inline-block bg-[#1A8E9F]/10 px-4 py-1.5 rounded-full border border-[#1A8E9F]/20">
              <CardLabel>{slide.category}</CardLabel>
            </div>
            <div className="flex flex-col items-center">
              <h3 className={`${Typography.title} text-[38px] lg:text-[52px] text-[#0E4E68] leading-none mb-2 tracking-tighter`}>{contactInfo.name}</h3>
              <p className={`${Typography.body} text-[10px] lg:text-[11px] font-medium text-[#1A8E9F] uppercase tracking-[0.5em] opacity-80`}>{lang === 'EN' ? "ORGANIZATIONAL DESIGN & CX SPECIALIST" : "ESPECIALISTA EN DISEÑO ORGANIZACIONAL Y CX"}</p>
            </div>
          </div>
          <BodyText size="lg" className="max-w-2xl mb-8 lg:mb-14 italic font-normal text-[#2F3B40]/90 leading-relaxed">"{slide.manifesto}"</BodyText>
          <div className="w-full flex flex-col items-center gap-8 lg:gap-10">
            <div className="flex flex-wrap justify-center gap-x-10 lg:gap-x-14 gap-y-4 border-y border-[#0E4E68]/5 py-5 w-full px-6">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group no-underline">
                <div className="w-8 h-8 rounded-full border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] group-hover:bg-[#1A8E9F] group-hover:text-white transition-all duration-500"><SafeIcon icon="Mail" size={14} /></div>
                <div className="text-left"><p className="text-[7px] font-medium text-[#1A8E9F] uppercase tracking-widest mb-0.5 opacity-60">{lang === 'EN' ? "LET'S TALK" : "HABLEMOS"}</p><p className="text-[#0E4E68] text-[13px] lg:text-[15px]">{contactInfo.email}</p></div>
              </a>
              <a href={`https://${contactInfo.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group no-underline">
                <div className="w-8 h-8 rounded-full border border-[#0E4E68]/10 flex items-center justify-center text-[#0E4E68] group-hover:bg-[#1A8E9F] group-hover:text-white transition-all duration-500"><SafeIcon icon="Linkedin" size={14} /></div>
                <div className="text-left"><p className="text-[7px] font-normal text-[#1A8E9F] uppercase tracking-widest mb-0.5 opacity-60">{lang === 'EN' ? "FOLLOW" : "SEGUIR"}</p><p className="text-[#0E4E68] text-[13px] lg:text-[15px]">{contactInfo.linkedIn?.replace('linkedin.com/in/', '')}</p></div>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-10 lg:gap-14 pt-2">
              <button className="bg-[#0E4E68] text-white pl-8 pr-7 py-3.5 rounded-full flex items-center gap-4 group hover:bg-[#1A8E9F] transition-all duration-700 shadow-lg shadow-[#0E4E68]/30">
                <span className="text-[13px] lg:text-[14px] font-normal">{slide.nextCase}</span>
                <SafeIcon icon="ArrowRight" size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </button>
              <button onClick={onPrint} className="text-[#0E4E68]/40 hover:text-[#0E4E68] transition-all border-b border-[#0E4E68]/10 pb-1 text-[11px] lg:text-[12px]">{slide.pdf}</button>
            </div>
          </div>
        </div>
      </FullCenteredLayout>
    );
  }
  return null;
}
