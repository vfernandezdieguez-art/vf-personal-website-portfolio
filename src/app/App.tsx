import React, { useState } from 'react';
import { AccessGate } from './components/access-gate';
import { CaseStudy } from './components/case-study';

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) {
    return <AccessGate onAccessGranted={() => setHasAccess(true)} />;
  }

  return <CaseStudy />;
}
