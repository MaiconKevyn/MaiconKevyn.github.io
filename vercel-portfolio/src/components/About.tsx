import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

const EXPERIENCES = [
  {
    title: 'Data Scientist / AI Engineer',
    company: 'ADP',
    date: 'Feb 2024 - Present',
    bullets: [
      'Built end-to-end RAG pipelines with AWS Textract, PyMuPDF, docling, prompt design, vector indexing, and hybrid search in OpenSearch.',
      'Delivered a Databricks Vector Search pipeline for 500+ employee benefits documents, reaching 92% retrieval precision and reducing query response time by 60%.',
      'Implemented RAG evaluation suites with Ragas (faithfulness, context precision, answer relevance), MLflow LLM-as-a-Judge, Promptfoo, and PromptFlow to automate quality checks at scale.',
      'Benchmarked OpenAI and Hugging Face models for sentiment and topic modeling, combining embeddings with K-Means, HDBSCAN, and UMAP to surface coherent cluster structure for stakeholders.',
    ],
    color: '#06b6d4',
  },
  {
    title: 'Data Science Researcher in Artificial Intelligence',
    company: 'PUCRS',
    date: 'Jan 2025 - Present',
    bullets: [
      'Built a LangGraph-based text-to-SQL agent connected to PostgreSQL to answer natural language questions about SUS data through a web interface.',
      'Designed the PostgreSQL schema, indexing strategy, and relational modeling for 15+ tables to preserve performance and data integrity.',
      'Applied healthcare-domain reasoning, structured prompting, and database design to make LLM answers inspectable and queryable.',
    ],
    color: '#a855f7',
  },
  {
    title: 'Data Engineer Intern',
    company: 'Lojas Renner SA',
    date: 'Feb 2022 - Aug 2022',
    bullets: [
      'Processed large data volumes with PySpark on Azure Databricks and built medallion-style pipelines for analytics-ready datasets.',
      'Implemented ETL orchestration with Azure Data Factory and optimized tables for downstream BI consumption.',
      'Built end-to-end data flows with production constraints instead of notebook-only experimentation.',
    ],
    color: '#fb923c',
  },
  {
    title: 'Data Science Researcher',
    company: 'Astronomy Department at UFRGS',
    date: 'Aug 2021 - Jan 2024',
    bullets: [
      'Used Python and SQL for extraction, cleaning, and preprocessing of large SDSS astronomical datasets.',
      'Built supervised models such as Random Forest, SVM, and Gradient Boosting for galaxy classification and quiescence prediction.',
      'Developed a rigorous foundation in statistics, experimentation, and scientific computing that now informs applied AI work.',
    ],
    color: '#f43f5e',
  },
];

const EDUCATION = [
  {
    title: 'B.Sc. Astrophysics',
    institution: 'Federal University of Rio Grande do Sul (UFRGS)',
    date: '2021 - 2026',
  },
  {
    title: 'B.Sc. Data Science',
    institution: 'UNINTER',
    date: '2023 - 2025',
  },
  {
    title: 'M.Sc. Data Science & Artificial Intelligence',
    institution: 'PUCRS',
    date: '2026 - 2028',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <span className="w-2 md:w-3 h-10 md:h-12 bg-cyan-500 block rounded-r-lg" />
          EXPERIENCE & RESEARCH
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-lg mb-14 max-w-3xl"
        >
          Professional work across GenAI delivery, retrieval systems, evaluation workflows, and data platforms, backed by academic research in AI and astrophysics.
        </motion.p>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div
                className="absolute w-4 h-4 rounded-full z-10 -left-[9px] top-2"
                style={{
                  backgroundColor: exp.color,
                  boxShadow: `0 0 10px ${exp.color}66`,
                  border: '3px solid #050505',
                }}
              />

              <div
                className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border hover:-translate-y-1 transition-transform"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div
                      className="text-sm font-semibold tracking-widest uppercase"
                      style={{ color: exp.color, fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {exp.company}
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      <Calendar size={12} aria-hidden="true" />
                      {exp.date}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mt-4 text-gray-300">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-1"
                        style={{ color: exp.color }}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white mb-8"
          >
            Academic Foundation
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {EDUCATION.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6"
              >
                <div
                  className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {item.date}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
