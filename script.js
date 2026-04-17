const timelineEntries = [
  {
    title: "Healthcare AI Systems",
    label: "Agentic NL2SQL",
    color: "#06b6d4",
    summary:
      "Built healthcare-focused AI workflows around Brazilian SUS data, with stateful orchestration, SQL generation, validation, and self-repair loops.",
    bullets: [
      "Portuguese natural-language to SQL agent over roughly 37 million hospital records and 16 tables.",
      "Reported 96.3% execution accuracy in controlled evaluation for the LangGraph-based TXT2SQL system.",
      "Combined schema routing, SQL validation, retry logic, CLI, API, and web interfaces in one delivery path."
    ]
  },
  {
    title: "Cloud RAG Delivery",
    label: "AWS + Serverless",
    color: "#a855f7",
    summary:
      "Expanded from local AI workflows into cloud-native document systems using AWS services, event-driven orchestration, and searchable indexing.",
    bullets: [
      "Designed a serverless PDF processing pipeline with Flask, S3, Lambda, Step Functions, Bedrock embeddings, and OpenSearch.",
      "Used staged document lineage to keep each processing step inspectable and reproducible.",
      "Strengthened the portfolio signal for infrastructure-minded AI engineering."
    ]
  },
  {
    title: "Evaluation-First Agents",
    label: "Research Systems",
    color: "#4ade80",
    summary:
      "Pushed into more explicit AI architecture work with typed contracts, guardrails, vector search, web search, and execution traces.",
    bullets: [
      "Built a research agent with FastAPI, React, LangGraph, PostgreSQL, and pgvector.",
      "Used structured outputs and schema validation for critical decision points instead of prompt-only control.",
      "Focused on grounded answers, source handling, and measurable behavior across iterations."
    ]
  },
  {
    title: "Operational AI Products",
    label: "UI + API + Data",
    color: "#fb923c",
    summary:
      "Applied AI features inside broader products, including dashboards and domain workflows where models must coexist with operational constraints.",
    bullets: [
      "Integrated AI-assisted capabilities into dashboard-style applications instead of keeping them as isolated experiments.",
      "Worked across frontend surfaces, backend services, databases, and AI layers to keep systems usable.",
      "Kept the portfolio balanced between LLM systems, analytics, and product-oriented engineering."
    ]
  }
];

const projects = [
  {
    title: "TXT2SQL for DATASUS",
    kicker: "Healthcare AI",
    tone: "cyan",
    signal: "37M+",
    signalLabel: "records queried",
    repo: "https://github.com/MaiconKevyn/agent-txt2sql-langgraph",
    summary:
      "Portuguese natural-language to SQL agent over Brazilian healthcare microdata, built with LangGraph, OpenAI, DuckDB, validation rules, and repair loops.",
    bullets: [
      "Routes queries across conversational, schema and database paths.",
      "Validates SQL before execution and repairs failures with bounded retries.",
      "Shows strong evidence of evaluation, domain adaptation, and system design."
    ],
    tags: ["LangGraph", "OpenAI", "DuckDB", "Healthcare", "Evaluation"]
  },
  {
    title: "AWS Universal Extractor",
    kicker: "Document Intelligence",
    tone: "purple",
    signal: "Async AWS",
    signalLabel: "structured extraction",
    repo: "https://github.com/MaiconKevyn/aws-universal-extractor",
    summary:
      "Asynchronous AWS pipeline for structured PDF extraction using Step Functions, Lambda, S3, YAML extraction profiles, and OpenAI structured outputs.",
    bullets: [
      "Starts from an async HTTP submission flow and persists extraction outputs by profile, version, and request id.",
      "Separates fetch, text extraction, profile loading, LLM extraction, schema validation, and persistence into explicit pipeline steps.",
      "Shows cloud-native AI workflow design beyond local prototypes and notebook analysis."
    ],
    tags: ["AWS", "Step Functions", "Lambda", "S3", "Structured Outputs"]
  },
  {
    title: "Research Agent with Continuous Evaluation",
    kicker: "Agentic Research",
    tone: "green",
    signal: "pgvector",
    signalLabel: "grounded retrieval",
    repo: "https://github.com/MaiconKevyn/agentic-research-pipeline",
    summary:
      "Evaluation-minded research agent with FastAPI, React, LangGraph, PostgreSQL, pgvector, structured outputs, and tool-based evidence gathering.",
    bullets: [
      "Uses schemas for classification, planning, synthesis and evaluation stages.",
      "Combines vector search, web search and execution trace reporting.",
      "Represents a more mature AI systems direction with explicit contracts."
    ],
    tags: ["FastAPI", "React", "pgvector", "LangGraph", "Guardrails"]
  },
  {
    title: "Amazon Feedback Analysis",
    kicker: "Applied NLP",
    tone: "green",
    signal: "Zero-shot",
    signalLabel: "sentiment + topics",
    repo: "https://github.com/MaiconKevyn/amazon-feedback-analysis",
    summary:
      "Customer-review analysis workflow over an Amazon reviews dataset, combining zero-shot sentiment classification, topic modeling, and a Streamlit dashboard for insight exploration.",
    bullets: [
      "Uses GPT-4o for sentiment analysis and DeBERTa zero-shot classification for topic detection.",
      "Groups feedback by topic to identify which issues most negatively affect user experience.",
      "Presents results through interactive visual analysis, including trends over time and sentiment by topic."
    ],
    tags: ["GPT-4o", "DeBERTa", "Streamlit", "Pandas", "Zero-shot NLP"]
  }
];

const skillGroups = [
  {
    title: "AI & Agentic Systems",
    items: ["LangGraph", "OpenAI API", "RAG", "Tool Calling", "Structured Output", "Prompt Evaluation"]
  },
  {
    title: "Data & Analytics",
    items: ["Python", "Pandas", "DuckDB", "SQL", "Feature Work", "Healthcare Data"]
  },
  {
    title: "APIs & Product Delivery",
    items: ["FastAPI", "Flask", "REST APIs", "React", "Dashboards", "Service Integration"]
  },
  {
    title: "Infrastructure & Search",
    items: ["AWS", "Step Functions", "Lambda", "PostgreSQL", "pgvector", "OpenSearch"]
  }
];

const contacts = [
  {
    title: "GitHub",
    value: "github.com/MaiconKevyn",
    href: "https://github.com/MaiconKevyn",
    icon: "GH",
    gradient: "linear-gradient(135deg, #14b8a6, #10b981)"
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/maiconkevyn",
    href: "https://www.linkedin.com/in/maiconkevyn/",
    icon: "in",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)"
  },
  {
    title: "Kaggle",
    value: "kaggle.com/kevynmaicon",
    href: "https://www.kaggle.com/kevynmaicon",
    icon: "KG",
    gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)"
  },
  {
    title: "LeetCode",
    value: "leetcode.com/u/maiconkevyn",
    href: "https://leetcode.com/u/maiconkevyn/",
    icon: "LC",
    gradient: "linear-gradient(135deg, #fb923c, #f97316)"
  },
  {
    title: "Location",
    value: "Brazil",
    icon: "BR",
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)"
  }
];

const timelineContainer = document.querySelector("#timeline");
const projectRail = document.querySelector("#project-rail");
const skillsGrid = document.querySelector("#skills-grid");
const contactGrid = document.querySelector("#contact-grid");
const progressBar = document.querySelector("#scroll-progress");
const bootScreen = document.querySelector("#boot-screen");

function createTimelineItem(entry) {
  const wrapper = document.createElement("article");
  wrapper.className = "timeline-item reveal";

  const dot = document.createElement("span");
  dot.className = "timeline-dot";
  dot.style.color = entry.color;
  dot.style.backgroundColor = entry.color;

  const card = document.createElement("div");
  card.className = "timeline-card";
  card.style.borderColor = `${entry.color}22`;

  const header = document.createElement("div");
  header.className = "timeline-header";

  const title = document.createElement("h3");
  title.className = "timeline-title";
  title.textContent = entry.title;

  const label = document.createElement("span");
  label.className = "timeline-label";
  label.textContent = entry.label;
  label.style.color = entry.color;
  label.style.borderColor = `${entry.color}40`;

  header.append(title, label);

  const summary = document.createElement("p");
  summary.className = "timeline-subtitle";
  summary.textContent = entry.summary;

  const list = document.createElement("ul");
  list.className = "timeline-bullets";

  entry.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.style.setProperty("--accent", entry.color);
    item.textContent = bullet;
    list.appendChild(item);
  });

  card.append(header, summary, list);
  wrapper.append(dot, card);
  return wrapper;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.dataset.tone = project.tone;

  const visual = document.createElement("div");
  visual.className = "project-visual";

  const kicker = document.createElement("span");
  kicker.className = "project-kicker";
  kicker.textContent = project.kicker;

  const signal = document.createElement("div");
  signal.className = "project-signal";
  signal.innerHTML = `<strong>${project.signal}</strong><span>${project.signalLabel}</span>`;

  visual.append(kicker, signal);

  const title = document.createElement("h3");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.className = "project-summary";
  summary.textContent = project.summary;

  const list = document.createElement("ul");
  list.className = "project-bullets";
  project.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    list.appendChild(item);
  });

  const tags = document.createElement("div");
  tags.className = "project-tags";
  project.tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tags.appendChild(tag);
  });

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.repo;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open repository";

  card.append(visual, title, summary, list, tags, link);
  return card;
}

function createSkillCard(group) {
  const card = document.createElement("article");
  card.className = "skill-card reveal";

  const title = document.createElement("h3");
  title.textContent = group.title;

  const list = document.createElement("div");
  list.className = "skill-list";

  group.items.forEach((itemText) => {
    const item = document.createElement("span");
    item.textContent = itemText;
    list.appendChild(item);
  });

  card.append(title, list);
  return card;
}

function createContactCard(contact) {
  const element = contact.href ? document.createElement("a") : document.createElement("article");
  element.className = "contact-card reveal";

  if (contact.href) {
    element.href = contact.href;
    element.target = "_blank";
    element.rel = "noreferrer";
  }

  const icon = document.createElement("div");
  icon.className = "contact-icon";
  icon.style.background = contact.gradient;
  icon.textContent = contact.icon;

  const title = document.createElement("h3");
  title.textContent = contact.title;

  const value = document.createElement("p");
  value.className = "contact-value";
  value.textContent = contact.value;

  element.append(icon, title, value);
  return element;
}

function render() {
  timelineContainer.replaceChildren(...timelineEntries.map(createTimelineItem));
  projectRail.replaceChildren(...projects.map(createProjectCard));
  skillsGrid.replaceChildren(...skillGroups.map(createSkillCard));
  contactGrid.replaceChildren(...contacts.map(createContactCard));
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = total <= 0 ? 0 : window.scrollY / total;
  progressBar.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
}

function setupProjectControls() {
  const prev = document.querySelector("#project-prev");
  const next = document.querySelector("#project-next");

  const scrollByAmount = () => Math.min(projectRail.clientWidth * 0.82, 420);

  prev.addEventListener("click", () => {
    projectRail.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    projectRail.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  });
}

function hideBootScreen() {
  window.setTimeout(() => {
    bootScreen.classList.add("is-hidden");
  }, 900);
}

function setupEasterEgg() {
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "n") {
      event.preventDefault();
      document.body.classList.toggle("neural-boost");
    }
  });
}

function setupNetworkCanvas() {
  const canvas = document.querySelector("#network-canvas");
  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!context || reducedMotion) {
    return;
  }

  const config = {
    nodeCount: window.innerWidth < 768 ? 32 : 54,
    maxDistance: window.innerWidth < 768 ? 110 : 150,
    speed: window.innerWidth < 768 ? 0.18 : 0.24
  };

  const nodes = [];

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    nodes.length = 0;
    for (let index = 0; index < config.nodeCount; index += 1) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed
      });
    }
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > window.innerWidth) {
        node.vx *= -1;
      }

      if (node.y < 0 || node.y > window.innerHeight) {
        node.vy *= -1;
      }

      context.beginPath();
      context.fillStyle = "rgba(34, 211, 238, 0.88)";
      context.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
      context.fill();

      for (let nested = index + 1; nested < nodes.length; nested += 1) {
        const other = nodes[nested];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.maxDistance) {
          const alpha = 1 - distance / config.maxDistance;
          context.beginPath();
          context.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.22})`;
          context.lineWidth = 1;
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    }

    window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

document.querySelector("#year").textContent = new Date().getFullYear();
render();
setupReveal();
setupProjectControls();
setupEasterEgg();
setupNetworkCanvas();
updateProgress();
hideBootScreen();

window.addEventListener("scroll", updateProgress, { passive: true });
