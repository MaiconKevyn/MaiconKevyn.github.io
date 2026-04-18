import { useEffect, useRef, useState, lazy, Suspense } from 'react';

const ProfileSphere = lazy(() => import('./ProfileSphere'));

const BIOS = [
  'Specializing in <strong>LLM orchestration, RAG pipelines, and agentic systems</strong>. Merging evaluation-first engineering with production-grade delivery.',
  'Building <strong>AI systems</strong> that don\'t just predict — they <strong>explain, validate, and self-repair</strong>. From healthcare microdata to grounded research agents.',
  'Brazilian data professional with a background in <strong>Data Science and Astrophysics</strong>. Focused on AI that survives contact with reality.',
  'Creator of <strong>TXT2SQL for DATASUS</strong>. A Portuguese NL2SQL agent over <strong>37M+ Brazilian hospital records</strong>, reporting <strong>96.3% execution accuracy</strong>.',
  'Designed an <strong>AWS Universal Extractor</strong> — async pipeline using Step Functions, Lambda, S3, and structured outputs for structured PDF extraction.',
  'Built an <strong>evaluation-minded research agent</strong> with FastAPI, React, LangGraph, PostgreSQL, and pgvector — explicit contracts over prompt theatre.',
  'My stack combines <strong>LangGraph, OpenAI, DuckDB, FastAPI, and pgvector</strong>. I bridge agent design with API delivery and analytical backends.',
  'Applied NLP at scale: <strong>Amazon feedback analysis</strong> combining GPT-4o sentiment, DeBERTa zero-shot topic detection, and a Streamlit insight dashboard.',
  '<strong>Astrophysics @ UFRGS</strong>. Rigorous training in statistics, modeling, and systems — applied daily to LLMs, retrieval, and healthcare analytics.',
  'Ship beyond notebooks. I deliver <strong>APIs, UIs, and cloud pipelines</strong> — not just experiments. Guardrails, schemas, and measurable behavior come standard.',
];

export default function Hero() {
  const bioRef = useRef<HTMLParagraphElement>(null);
  const [currentBioIndex, setCurrentBioIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeWriter = (html: string, speed = 25) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const stripped = html.replace(/<[^>]+>/g, '');
    const tick = () => {
      if (i <= stripped.length) {
        setDisplayedText(stripped.slice(0, i));
        i++;
        animationRef.current = setTimeout(tick, speed);
      } else {
        setDisplayedText(html);
        setIsTyping(false);
      }
    };
    tick();
  };

  useEffect(() => {
    typeWriter(BIOS[0]);
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const generateNewBio = () => {
    if (isTyping) return;
    if (animationRef.current) clearTimeout(animationRef.current);
    const next = (currentBioIndex + 1) % BIOS.length;
    setCurrentBioIndex(next);
    typeWriter(BIOS[next]);
  };



  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '4rem' }}
    >
      {/* 3D Sphere - positioned behind profile pic area */}
      <Suspense fallback={null}>
        <ProfileSphere />
      </Suspense>

      {/* SYSTEM ONLINE badge */}
      <div
        className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/10 animate-pulse"
        style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em', zIndex: 2, position: 'relative' }}
      >
        SYSTEM ONLINE
      </div>

      {/* Profile picture - no glow, clean border */}
      <div className="relative flex items-center justify-center mb-6" style={{ zIndex: 2 }}>
          <img
            src="/profile.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://ui-avatars.com/api/?name=Maicon+Kevyn&background=0D8ABC&color=fff&size=256';
            }}
            alt="Maicon Kevyn"
            className="relative rounded-full object-cover border-4"
            style={{
              width: 200,
              height: 200,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
            fetchPriority="high"
          />
      </div>

      {/* Name */}
      <h1
        className="font-bold text-white text-center mb-1"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          letterSpacing: '0.05em',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 40px rgba(6,182,212,0.3)',
        }}
      >
        MAICON KEVYN
      </h1>

      {/* Title */}
      <h2
        className="text-cyan-400 tracking-widest font-bold mb-8"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', letterSpacing: '0.3em' }}
      >
        AI ENGINEER / DATA SCIENTIST
      </h2>

      {/* Bio terminal box */}
      <div
        className="relative mx-auto mb-6"
        style={{
          maxWidth: 520,
          width: '90%',
          background: 'rgba(10,10,15,0.75)',
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 8,
          padding: '1rem 1.25rem',
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          <span
            className="ml-2 text-gray-400 text-xs"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            NEURAL_CORE // BIO_GENERATOR
          </span>
        </div>

        <p
          ref={bioRef}
          className="text-gray-300 text-sm leading-relaxed"
          style={{ fontFamily: 'JetBrains Mono, monospace', minHeight: 60 }}
        >
          <span className="text-cyan-400 mr-1">&gt;</span>
          {isTyping ? (
            <>
              {displayedText}
              <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
            </>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: displayedText }} />
          )}
        </p>
      </div>

      {/* Generate bio button */}
      <button
        onClick={generateNewBio}
        disabled={isTyping}
        className="group flex items-center gap-2 px-6 py-2.5 rounded-full transition-all mb-10"
        style={{
          background: 'rgba(6,182,212,0.1)',
          border: '1px solid rgba(6,182,212,0.5)',
          color: '#22d3ee',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          cursor: isTyping ? 'not-allowed' : 'pointer',
          opacity: isTyping ? 0.6 : 1,
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>✦</span>
        GENERATE NEW BIO
      </button>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-10" style={{ maxWidth: 480, width: '90%' }}>
        {[
          { value: '37M+', label: 'SUS RECORDS', color: '#22d3ee' },
          { value: '96.3%', label: 'SQL ACCURACY', color: '#c084fc' },
          { value: 'RAG', label: 'CLOUD-NATIVE' },
          { value: '4+', label: 'AI PROJECTS' },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-3 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-bold text-xl" style={{ color: color ?? '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
              {value}
            </span>
            <span className="text-gray-500 text-xs mt-1" style={{ letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-2.5 rounded text-sm font-bold transition-all"
          style={{
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.5)',
            color: '#22d3ee',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          VIEW MY WORK
        </a>
        <a
          href="https://github.com/MaiconKevyn"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded text-sm font-bold transition-all hover:bg-cyan-400"
          style={{
            background: '#06b6d4',
            color: '#000',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          VISIT GITHUB
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 text-gray-500 text-xs tracking-widest"
        style={{ transform: 'translateX(-50%)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        SCROLL ↓
      </div>
    </section>
  );
}
