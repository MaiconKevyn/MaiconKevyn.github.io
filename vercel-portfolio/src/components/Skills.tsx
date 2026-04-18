import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { Boxes, Brain, FlaskConical, Gauge, Wrench, Zap } from 'lucide-react';
import { FaAws } from 'react-icons/fa6';
import {
  SiApachespark,
  SiDatabricks,
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiLangchain,
  SiLanggraph,
  SiMlflow,
  SiOpenai,
  SiOpensearch,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPydantic,
  SiReact,
  SiScikitlearn,
  SiTypescript,
} from 'react-icons/si';

type IconComponent = ComponentType<{ size?: number | string }>;

type Tech = {
  name: string;
  icon: IconComponent;
  color: string;
};

type TechCategory = {
  title: string;
  eyebrow: string;
  description: string;
  icon: IconComponent;
  accent: string;
  technologies: Tech[];
};

const skillCategories: TechCategory[] = [
  {
    title: 'Agentic AI',
    eyebrow: 'LLM SYSTEMS',
    description: 'Tools I use to design multi-step agents, structured generations, and validation-heavy AI workflows.',
    icon: SiLanggraph,
    accent: '#22d3ee',
    technologies: [
      { name: 'OpenAI', icon: SiOpenai, color: '#10a37f' },
      { name: 'LangGraph', icon: SiLanggraph, color: '#8b5cf6' },
      { name: 'LangChain', icon: SiLangchain, color: '#38bdf8' },
      { name: 'Pydantic', icon: SiPydantic, color: '#e11d48' },
      { name: 'FastAPI', icon: SiFastapi, color: '#00a98f' },
      { name: 'Tool Calling', icon: Wrench, color: '#facc15' },
    ],
  },
  {
    title: 'Data & Retrieval',
    eyebrow: 'SEARCH LAYER',
    description: 'Storage, retrieval, and analytics tooling that backs RAG, evaluation, and data-intensive applications.',
    icon: SiDatabricks,
    accent: '#a855f7',
    technologies: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'pgvector', icon: Boxes, color: '#8b5cf6' },
      { name: 'OpenSearch', icon: SiOpensearch, color: '#005eb8' },
      { name: 'Databricks', icon: SiDatabricks, color: '#ff3621' },
      { name: 'Spark', icon: SiApachespark, color: '#e25a1c' },
      { name: 'Pandas', icon: SiPandas, color: '#a78bfa' },
    ],
  },
  {
    title: 'Cloud Delivery',
    eyebrow: 'DEPLOYMENT PATH',
    description: 'Infrastructure and workflow tooling I use to move AI systems from prototype to production-ready services.',
    icon: FaAws,
    accent: '#38bdf8',
    technologies: [
      { name: 'AWS', icon: FaAws, color: '#ff9900' },
      { name: 'Bedrock', icon: Brain, color: '#60a5fa' },
      { name: 'Lambda', icon: Zap, color: '#fb923c' },
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
    ],
  },
  {
    title: 'Evaluation & ML',
    eyebrow: 'QUALITY + MODELS',
    description: 'How I measure LLM systems and apply classical ML — evaluation suites, experiment tracking, and interface delivery.',
    icon: SiMlflow,
    accent: '#4ade80',
    technologies: [
      { name: 'Ragas', icon: Gauge, color: '#4ade80' },
      { name: 'MLflow', icon: SiMlflow, color: '#0194e2' },
      { name: 'Promptfoo', icon: FlaskConical, color: '#22c55e' },
      { name: 'scikit-learn', icon: SiScikitlearn, color: '#f7931e' },
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    ],
  },
];

function TechChip({ tech }: { tech: Tech }) {
  const Icon = tech.icon;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]"
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl border"
        style={{
          color: tech.color,
          backgroundColor: `${tech.color}14`,
          borderColor: `${tech.color}33`,
        }}
      >
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-slate-100">{tech.name}</span>
    </motion.div>
  );
}

function SkillCategoryCard({ category, index }: { category: TechCategory; index: number }) {
  const CategoryIcon = category.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl"
      style={{ boxShadow: `0 18px 60px ${category.accent}10` }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div
            className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.35em]"
            style={{ color: category.accent, fontFamily: 'JetBrains Mono, monospace' }}
          >
            {category.eyebrow}
          </div>
          <h3 className="text-2xl font-bold text-white">{category.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            {category.description}
          </p>
        </div>

        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
          style={{
            color: category.accent,
            backgroundColor: `${category.accent}14`,
            borderColor: `${category.accent}33`,
          }}
        >
          <CategoryIcon size={22} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {category.technologies.map((tech) => (
          <TechChip key={`${category.title}-${tech.name}`} tech={tech} />
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="mb-4 text-[0.72rem] uppercase tracking-[0.45em] text-cyan-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            TECH ARSENAL
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills, organized by how I ship
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-5" />
          <p className="mx-auto max-w-3xl text-base text-slate-400 md:text-lg">
            A compact view of the technologies I use most often across agentic systems, retrieval, cloud delivery, and LLM evaluation.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
