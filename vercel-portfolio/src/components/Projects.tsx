import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, TrendingUp, Zap, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectImpactChart from './ProjectImpactChart';

const projects = [
  {
    title: 'TXT2SQL for DATASUS',
    tagline: 'Portuguese NL2SQL over Brazilian healthcare microdata',
    description: 'Healthcare-focused agentic workflow that routes natural-language questions across schema, conversational, and execution paths, then validates and repairs SQL before querying Brazilian SUS microdata.',
    achievements: [
      'Queries roughly 37 million hospital records across 16 tables.',
      'Reported 96.3% execution accuracy in controlled evaluation.',
      'Combines LangGraph routing, SQL validation, retry logic, CLI, API, and web paths.',
      'Strong domain adaptation signal for regulated public-health data.',
    ],
    tech: ['LangGraph', 'OpenAI', 'DuckDB', 'Python', 'Healthcare Data'],
    githubUrl: 'https://github.com/MaiconKevyn/agent-txt2sql-langgraph',
    gradient: 'from-cyan-500 to-blue-500',
    impactMetric: { value: 96.3, label: 'Execution Accuracy', display: '96.3%' },
    image: '/images/txt2sql-datasus-card.svg'
  },
  {
    title: 'AWS Universal Extractor',
    tagline: 'Serverless document intelligence with structured extraction',
    description: 'Asynchronous AWS pipeline for structured PDF extraction using S3, Lambda, Step Functions, YAML-driven extraction profiles, and LLM structured outputs with explicit validation stages.',
    achievements: [
      'Separates upload, fetch, extraction, profile resolution, LLM calls, validation, and persistence.',
      'Persists outputs by request id, profile, and version to keep the workflow inspectable.',
      'Strong cloud-native signal beyond local notebooks and prototypes.',
      'Clear event-driven boundaries suited to production AI delivery.',
    ],
    tech: ['AWS', 'Step Functions', 'Lambda', 'S3', 'Structured Outputs'],
    githubUrl: 'https://github.com/MaiconKevyn/aws-universal-extractor',
    gradient: 'from-purple-500 to-fuchsia-500',
    impactMetric: { value: 82, label: 'Pipeline Coverage', display: 'Async AWS' },
    image: '/images/aws-universal-extractor-card.svg'
  },
  {
    title: 'Research Agent with Continuous Evaluation',
    tagline: 'Grounded research workflows with retrieval and explicit contracts',
    description: 'Evaluation-minded research agent using FastAPI, React, LangGraph, PostgreSQL, pgvector, structured outputs, and tool-based evidence gathering to keep behavior measurable and debuggable.',
    achievements: [
      'Uses schemas for classification, planning, synthesis, and evaluation stages.',
      'Combines vector search, web search, and execution trace reporting.',
      'Represents a more mature AI architecture direction with explicit contracts.',
      'Balances retrieval quality with observable system behavior.',
    ],
    tech: ['FastAPI', 'React', 'pgvector', 'LangGraph', 'Guardrails'],
    githubUrl: 'https://github.com/MaiconKevyn/agentic-research-pipeline',
    gradient: 'from-emerald-500 to-cyan-500',
    impactMetric: { value: 85, label: 'Grounded Retrieval', display: 'pgvector' },
    image: '/images/research-agent-card.svg'
  },
  {
    title: 'Amazon Feedback Analysis',
    tagline: 'Customer feedback intelligence with zero-shot topic analysis',
    description: 'Applied NLP workflow over Amazon reviews combining GPT-4o sentiment analysis, DeBERTa zero-shot classification, topic modeling, and a Streamlit dashboard for interactive exploration.',
    achievements: [
      'Uses GPT-4o for sentiment classification and DeBERTa for topic detection.',
      'Highlights which issues most negatively affect user experience.',
      'Presents results through interactive dashboard-style analysis.',
      'Balances LLM systems, classical NLP, and business-facing storytelling.',
    ],
    tech: ['GPT-4o', 'DeBERTa', 'Streamlit', 'Pandas', 'Zero-shot NLP'],
    githubUrl: 'https://github.com/MaiconKevyn/amazon-feedback-analysis',
    gradient: 'from-orange-500 to-cyan-500',
    impactMetric: { value: 78, label: 'Topic Insight Coverage', display: 'Zero-shot' },
    image: '/images/amazon-feedback-analysis-card.svg'
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000 min-w-[350px] md:min-w-[600px] lg:min-w-[900px] snap-center"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-colors duration-500 shadow-2xl h-full flex flex-col lg:flex-row">

        <div className="p-8 lg:p-10 flex flex-col justify-between space-y-6 lg:w-1/2" style={{ transform: "translateZ(20px)" }}>
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {project.title}
              </h3>
            </motion.div>
            <p className="text-cyan-400 text-lg font-medium mb-4">
              {project.tagline}
            </p>
            <p className="text-gray-300 text-base leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
              {project.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4" />
              <span>Key Achievements</span>
            </div>
            <div className="grid gap-2">
              {project.achievements.slice(0, 3).map((achievement, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2"
                >
                  <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-white/10 hover:bg-white/10 transition-colors`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                <Github size={16} />
                Repository
              </motion.a>
            )}
          </div>
        </div>

        <div className="relative h-[300px] lg:h-auto lg:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              scale: 1.1,
              translateX: useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]),
              translateY: useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]),
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-[280px]"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className={`bg-gradient-to-br ${project.gradient} bg-opacity-10 rounded-3xl p-6 border border-white/10 backdrop-blur-md shadow-xl`}>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-lg" />
                <div className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                  {project.impactMetric.display ?? `${project.impactMetric.value}%`}
                </div>
                <div className="text-sm text-white/90 font-bold uppercase tracking-widest">
                  {project.impactMetric.label}
                </div>
              </div>
              <div className="mt-6 h-[100px]">
                <ProjectImpactChart value={project.impactMetric.value} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Swipe detection logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scrollRight();
    } else if (isRightSwipe) {
      scrollLeft();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Swipe to explore my latest work
          </p>
        </motion.div>

        <div className="relative">
          {/* Scroll Buttons for Desktop */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-slate-800/80 p-3 rounded-full text-white hover:bg-cyan-500 hover:scale-110 transition-all hidden md:block backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-slate-800/80 p-3 rounded-full text-white hover:bg-cyan-500 hover:scale-110 transition-all hidden md:block backdrop-blur-sm border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}

            {/* CTA Card as the last item */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[300px] flex items-center justify-center snap-center"
            >
              <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
                <Github size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-white mb-2">View More</h3>
                <p className="text-gray-400 mb-6">Check out more projects on GitHub</p>
                <a
                  href="https://github.com/MaiconKevyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Visit GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
