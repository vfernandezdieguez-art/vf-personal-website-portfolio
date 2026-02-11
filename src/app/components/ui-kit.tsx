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

// ... (rest of the file remains as previously read)
