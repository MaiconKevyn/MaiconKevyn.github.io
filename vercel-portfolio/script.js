const typedPhrases = [
  "LLM orchestration, tool routing, and structured outputs.",
  "RAG pipelines, vector search, and document intelligence.",
  "evaluation loops, validation layers, and repair logic.",
  "AWS workflows, FastAPI services, and usable AI products."
];

const featuredProjects = [
  {
    title: "TXT2SQL for DATASUS",
    category: "Healthcare AI",
    signal: "37M+ records",
    summary:
      "Portuguese natural-language to SQL agent over Brazilian healthcare microdata, built with LangGraph, OpenAI, DuckDB, schema routing, validation rules, and bounded repair loops.",
    bullets: [
      "Routes questions across conversational, schema, and database paths to keep responses grounded in the right execution mode.",
      "Validates generated SQL before execution and retries on failure using explicit repair loops instead of blind regeneration.",
      "Shows domain-specific AI engineering over large public datasets rather than a generic chatbot wrapper."
    ],
    tags: ["LangGraph", "OpenAI", "DuckDB", "Healthcare", "Evaluation"],
    stack: ["Python", "CLI", "API", "Query Validation"],
    url: "https://github.com/MaiconKevyn/agent-txt2sql-langgraph"
  },
  {
    title: "AWS Universal Extractor",
    category: "Document Intelligence",
    signal: "Async AWS pipeline",
    summary:
      "Asynchronous PDF extraction pipeline using S3, Lambda, Step Functions, YAML extraction profiles, and OpenAI structured outputs for reliable structured document processing.",
    bullets: [
      "Separates upload, fetch, text extraction, profile resolution, LLM extraction, schema validation, and persistence into explicit processing stages.",
      "Captures outputs by request id, profile, and version so the workflow remains inspectable and easier to evolve.",
      "Adds a strong cloud-native signal to the portfolio by moving beyond local-only AI prototypes."
    ],
    tags: ["AWS", "Step Functions", "Lambda", "S3", "Structured Outputs"],
    stack: ["Serverless", "PDF Parsing", "Schema Validation", "Async APIs"],
    url: "https://github.com/MaiconKevyn/aws-universal-extractor"
  },
  {
    title: "Research Agent with Continuous Evaluation",
    category: "Agentic Research",
    signal: "pgvector retrieval",
    summary:
      "Evaluation-minded research agent using FastAPI, React, LangGraph, PostgreSQL, pgvector, structured outputs, and tool-based evidence gathering.",
    bullets: [
      "Uses explicit schemas for classification, planning, synthesis, and evaluation steps instead of relying on loose prompt conventions.",
      "Combines vector search, web search, and execution trace reporting to keep answers grounded and debuggable.",
      "Represents a more mature AI system direction where architecture and reliability matter as much as raw generation."
    ],
    tags: ["FastAPI", "React", "pgvector", "LangGraph", "Guardrails"],
    stack: ["PostgreSQL", "Retrieval", "Execution Traces", "Web UI"],
    url: "https://github.com/MaiconKevyn/agentic-research-pipeline"
  },
  {
    title: "Amazon Feedback Analysis",
    category: "Applied NLP",
    signal: "Zero-shot insights",
    summary:
      "Customer-review analysis workflow over Amazon feedback data, combining zero-shot sentiment classification, topic modeling, and a Streamlit dashboard for exploratory insight analysis.",
    bullets: [
      "Uses GPT-4o for sentiment labeling and DeBERTa zero-shot classification for topical grouping across customer feedback.",
      "Highlights which topics drive the most negative sentiment so the analysis is actionable instead of purely descriptive.",
      "Demonstrates a balanced profile across LLM systems, NLP analysis, dashboards, and business-facing storytelling."
    ],
    tags: ["GPT-4o", "DeBERTa", "Streamlit", "Pandas", "Zero-shot NLP"],
    stack: ["Analytics", "Topic Modeling", "Visualization", "Dashboard"],
    url: "https://github.com/MaiconKevyn/amazon-feedback-analysis"
  }
];

const typedText = document.querySelector("#typed-text");
const projectList = document.querySelector("#project-list");
const systemPanel = document.querySelector("#system-panel");
const scrollProgress = document.querySelector("#scroll-progress");
const cursorGlow = document.querySelector("#cursor-glow");
const orbitalStage = document.querySelector("#orbital-stage");
const currentYear = document.querySelector("#current-year");
const revealElements = document.querySelectorAll(".reveal");

let currentPhraseIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;

function runTypewriter() {
  if (!typedText) {
    return;
  }

  const currentPhrase = typedPhrases[currentPhraseIndex];
  const visibleText = currentPhrase.slice(0, currentCharacterIndex);
  typedText.textContent = visibleText;

  const typingDelay = isDeleting ? 26 : 48;
  let nextDelay = typingDelay;

  if (!isDeleting && currentCharacterIndex < currentPhrase.length) {
    currentCharacterIndex += 1;
  } else if (!isDeleting && currentCharacterIndex === currentPhrase.length) {
    isDeleting = true;
    nextDelay = 1500;
  } else if (isDeleting && currentCharacterIndex > 0) {
    currentCharacterIndex -= 1;
  } else {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % typedPhrases.length;
    nextDelay = 260;
  }

  window.setTimeout(runTypewriter, nextDelay);
}

function createProjectButton(project, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "project-button";
  button.setAttribute("role", "tab");
  button.setAttribute("aria-selected", "false");
  button.innerHTML = `
    <div class="project-button-head">
      <div>
        <span class="project-button-index">0${index + 1}</span>
        <h3 class="project-button-title">${project.title}</h3>
        <p class="project-button-meta">${project.category}</p>
      </div>
      <span class="project-button-signal">${project.signal}</span>
    </div>
  `;
  return button;
}

function renderSystemPanel(project) {
  if (!systemPanel) {
    return;
  }

  systemPanel.innerHTML = `
    <div class="system-topline">
      <div>
        <p class="system-kicker">${project.category}</p>
        <h3 class="system-title">${project.title}</h3>
      </div>
      <span class="system-signal">${project.signal}</span>
    </div>

    <p class="system-summary">${project.summary}</p>

    <div class="system-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>

    <div class="system-section">
      <h4>Why it matters</h4>
      <ul class="system-bullets">
        ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
    </div>

    <div class="system-section">
      <h4>Execution Layer</h4>
      <div class="system-stack">
        ${project.stack.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>

    <div class="system-actions">
      <a class="button button-primary" href="${project.url}" target="_blank" rel="noreferrer">
        Open Repository
      </a>
      <a class="button button-secondary" href="https://github.com/MaiconKevyn" target="_blank" rel="noreferrer">
        More Projects
      </a>
    </div>
  `;
}

function renderProjects() {
  if (!projectList) {
    return;
  }

  const buttons = featuredProjects.map((project, index) => createProjectButton(project, index));

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      buttons.forEach((candidate) => {
        candidate.classList.remove("is-active");
        candidate.setAttribute("aria-selected", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      renderSystemPanel(featuredProjects[index]);
    });

    projectList.appendChild(button);
  });

  if (buttons.length > 0) {
    buttons[0].classList.add("is-active");
    buttons[0].setAttribute("aria-selected", "true");
    renderSystemPanel(featuredProjects[0]);
  }
}

function updateScrollProgress() {
  if (!scrollProgress) {
    return;
  }

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
  scrollProgress.style.width = `${percent}%`;
}

function bindCursorGlow() {
  if (!cursorGlow) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
}

function bindOrbitalStageTilt() {
  if (!orbitalStage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  orbitalStage.addEventListener("pointermove", (event) => {
    const bounds = orbitalStage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const tiltX = (x - 0.5) * 7;
    const tiltY = (0.5 - y) * 7;

    orbitalStage.style.setProperty("--tilt-x", `${tiltX}deg`);
    orbitalStage.style.setProperty("--tilt-y", `${tiltY}deg`);
  });

  orbitalStage.addEventListener("pointerleave", () => {
    orbitalStage.style.setProperty("--tilt-x", "0deg");
    orbitalStage.style.setProperty("--tilt-y", "0deg");
  });
}

function bindRevealObserver() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

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
      threshold: 0.18
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initialize() {
  renderProjects();
  bindCursorGlow();
  bindOrbitalStageTilt();
  bindRevealObserver();
  updateScrollProgress();
  runTypewriter();

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
}

initialize();
