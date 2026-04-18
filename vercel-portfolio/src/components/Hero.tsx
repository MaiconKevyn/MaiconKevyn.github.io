import { useEffect, useRef, useState, lazy, Suspense } from 'react';

const ProfileSphere = lazy(() => import('./ProfileSphere'));

const BIOS = [
  'AI Engineer / GenAI Engineer building <strong>LLM products, retrieval systems, and document pipelines</strong> across <strong>AWS and Databricks</strong>.',
  'At <strong>ADP</strong>, I delivered RAG systems for <strong>500+ documents</strong>, reached <strong>92% retrieval precision</strong>, and reduced query response time by <strong>60%</strong>.',
  'I build <strong>evaluation-first GenAI systems</strong> with MLflow LLM-as-a-Judge, Promptfoo, structured outputs, and inspectable workflows.',
  'My healthcare research at <strong>PUCRS</strong> includes a LangGraph text-to-SQL agent over <strong>11M+ SUS records</strong> and a PostgreSQL schema spanning <strong>15+ tables</strong>.',
  'I ship beyond demos using <strong>Lambda, Step Functions, SageMaker, S3, API Gateway, and DynamoDB</strong> as part of the delivery path.',
  'My background combines <strong>Astrophysics at UFRGS</strong> and <strong>Data Science</strong>, bringing statistics, systems thinking, and analytical rigor into applied AI work.',
  'I move comfortably between <strong>classical machine learning and modern GenAI</strong> using scikit-learn, XGBoost, LangGraph, vector search, and production APIs.',
];

const FOCUS_AREAS = [
  { title: 'RAG', subtitle: 'Grounded retrieval' },
  { title: 'LLMs', subtitle: 'Structured generation' },
  { title: 'Agentic AI', subtitle: 'Stateful workflows' },
  { title: 'ML', subtitle: 'Prediction and NLP' },
];

const CURRENT_CONTEXT = [
  'ADP // AI ENGINEER',
  'PUCRS // AI RESEARCH',
  'AWS + DATABRICKS',
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
        AI ENGINEER / GENAI ENGINEER
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 px-4" style={{ zIndex: 2 }}>
        {CURRENT_CONTEXT.map((item) => (
          <div
            key={item}
            className="rounded-full px-4 py-2 text-[0.68rem] text-gray-300 border border-white/10"
            style={{
              background: 'rgba(255,255,255,0.04)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.16em',
            }}
          >
            {item}
          </div>
        ))}
      </div>

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

      {/* Focus areas */}
      <div className="mb-10 w-[92%]" style={{ maxWidth: 720 }}>
        <div
          className="text-center text-[0.65rem] text-gray-500 tracking-[0.35em] mb-4"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          FOCUS AREAS
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FOCUS_AREAS.map(({ title, subtitle }, index) => (
            <div
              key={title}
              className="flex flex-col items-center justify-center rounded-2xl px-4 py-5 text-center"
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: index === 0 ? '0 0 24px rgba(6,182,212,0.08)' : 'none',
              }}
            >
              <span
                className="font-bold text-lg md:text-xl"
                style={{
                  color: '#22d3ee',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: title.length <= 4 ? '0.12em' : '0.04em',
                }}
              >
                {title}
              </span>
              <span
                className="text-gray-400 text-[0.68rem] md:text-xs mt-2 uppercase"
                style={{ letterSpacing: '0.12em', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
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
          VIEW EXPERIENCE
        </a>
        <a
          href="/MaiconKevyn_cv.pdf"
          download="MaiconKevyn_cv.pdf"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded text-sm font-bold transition-all hover:bg-cyan-400"
          style={{
            background: '#06b6d4',
            color: '#000',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          DOWNLOAD CV
        </a>
        <a
          href="https://github.com/MaiconKevyn"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded text-sm font-bold transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
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
