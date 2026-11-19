import {
  ArrowUpRight, ArrowRight, Github, Linkedin, Mail, Cpu, BrainCircuit,
  Cloud, Workflow, Network, ChevronDown,
  Code2, Activity, Server, ShieldCheck, Gauge, FlaskConical, Bot, Building2, Stethoscope
} from "lucide-react";
import Topbar from "../components/Topbar";
import { headline, buildMatrix } from "../lib/dataset";

const github = "https://github.com/Deyan86";
const linkedin = "https://linkedin.com/in/deyan-peshev-4a25821a6";
const email = "mailto:deyan.peshev.cloud@gmail.com";

const projects = [
  {
    number: "01", category: "AI ENGINEERING", title: "Deterministic LLM evaluation harness",
    description: "A reproducible, offline scoring harness for local language models across 12 weighted capability categories. Every published figure is generated from a recorded artifact — no LLM judge, no hand-typed number.",
    facts: [
      `${headline.models} distinct models with a recorded result, across ${headline.runs} automated runs`,
      `${headline.assertions.toLocaleString("en-US")} individually scored assertions, ${headline.passed.toLocaleString("en-US")} passed`,
      "Provenance audit with a mechanical coverage report — 0 unread scored artifacts",
    ],
    stack: ["Python", "LM Studio REST", "Ollama", "vLLM", "JSON Schema", "subprocess execution"],
    icon: <BrainCircuit />,
    link: "/benchmarks", linkLabel: "Open the live benchmark view",
  },
  {
    number: "02", category: "AI PLATFORM / CONTROL PLANE", title: "Local AI control plane and RAG dashboard",
    description: "A self-hosted control plane for a single 24 GB GPU: it starts and stops model servers under a VRAM budget, puts them behind one OpenAI-compatible gateway with per-project keys, and serves retrieval over a PDF corpus ingested page by page.",
    facts: ["OpenAI-compatible surface: /v1/chat/completions, /v1/embeddings, /v1/models", "Per-project API keys, VRAM budget control, server start/stop lifecycle", "Page-level RAG ingestion, reindex and search over a local corpus", "189 tests collected across 19 test modules"],
    stack: ["Python", "FastAPI", "uvicorn", "httpx", "PyMuPDF + PaddleOCR", "SQLite", "pytest"],
    icon: <Server />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "03", category: "GPU / SYSTEMS ENGINEERING", title: "CUDA & GPU inference R&D on Blackwell",
    description: "Native C/CUDA inference work on RTX 5090 (sm_120) under a 24 GB VRAM budget: MoE expert offloading, quantisation trade-off measurement and the container build path for a GPU architecture the stable vLLM release did not support.",
    facts: [
      `${buildMatrix.vllm_options.length} vLLM builds characterised against sm_120, with the kernel-architecture cause isolated`,
      `${buildMatrix.flags.length} build flags documented to the container route that fixes it`,
      "Agentic vLLM route removed from the pipeline: it burned 45 s of retries while logging success",
    ],
    stack: ["C", "CUDA", "PyTorch cu128", "vLLM", "Docker", "Quantization"],
    icon: <Cpu />,
    link: "/benchmarks", linkLabel: "See the runtime comparison",
  },
  {
    number: "04", category: "CLOUD-NATIVE", title: "Private Cloud & Kubernetes Lab",
    description: "A self-hosted multi-node hybrid K3s environment with GitOps delivery, distributed storage, ingress, observability, security monitoring and recovery workflows.",
    facts: ["Multi-node K3s cluster", "ArgoCD & Jenkins workflows", "Longhorn distributed storage"],
    stack: ["Kubernetes", "K3s", "Docker", "ArgoCD", "Prometheus", "Grafana"],
    icon: <Cloud />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "05", category: "MULTI-AGENT PLATFORM", title: "PROJECT NEXUS — autonomous multi-agent execution platform",
    description: "A request is planned into a dependency DAG of subtasks and a LangGraph supervisor runs one graph node per subtask against a team of dynamically spawned agents, so independent work shares a superstep and dependent work waits for the right predecessor. Every tool call passes one permission gate, and every step of a run is persisted so it can be read back as a tree of spans. Under active construction — Phases 1–4 and P5-1…P5-3 are closed and verified, more is planned.",
    facts: [
      "834 backend tests pass and 9 skip on this build (843 collected); 18 Playwright e2e specs exist for the dashboard",
      "A cyclic plan is rejected by Kahn's algorithm and an unusable model answer falls back to a deterministic plan, so a task always has something executable",
      "Six contract-validated A2A message kinds between agents, with the sender, recipient and payload traced per message",
      "Skills registry with one row per version and dependency resolution: an agent loads only the skills it needs",
      "CI runs the suite against a real PostgreSQL 18 and a real Redis 7, because tests that skip when a service is missing would otherwise report green",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "LiteLLM", "PostgreSQL", "Redis", "Temporal", "OpenTelemetry", "Next.js 14", "Playwright"],
    icon: <Workflow />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "06", category: "LOCAL AI SECURITY TEAM", title: "Local Windows SecOps AI team",
    description: "A security-operations assistant that runs entirely on one Windows machine: deterministic PowerShell and bash collectors do the heavy lifting, and local models through LM Studio only ever see the anomalies that survive the rule engine — so nothing leaves the host and no finding is unexplained. The team audits and recommends; it never changes the system on its own.",
    facts: [
      "798 offline Python tests collected and 73 JS tests passing, neither of which needs a network or a running model server",
      "A LangGraph workflow of collect → normalize → route → analyze → correlate → report, where a deterministic route step decides which agent sees which anomalies and a commander agent writes the coordinated summary",
      "Remediation scripts are generated from templates rather than by a model, destructive lines are emitted commented out, and a gated command runs only after the operator confirms the exact command text",
      "Offline knowledge base over six sources — MITRE ATT&CK, CAPEC, D3FEND, SigmaHQ, Atomic Red Team and NVD — backed by a SQLite plus numpy vector store instead of a vector database",
      "A read-only WSL collector and a review-only remediation path extend the same team into Linux distros",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "SQLite + numpy", "PowerShell", "React", "Vite", "LM Studio"],
    icon: <ShieldCheck />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "07", category: "WINDOWS SYSTEMS / AUDIT FRAMEWORK", title: "AI System Enterprise Audit",
    description: "A diagnostic framework for AI workstations and servers: 50 PowerShell modules emit one standardized report shape, and a native desktop app drives them — run a single module or a full pass, watch the log stream and read the scores back as history. It is built for the question an AI box always raises: are the GPU, the VRAM budget and the inference runtime actually configured correctly.",
    facts: [
      "50 PowerShell modules share one output schema (module, status, score, warnings, errors) and are discovered by the same rule the runner uses — a file is callable when it defines a Start-* or Get-* function",
      "29 frontend Vitest tests and 14 Rust backend tests pass on this checkout, and svelte-check reports 0 errors and 0 warnings",
      "A native Tauri 2 + Svelte app runs the modules, streams live logs and charts the scores; the browser preview has no Rust backend behind it and says so on every tab instead of failing silently",
      "The report reader tolerates what PowerShell actually writes — the UTF-8 BOM, three different encodings of the timestamp and truncated files — so one malformed report cannot empty the results view",
      "The audited surface is the AI-infrastructure path: GPU compute and VRAM state, model runtimes (Ollama, vLLM, PyTorch, CUDA), Docker and K3s hosts, drivers, firmware and thermal limits",
    ],
    stack: ["PowerShell", "Rust", "Tauri 2", "Svelte", "TypeScript", "Vite", "Chart.js"],
    icon: <Gauge />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "08", category: "MCP / DEVOPS TOOLING", title: "Universal MCP Server",
    description: "One MCP server that several clients and agents attach to over stdio, a stdio bridge or streamable HTTP. It reads, searches, validates and analyses whatever project it is pointed at, and a multi-project hub lets a single running server switch between repositories instead of starting one per project.",
    facts: [
      "500 tests pass, and CI runs the suite on Python 3.10, 3.11 and 3.12 with ruff lint, a ruff format check and mypy inside the same job",
      "55 tools by registration count: 50 read-only plus a five-tool write group that is off by default, with a test asserting those tools are absent until the operator enables them",
      "3 resources and 12 prompts, including a server_status self-description and a doctor prompt that reports the state of the running server",
      "The file tools honour each project's own .gitignore plus a fixed blocklist, so .venv, node_modules, build caches and .env stay out of every read, search and edit",
      "The HTTP transport refuses to bind to a public address unless a shared token is set, and the token is compared without leaking its timing",
    ],
    stack: ["Python", "MCP SDK", "Starlette", "uvicorn", "pytest", "ruff", "mypy", "Docker"],
    icon: <Network />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "09", category: "GPU / TRITON KERNELS", title: "Hand-written Triton kernels with an honest benchmark",
    description: "Triton kernels written by hand, with the measurement discipline built around them: input validation before the launch, a benchmark that counts the bytes each compared path actually moves, and an A/B method that refuses to call a result a win when the noise is larger than the difference. Measured on an RTX 5090 Laptop (sm_120).",
    facts: [
      "195 pytest tests, of which 64 pass on a machine with no GPU at all — CI installs CPU-only torch on a pinned runner and clears CUDA_VISIBLE_DEVICES rather than skipping the suite",
      "44 TypeScript tests for the dashboard's server layer, run by node --test with no extra dependency, in a CI matrix of Node 22 and Node 26",
      "Four kernels — fused add+ReLU, row-wise softmax, layer norm and a grid-stride sum — each rejecting a mismatched operand before the launch",
      "The A/B harness counts a win only when the median clears 1.5 times the spread observed between its own repeats: across the recorded runs that is 45 WITHIN NOISE, 10 faster and 13 slower, including two sizes where a 1.4× median is reported as no win",
      "Seven benchmark runs are committed as JSON with a full environment passport — GPU, driver, CUDA, torch and triton version, git commit and whether the worktree was dirty — while the 4.5 GB of raw profiler traces stay out of the repository",
    ],
    stack: ["Python", "Triton", "PyTorch", "CUDA", "pytest", "Node.js", "Next.js 16"],
    icon: <FlaskConical />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "10", category: "AUTONOMOUS AGENT PIPELINE", title: "Superstep Agent — self-healing LangGraph code pipeline",
    description: "A pipeline that takes a programming task from plan to reviewed, tested and documented code, running as one LangGraph graph over an Apache Kafka backbone. Each stage announces itself into the frame that the dashboard renders, so a run can be followed and replayed rather than guessed at from logs.",
    facts: [
      "Five nodes — researcher, coder, tester, reviewer and writer — compiled over a SQLite checkpointer, with the reviewer's verdict routing a rejected result back to the coder instead of ending the run",
      "80 of 85 collected tests pass and 5 skip without the containers, while CI runs four jobs including one that composes Kafka with the API and executes the pipeline end to end",
      "Failover walks a six-step model ladder across six providers, rebuilt inside the node rather than wrapped in a retry decorator",
      "18 tool functions and 16 model-facing tool schemas, one of each contributed by a plugin discovered at import time",
      "The React dashboard reads the Kafka frames over a WebSocket: a DAG view coloured by the real edges, a Monaco panel with the validated code, a Code Wiki tab and a code graph served without any external network",
    ],
    stack: ["Python", "LangGraph", "Kafka", "FastAPI", "ChromaDB", "React", "Ollama", "vLLM"],
    icon: <Bot />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "11", category: "ENTERPRISE AI AGENT / HCI", title: "AOS-Architect — Nutanix L3 support agent on local models",
    description: "An L3 infrastructure support agent for Nutanix AOS that runs entirely on local models: a FastAPI service answering from vendor documentation through vector retrieval, reading live cluster state through Prism Central, and scoring its own answers with an evaluation framework rather than trusting a demo.",
    facts: [
      "46 tests pass in 8 seconds, and the documentation carries a tool-by-tool live status table dated to the day it was last verified — including the negative result the evaluation framework measured against itself",
      "Retrieval runs on Supabase with pgvector: a hybrid search RPC combining vector distance with BM25, then a cross-encoder re-rank, with the schema and the role grants kept in versioned SQL",
      "Eight Prism Central tools cover clusters, cluster details, alerts, VMs, health, capacity stats, LCM status and a connectivity probe; the endpoint and credentials are read only from the environment, so nothing about a real cluster is stored in the repository",
      "The model layer is deliberately narrow — Ollama and LM Studio republished into WSL through a socat bridge, with no vLLM or hosted rung, because a model picker that answers with a model nobody chose is a lying picker",
      "Web lookup falls back from DuckDuckGo HTML to a self-hosted SearXNG whose per-engine timeout is capped at 8 seconds after the agent was observed giving up before slower engines answered, and the health endpoint no longer performs a search at all",
    ],
    stack: ["Python", "FastAPI", "Supabase", "pgvector", "Ollama", "LM Studio", "Redis", "SearXNG", "Docker"],
    icon: <Building2 />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "12", category: "AI INFRASTRUCTURE / DIAGNOSTICS", title: "AI Infrastructure Doctor — diagnostics and control plane for a local LLM stack",
    description: "A diagnostic and monitoring platform for the local AI stack on one GPU machine: it measures GPU, CUDA, Docker, vLLM, Ollama, LM Studio and HuggingFace caches from one CLI, serves the same answers through a REST and streaming control plane, and documents every gap it has not fixed yet.",
    facts: [
      "126 tests pass and 2 skip, measured with the repository's own virtualenv. The README carries a Known gaps section with twelve defects recorded against file and line — among them the five of twelve diagnostic routes that still answer 500, and why the suite stays green over them",
      "Twenty diagnostic modules and a fifteen-module core engine (4 814 and 2 221 lines) behind one CLI: sixteen registry commands covering diagnose, benchmark, fix, optimize and per-backend checks",
      "The control plane exposes 22 REST and WebSocket paths. Command runs stream over SSE and WebSocket under a 900-second cap, a 20 000-line output limit and a single run slot, and the 29 whitelisted dashboard commands resolve to an argv list that never passes through a shell",
      "Backends are found by scanning instead of trusting one hardcoded port — port windows 11430-11440 for Ollama and 1230-1240 for LM Studio with a cached positive result — so a server moved off its default port is still diagnosed rather than reported as absent",
      "Diagnostic history is kept in SQLite for trend queries, and a Windows launcher drives the whole toolchain into the WSL2 project where the GPU, the containers and the model caches actually live",
    ],
    stack: ["Python", "FastAPI", "SSE / WebSocket", "Docker SDK", "vLLM", "Ollama", "LM Studio", "HuggingFace", "CUDA", "SQLite", "pytest"],
    icon: <Stethoscope />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  },
  {
    number: "13", category: "SOFTWARE & AUTOMATION", title: "Software Development & Automation",
    description: "Cross-platform utilities, desktop applications, web automation and AI-assisted scripts developed across Python, Flask, Electron, React and Kivy.",
    facts: ["Desktop & cross-platform utilities", "Browser automation", "Testing and debugging workflows"],
    stack: ["Python", "Flask", "Electron", "React", "Playwright", "Selenium"],
    icon: <Code2 />,
    link: "https://github.com/Deyan86", linkLabel: "Repository link pending publication",
  }
];

const skills = [
  { title: "AI & ML Systems", items: ["LLM evaluation", "RAG", "LangChain", "LangGraph", "vLLM", "Ollama", "PyTorch", "TensorFlow"] },
  { title: "GPU & Systems", items: ["C / C++", "CUDA", "NVIDIA Blackwell", "MoE offloading", "Quantization", "NVMe streaming"] },
  { title: "Cloud-Native & DevOps", items: ["Kubernetes", "K3s", "Docker", "Terraform", "ArgoCD", "Jenkins", "Helm", "GitOps"] },
  { title: "Infrastructure & Operations", items: ["NetApp ONTAP", "Nutanix", "Veritas NetBackup", "VMware", "Proxmox", "Linux", "SAN / NAS"] },
  { title: "Observability & Security", items: ["Prometheus", "Grafana", "Netdata", "Wazuh", "Falco", "Velero"] },
  { title: "Programming & Automation", items: ["Python", "Bash", "PowerShell", "JavaScript", "React", "Flask", "Playwright", "Selenium"] }
];

const experience = [
  { role: "ServiceNow Solution Consultant", company: "Bright / Virtusa", period: "Nov 2025 – Feb 2026", detail: "ITSM and business-process application configuration, API integrations, troubleshooting and technical documentation." },
  { role: "Storage Support Engineer L2", company: "Lenovo", period: "Feb 2022 – Sep 2025", detail: "Enterprise storage, SAN/NAS, NetApp ONTAP, SANtricity, Nutanix HCI, server hardware and Linux / Windows / VMware environments." },
  { role: "Advanced Technical Support Engineer L2", company: "Veritas / Sutherland", period: "Sep 2018 – Feb 2022", detail: "NetBackup appliance architecture, data protection, replication, deduplication, recovery, automation and enterprise application integrations." },
  { role: "IT Support Specialist", company: "C3i", period: "Aug 2016 – Sep 2018", detail: "Enterprise user support, Active Directory, Exchange Online, networking, Citrix, VPN and SAP systems." },
  { role: "End-User Support Specialist", company: "Sutherland", period: "Aug 2014 – Jul 2016", detail: "L1/L2 endpoint support for McAfee security products across Windows and macOS." }
];

function SectionTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{note && <p>{note}</p>}</div>;
}

export default function Home() {
  return (
    <main>
      <Topbar />

      <section className="hero" id="home">
        <div className="hero-grid"/>
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"/> BUILD · AUTOMATE · INNOVATE</div>
          <h1>Deyan <em>Peshev</em></h1>
          <h2>AI Infrastructure &<br/>Cloud-Native Engineer</h2>
          <p className="hero-lead">AI Systems <i/> GPU Engineering <i/> DevOps <i/> Distributed Infrastructure</p>
          <p className="hero-text">11+ years of enterprise IT experience across storage, data protection, virtualization and cloud infrastructure — combined with hands-on R&amp;D in GPU-accelerated inference, local LLM evaluation and cloud-native automation.</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore projects <ArrowRight size={17}/></a>
            <a className="button secondary" href={github} target="_blank" rel="noreferrer"><Github size={17}/> View GitHub</a>
          </div>
          <div className="socials"><a href={github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github/></a><a href={linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin/></a><a href={email} aria-label="Email"><Mail/></a></div>
        </div>
        <div className="hero-art" aria-label="Abstract AI infrastructure illustration">
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="server-hall">
            {[0,1,2,3,4].map(n => <div className="server-rack" key={n}><span/><span/><span/><span/><b/></div>)}
          </div>
          <div className="floating-panel"><span>ENGINEERING</span><strong>Intelligent<br/>Infrastructure</strong><i/></div>
          <div className="hero-caption"><Activity size={15}/> SYSTEMS · SCALE · RELIABILITY</div>
        </div>
        <div className="hero-bottom"><span>SOFIA, BULGARIA</span><span>OPEN TO INTERNATIONAL OPPORTUNITIES</span><a href="#about">SCROLL TO EXPLORE <ChevronDown size={14}/></a></div>
      </section>

      <section className="focus-strip">
        <div className="focus-card"><BrainCircuit/><b>AI Engineering</b><span>LLMs · RAG · Evaluation</span></div>
        <div className="focus-card"><Cpu/><b>GPU Engineering</b><span>CUDA · Inference · Quantization</span></div>
        <div className="focus-card"><Cloud/><b>Cloud-Native</b><span>Kubernetes · Storage · GitOps</span></div>
        <div className="focus-card"><Workflow/><b>DevOps / MLOps</b><span>CI/CD · Automation · Observability</span></div>
      </section>

      <section className="section" id="about">
        <SectionTitle eyebrow="01 / PROFILE" title="Engineering across infrastructure and AI" note="Combining enterprise reliability with hands-on experimentation in modern AI systems."/>
        <div className="about-grid">
          <div className="about-copy"><p className="large-copy">I build, operate and troubleshoot systems where infrastructure, automation and intelligent software meet.</p><p>My background spans more than a decade of enterprise IT operations, including storage platforms, data protection, virtualization and technical support. Alongside that foundation, I work on GPU inference, local LLM benchmarking, Kubernetes environments and agent-based automation.</p><p>I value measurable results, clear technical documentation and systems that can be reproduced, monitored and improved.</p><a className="text-link" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16}/></a></div>
          <div className="metrics">
            <div className="metric"><strong>11+</strong><span>Years enterprise IT experience</span></div>
            <div className="metric"><strong>{headline.models}</strong><span>Models with a recorded result</span></div>
            <div className="metric"><strong>{headline.assertions.toLocaleString("en-US")}</strong><span>Scored assertions, {headline.runs} runs</span></div>
            <div className="metric"><strong>{headline.categories}</strong><span>Weighted capability categories</span></div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <SectionTitle eyebrow="02 / SELECTED WORK" title="Featured engineering projects" note="Selected work described in the current CV. Repository-specific links and live demos can be added after the public project URLs are verified."/>
        <div className="project-grid">
          {projects.map(p => <article className="project-card" key={p.number}>
            <div className="project-top"><span>{p.number} / {p.category}</span><div className="project-icon">{p.icon}</div></div>
            <h3>{p.title}</h3><p>{p.description}</p>
            <ul className="fact-list">{p.facts.map(f => <li key={f}>{f}</li>)}</ul>
            <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
            <a className="project-link" href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{p.linkLabel} <ArrowUpRight size={15}/></a>
          </article>)}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <SectionTitle eyebrow="03 / CAREER" title="Enterprise experience" note="A track record across enterprise infrastructure, data protection, storage and technical operations."/>
        <div className="timeline">{experience.map((e, i) => <div className="timeline-item" key={e.company + e.role}><div className="timeline-dot">{String(i+1).padStart(2,"0")}</div><div className="timeline-main"><div className="timeline-head"><div><h3>{e.role}</h3><b>{e.company}</b></div><span>{e.period}</span></div><p>{e.detail}</p></div></div>)}</div>
      </section>

      <section className="section skills-section" id="skills">
        <SectionTitle eyebrow="04 / TOOLKIT" title="Technical skills" note="A focused overview of technologies and platforms listed in the current CV."/>
        <div className="skills-grid">{skills.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div className="tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section className="section credentials">
        <SectionTitle eyebrow="05 / CREDENTIALS" title="Certifications & education"/>
        <div className="credential-grid">
          <div className="credential"><span>2025</span><div><h3>EITCA/AI Artificial Intelligence Academy</h3><p>EITCI Institute · 12-module academy</p></div></div>
          <div className="credential"><span>2025</span><div><h3>Nutanix Certified Professional – Cloud Integration 6</h3><p>Nutanix University</p></div></div>
          <div className="credential"><span>2024</span><div><h3>Nutanix Certified Professional – Multicloud Infrastructure 6</h3><p>Nutanix University</p></div></div>
          <div className="credential"><span>2022</span><div><h3>NetApp ONTAP Data Protection Administration</h3><p>NetApp University</p></div></div>
          <div className="credential"><span>2020</span><div><h3>LPIC-101 Linux Essentials</h3><p>New Bulgarian University</p></div></div>
          <div className="credential"><span>EDU</span><div><h3>University of Barcelona</h3><p>Bachillerato · Spanish Language and Literature</p></div></div>
        </div>
        <a className="text-link" href="https://www.credly.com/users/deyan-peshev.ad9af36a" target="_blank" rel="noreferrer">View verified Credly credentials <ArrowUpRight size={16}/></a>
      </section>

      <section className="section github-section" id="github">
        <div className="github-panel"><div><span className="eyebrow">06 / OPEN SOURCE</span><h2>Explore the code.<br/><em>Inspect the engineering.</em></h2><p>Browse my GitHub profile for repositories, source code and ongoing technical work. Project-specific repository links will be added here once the matching public repositories are confirmed.</p><a className="button primary" href={github} target="_blank" rel="noreferrer"><Github size={17}/> Visit GitHub <ArrowUpRight size={16}/></a></div><div className="github-graphic"><div className="code-window"><div className="window-dots"><i/><i/><i/></div><code><span>const</span> engineer = {"{"}<br/>&nbsp; focus: <b>"AI infrastructure"</b>,<br/>&nbsp; systems: [<b>"GPU"</b>, <b>"Kubernetes"</b>],<br/>&nbsp; mindset: <b>"measure & improve"</b><br/>{"}"};</code></div><Network className="network-icon"/></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="contact-glow"/><span className="eyebrow">07 / GET IN TOUCH</span><h2>Let's build something<br/><em>meaningful.</em></h2><p>Open to relevant opportunities in AI infrastructure, cloud-native engineering, platform engineering and DevOps.</p><div className="contact-actions"><a className="button primary" href={email}><Mail size={17}/> Send an email <ArrowUpRight size={16}/></a><a className="button secondary" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div><div className="contact-meta"><span>Sofia, Bulgaria</span><span>English C1 · Spanish C2 · Bulgarian Native</span><span>+359 894 090 560</span></div></section>

      <footer><a className="brand" href="#home"><span className="brand-mark">DP</span><span><b>Deyan Peshev</b><small>AI INFRASTRUCTURE & CLOUD-NATIVE ENGINEER</small></span></a><span>© {new Date().getFullYear()} Deyan Peshev · Built with Next.js</span><a href="#home">Back to top ↑</a></footer>
    </main>
  );
}
