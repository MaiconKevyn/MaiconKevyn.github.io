import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Github, Zap } from 'lucide-react';

type Project = {
  title: string;
  tagline: string;
  description: string;
  achievements: string[];
  whyItMatters: string;
  tech: string[];
  githubUrl: string;
  publication?: {
    label: string;
    title: string;
    url: string;
  };
  gradient: string;
  accent: string;
  signal: {
    label: string;
    display: string;
  };
  image: string;
};

const projects: Project[] = [
  {
    title: 'Healthcare NL2SQL Agent',
    tagline: 'Natural language to SQL for public-health data',
    description: 'An LLM workflow that turns healthcare questions into validated SQL over a large public-health dataset, combining LangGraph routing, schema-aware generation, retry logic, and a user-facing query interface.',
    achievements: [
      'Transforms natural-language healthcare questions into SQL over 11M+ records.',
      'Built on a normalized PostgreSQL schema covering 15+ public-health tables.',
      'Uses LangGraph routing, SQL validation, retry logic, and a user-facing query flow.',
    ],
    whyItMatters: 'Strong intersection of healthcare AI, data modeling, and applied LLM orchestration in a regulated domain.',
    tech: ['LangGraph', 'PostgreSQL', 'Pydantic', 'OpenAI', 'SQL Validation'],
    githubUrl: 'https://github.com/MaiconKevyn/agent-txt2sql-langgraph',
    publication: {
      label: 'Paper',
      title: 'From Questions to Answers: A Natural Language Interface for DATASUS Hospitalization Data',
      url: 'https://sol.sbc.org.br/index.php/eramiars/article/view/39440',
    },
    gradient: 'from-cyan-500 to-blue-500',
    accent: '#22d3ee',
    signal: { label: 'Healthcare records queried', display: '11M+' },
    image: '/images/txt2sql-datasus-card.svg',
  },
  {
    title: 'AWS Universal Extractor',
    tagline: 'Schema-driven document extraction with typed outputs',
    description: 'Serverless document AI pipeline on AWS Step Functions that ingests PDF, DOCX, XLSX, TXT, and JSON, applies Textract OCR when needed, and produces schema-validated JSON through GPT-4o tool calling with Pydantic-typed fields.',
    achievements: [
      'Step Functions orchestration with Lambda stages for ingestion, OCR, extraction, and validation.',
      'GPT-4o tool calling fills Pydantic schemas per document type — typed JSON, not free-form text.',
      'AWS Textract plus parser composition recovers structured content across heterogeneous formats.',
    ],
    whyItMatters: 'Document AI with typed contracts, serverless orchestration, and integration-ready outputs — not notebook extraction.',
    tech: ['AWS Textract', 'Step Functions', 'GPT-4o', 'LangChain', 'Pydantic', 'Tool Calling'],
    githubUrl: 'https://github.com/MaiconKevyn/aws-universal-extractor',
    gradient: 'from-purple-500 to-fuchsia-500',
    accent: '#c084fc',
    signal: { label: 'Schema-driven extraction', display: 'Typed JSON' },
    image: '/images/aws-universal-extractor-card.svg',
  },
  {
    title: 'Research Agent with Continuous Evaluation',
    tagline: 'Four-stage LangGraph pipeline with typed contracts and execution traces',
    description: 'Research agent built on a 4-stage LangGraph pipeline — classify, plan, synthesize, evaluate — backed by Pydantic schemas at every stage, pgvector retrieval, live web search, and full execution traces for inspection and iterative evaluation.',
    achievements: [
      'Pydantic schemas enforce typed outputs at classify, plan, synthesize, and evaluate stages.',
      'pgvector document retrieval combined with live web search for grounded evidence gathering.',
      'Full execution traces per run — every tool call, prompt, and decision is inspectable.',
    ],
    whyItMatters: 'Typed contracts and traceable execution over opaque prompt chains — the production pattern for agent reliability.',
    tech: ['LangGraph', 'FastAPI', 'pgvector', 'Pydantic', 'Ragas', 'React'],
    githubUrl: 'https://github.com/MaiconKevyn/agentic-research-pipeline',
    gradient: 'from-emerald-500 to-cyan-500',
    accent: '#34d399',
    signal: { label: 'Classify · Plan · Synth · Eval', display: '4-stage' },
    image: '/images/research-agent-card.svg',
  },
  {
    title: 'Applied NLP Benchmarking',
    tagline: 'Comparative LLM evaluation for sentiment and topic discovery',
    description: 'Comparative NLP workflow benchmarking OpenAI GPT-4o against Hugging Face DeBERTa zero-shot classification on Amazon reviews, combined with embedding-based clustering to surface coherent topic structures and stakeholder-facing insights.',
    achievements: [
      'Benchmarks OpenAI GPT-4o against Hugging Face DeBERTa zero-shot for sentiment and topic classification.',
      'Uses embeddings with K-Means, HDBSCAN, and UMAP to surface coherent topic clusters.',
      'Translates benchmark results into actionable insights on product issues impacting user experience.',
    ],
    whyItMatters: 'Comparative LLM methodology plus clustering analysis — evaluation discipline applied to applied NLP work.',
    tech: ['GPT-4o', 'DeBERTa', 'Zero-shot', 'HDBSCAN', 'UMAP', 'Streamlit'],
    githubUrl: 'https://github.com/MaiconKevyn/amazon-feedback-analysis',
    gradient: 'from-orange-500 to-cyan-500',
    accent: '#fb923c',
    signal: { label: 'OpenAI vs Hugging Face', display: 'Benchmark' },
    image: '/images/amazon-feedback-analysis-card.svg',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      className="group relative h-full"
    >
      <div
        className={`absolute -inset-px rounded-[1.75rem] bg-gradient-to-br ${project.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-xl backdrop-blur-xl transition-colors duration-500 group-hover:border-cyan-400/30">
        {/* Hero strip with KPI */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-[0.18]">
            <img
              src={project.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.12] mix-blend-overlay`} />

          <div className="relative flex items-center justify-between gap-6 px-6 py-6 sm:px-7">
            <div
              className="rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-200 backdrop-blur-md"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-right backdrop-blur-md">
              <div
                className="text-2xl font-black leading-none sm:text-3xl"
                style={{ color: project.accent, fontFamily: 'JetBrains Mono, monospace' }}
              >
                {project.signal.display}
              </div>
              <div
                className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-400"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {project.signal.label}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 px-6 py-6 sm:px-7">
          <div>
            <h3
              className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-2xl font-bold text-transparent`}
            >
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-cyan-300/90">{project.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>

          <ul className="space-y-2.5">
            {project.achievements.slice(0, 3).map((achievement) => (
              <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <Zap
                  size={14}
                  className="mt-1 shrink-0"
                  style={{ color: project.accent }}
                  aria-hidden="true"
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <div
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-[0.82rem] italic leading-relaxed text-slate-400"
          >
            {project.whyItMatters}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition-all hover:border-cyan-400/40 hover:bg-white/[0.08]"
            >
              <Github size={15} />
              Repository
              <ArrowUpRight size={13} className="opacity-60" />
            </a>

            {project.publication && (
              <a
                href={project.publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-4 py-2 text-sm font-medium text-cyan-100 transition-all hover:bg-cyan-400/[0.12]"
                title={project.publication.title}
              >
                <FileText size={15} />
                {project.publication.label}
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-20">
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div
            className="mb-4 text-[0.72rem] uppercase tracking-[0.42em] text-cyan-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            SELECTED WORK
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Four portfolio cases selected to show applied AI delivery, retrieval design, and production-minded engineering.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-6 py-8 text-center"
        >
          <Github size={28} className="mx-auto mb-4 text-cyan-300" />
          <h3 className="text-xl font-bold text-white">More on GitHub</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            The cases above are the strongest signal. The full GitHub profile includes additional experiments, utilities, and iteration history.
          </p>
          <a
            href="https://github.com/MaiconKevyn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Github size={16} />
            Visit GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
