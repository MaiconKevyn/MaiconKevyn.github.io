const projects = [
  {
    title: "TXT2SQL for DATASUS",
    track: "Agents",
    tone: "teal",
    repo: "https://github.com/MaiconKevyn/agent-txt2sql-langgraph",
    summary:
      "Portuguese natural-language to SQL agent for Brazilian healthcare microdata, built with LangGraph and OpenAI over a DuckDB warehouse.",
    highlights: [
      "Works over approximately 37 million hospital records across 16 tables.",
      "Reported 96.3% execution accuracy on an 81-query evaluation set.",
      "Includes routing, SQL validation, bounded self-repair, CLI, REST API, and web UI."
    ],
    tags: ["LangGraph", "OpenAI", "DuckDB", "Healthcare", "Evaluation"]
  },
  {
    title: "QA on AWS",
    track: "Cloud AI",
    tone: "rust",
    repo: "https://github.com/MaiconKevyn/qa-on-aws",
    summary:
      "Serverless RAG pipeline for PDF processing using Flask, AWS Step Functions, Lambda, Bedrock embeddings, S3 lineage, and OpenSearch indexing.",
    highlights: [
      "Automates document ingestion from upload to vector indexing.",
      "Uses Step Functions to orchestrate a four-stage RAG pipeline.",
      "Combines application delivery with cloud infrastructure and observability."
    ],
    tags: ["AWS", "RAG", "Serverless", "Bedrock", "OpenSearch"]
  },
  {
    title: "Research Agent with Continuous Evaluation",
    track: "Agents",
    tone: "gold",
    repo: "https://github.com/MaiconKevyn/agentic-research-pipeline",
    summary:
      "Research agent project focused on explicit orchestration, tool calling, structured validation, vector search, web search, and evaluation-first design.",
    highlights: [
      "Built with FastAPI, React, LangGraph, PostgreSQL, and pgvector.",
      "Uses typed schemas and structured output for critical workflow stages.",
      "Combines answer synthesis, source grounding, and execution traces."
    ],
    tags: ["FastAPI", "React", "pgvector", "LangGraph", "Guardrails"]
  },
  {
    title: "Cyber AI Assessment",
    track: "Data Product",
    tone: "teal",
    repo: "https://github.com/MaiconKevyn/cyber_AI_assessment",
    summary:
      "AI-enabled dashboard for energy assets, device vulnerabilities, and operational workflows with a chat assistant and multi-service architecture.",
    highlights: [
      "Connects dashboard UX, FastAPI chat services, and PostgreSQL data.",
      "Demonstrates product thinking beyond standalone models.",
      "Shows practical integration of AI features inside an operational interface."
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "AI Assistant", "Dashboard"]
  },
  {
    title: "SQL Agent with Llama 3",
    track: "Applied NLP",
    tone: "rust",
    repo: "https://github.com/MaiconKevyn/sql-agent-llama3",
    summary:
      "Interactive SQL agent in Brazilian Portuguese for querying SUS data through natural-language questions, with modular design and fallback strategies.",
    highlights: [
      "Targets domain-specific health analytics without requiring SQL expertise.",
      "Focuses on conversational querying in Portuguese.",
      "Represents an earlier iteration of the healthcare agent line of work."
    ],
    tags: ["Ollama", "Llama 3", "SQL", "Portuguese NLP", "Healthcare"]
  },
  {
    title: "chatbot-pysus",
    track: "Applied NLP",
    tone: "gold",
    repo: "https://github.com/MaiconKevyn/chatbot-pysus",
    summary:
      "Early healthcare chatbot for querying SUS data with natural language, positioned as a practical experimentation layer around tool calling and data access.",
    highlights: [
      "Explores question answering over public healthcare data in Portuguese.",
      "Shows iterative work on sanitization, fallback logic, buffering, and vector search.",
      "Helps tell the story of how the later TXT2SQL systems evolved."
    ],
    tags: ["LangChain", "Healthcare", "Portuguese NLP", "Chatbot", "Experimentation"]
  }
];

const filters = ["All", ...new Set(projects.map((project) => project.track))];

const filterContainer = document.querySelector("#filters");
const grid = document.querySelector("#project-grid");

function createFilterButton(filter, activeFilter) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `filter-button${filter === activeFilter ? " is-active" : ""}`;
  button.textContent = filter;
  button.addEventListener("click", () => renderPortfolio(filter));
  return button;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.tone = project.tone;

  const meta = document.createElement("div");
  meta.className = "project-meta";
  meta.innerHTML = `<span>${project.track}</span><span>GitHub Repository</span>`;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.className = "project-summary";
  summary.textContent = project.summary;

  const highlights = document.createElement("ul");
  highlights.className = "project-highlights";
  project.highlights.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    highlights.appendChild(listItem);
  });

  const tags = document.createElement("div");
  tags.className = "tag-row";
  project.tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    tags.appendChild(tag);
  });

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.repo;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open repository";

  card.append(meta, title, summary, highlights, tags, link);
  return card;
}

function renderPortfolio(activeFilter = "All") {
  filterContainer.replaceChildren(
    ...filters.map((filter) => createFilterButton(filter, activeFilter))
  );

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.track === activeFilter);

  grid.replaceChildren(...visibleProjects.map(createProjectCard));
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
renderPortfolio();
setupReveal();
