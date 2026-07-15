import { World, Question, CinematicStep } from "./types";

export const WORLDS: World[] = [
  {
    id: "world-1",
    title: "CIVIC INTELLIGENCE",
    subtitle: "PunjabOS Governance Platform",
    color: "blue",
    nebulaColor: "rgba(58, 134, 255, 0.4)",
    challenge: "Public-sector information traditionally existed in highly fragmented, rigid operational silos. Regional leaders and administrative heads lacked immediate real-time visibility into local needs. Consequently, decision-making was reactive, response cycles for citizen complaints were lengthy, and resource allocation was poorly aligned with emerging community priorities.",
    thinking: [
      "Signal: Immediate intake of citizen complaints and requests through localized nodes.",
      "Analysis: Automated classification, sentiment auditing, and priority weighting.",
      "Governance Design: Translation of digital signals into structural performance metrics.",
      "System Architecture: High-volume secure API integrations and real-time regional data pipelines.",
      "Decision Intelligence: Providing direct executive control and transparency to administrative leads."
    ],
    system: {
      name: "PunjabOS Civic Intelligence Engine",
      description: "An advanced, full-stack AI governance platform built to centralize civic telemetry, model departmental response efficiency, and map regional resources against actual human requests.",
      architecture: [
        "Regional Telemetry Nodes: Ingestion of live public data streams, local forum requests, and municipal performance feeds.",
        "Ingress Parsing Pipeline: AI-driven language processing and geo-tagging schemas to index complex requests.",
        "Administrative Console: Unified commander view displaying live resource deployment, regional satisfaction curves, and predictive hot-spot models."
      ],
      pipelines: [
        "Live Complaint Router: Dynamically parses unstructured request texts, extracts metadata, and forwards to the responsible officer.",
        "Department SLA Auditor: Logs resolution timeline milestones, triggering escalations when benchmarks are breached."
      ],
      features: [
        "Interactive District Telemetry Map",
        "Predictive Resource Allocation Models",
        "Real-Time Executive Performance Dashboards",
        "Automated Multi-Channel Notification Dispatcher"
      ]
    },
    impact: {
      metrics: [
        { label: "Citizens Engaged", value: "10M+" },
        { label: "SLA Response Acceleration", value: "4.2x Faster" },
        { label: "Issue Resolution Rate", value: "94.2%" },
        { label: "Departmental Efficiency Gains", value: "+38%" }
      ],
      evidence: [
        "Unified public administration dashboard serving state and local governance heads.",
        "Pioneered secure API architecture linking 18+ independent civil departments.",
        "Dramatically reduced decision latency by establishing a direct feedback loop between citizens and state officials."
      ]
    }
  },
  {
    id: "world-2",
    title: "FINANCE INTELLIGENCE",
    subtitle: "High-Fidelity Strategic Modeling",
    color: "gold",
    nebulaColor: "rgba(212, 175, 55, 0.4)",
    challenge: "In high-stakes corporate environment, capital allocation was frequently based on static historical reviews rather than forward-looking, multi-variable strategic simulations. Under rapid macroeconomic shifts, traditional spreadsheet-based forecasting models became obsolete almost instantly, increasing corporate exposure to capital inefficiencies.",
    thinking: [
      "Data: Aggregating multi-source operational metrics and external market trends.",
      "Model: Developing dynamic multi-scenario financial forecasts and sensitivity models.",
      "Insight: Identifying cash flow drivers, capital thresholds, and yield optimizations.",
      "Decision: Allocating strategic funds with precision based on probabilistic outcome models.",
      "Outcome: Mitigating capital waste, securing margins, and capturing high-growth opportunities."
    ],
    system: {
      name: "Dynamic Financial Forecaster & Capital Planner",
      description: "A continuous, high-fidelity forecasting and scenario simulation system designed to model corporate performance, optimize capital structure, and inform executive investment decisions under intense market volatility.",
      architecture: [
        "Scenario Generator Core: Models standard, bullish, and bearish conditions under 15+ volatile parameters (inflation, cost-of-goods, interest rates, churn).",
        "Capital Simulation Layer: Uses statistical engines to run cash-flow stress testing and liquidity metrics.",
        "Executive Strategy Board: High-impact visualization of capital options and ROI projections."
      ],
      pipelines: [
        "Automatic ERP Sync: Integrates operational cost metrics to refresh model baselines continuously.",
        "Venture Model Validator: Computes internal rates of return (IRR) and net present value (NPV) for active corporate expansion routes."
      ],
      features: [
        "Dynamic Multi-Scenario Sensitivity Models",
        "Automated Cash Flow Stress-Tester",
        "Strategic Valuation and NPV Calculators",
        "Executive-Ready Capital Allocation Boards"
      ]
    },
    impact: {
      metrics: [
        { label: "Strategic Decisions Influenced", value: "$10M+" },
        { label: "Decision Latency Reduction", value: "30%" },
        { label: "Forecast Accuracy Rate", value: "97.8%" },
        { label: "Capital Waste Eliminated", value: "$1.2M+" }
      ],
      evidence: [
        "Designed and deployed strategic corporate models utilized by C-suite executives to model $10M+ allocation.",
        "Built dynamic forecasting frameworks that saved over 120 hours of manual financial assembly annually.",
        "Developed custom FP&A models that accurately predicted mid-quarter revenue shifts with 97.8% confidence."
      ]
    }
  },
  {
    id: "world-3",
    title: "AI INTELLIGENCE",
    subtitle: "Agentic Systems & Neural Decision Support",
    color: "purple",
    nebulaColor: "rgba(131, 56, 236, 0.4)",
    challenge: "Organizations are flooded with unstructured data, yet struggle to turn this information into action. Conventional business intelligence platforms only report historic metrics, failing to proactively identify operational friction points or orchestrate autonomous remedial workflows.",
    thinking: [
      "Business Problem: Slow manual data triage and slow operational execution loops.",
      "Data Infrastructure: Unified vector indexing and multi-system API connectors.",
      "Analytics: Machine learning classification, key entity extraction, and anomaly audits.",
      "AI Layer: Deploying agentic models capable of multi-step analysis and logical reasoning.",
      "Human Judgment: Providing clean explanations to let human leaders confirm actions.",
      "Decision & Impact: Instant execution of high-confidence automated strategies."
    ],
    system: {
      name: "Agentic Decision Support Engine",
      description: "An advanced, agent-driven platform designed to orchestrate complex corporate workflows, extract deep textual insights, and deliver natural language interfaces to corporate data.",
      architecture: [
        "Agentic Orchestrator: Directs task-specific agents to validate parameters, check guidelines, and call tools.",
        "Neural Search Lattice: RAG (Retrieval-Augmented Generation) infrastructure over institutional wisdom and operating procedures.",
        "Security Guardrails: Strictly audits system requests and boundaries to guarantee data integrity."
      ],
      pipelines: [
        "Semantic Triage Pipeline: Translates incoming support requests or data logs into structured action plans.",
        "Anomaly Feedback Loop: Detects outliers in performance streams and suggests automatic corrections."
      ],
      features: [
        "Multi-Agent Workflow Orchestration",
        "Semantic Vector Search Engines",
        "Real-Time Smart Exception Alerts",
        "Natural Language Data Queries"
      ]
    },
    impact: {
      metrics: [
        { label: "Data Triage Speed", value: "10x Faster" },
        { label: "Agent Success Rate", value: "92.5%" },
        { label: "Manual Overhead Reduced", value: "65%" },
        { label: "AI Grounded Confidence", value: "99.4%" }
      ],
      evidence: [
        "Built agentic solutions capable of resolving complex document analyses in seconds instead of hours.",
        "Formulated standard architectures that marry large language models with structured database environments securely.",
        "Ensured zero-leakage security boundaries for enterprise data access."
      ]
    }
  },
  {
    id: "world-4",
    title: "STRATEGIC GROWTH",
    subtitle: "Ecosystem Expansion & Partnerships",
    color: "crimson",
    nebulaColor: "rgba(239, 68, 68, 0.4)",
    challenge: "Sustaining high-velocity revenue growth requires more than traditional product iteration. Organizations often hit a scaling wall because they fail to design collaborative partner programs, tap into regional ecosystems, or deploy programmatic retention models.",
    thinking: [
      "Discovery: Identifying strategic partner alignments and unmapped market expansion avenues.",
      "Engineering: Building repeatable, value-aligned commercial systems and programmatic benefits.",
      "Activation: Initiating high-impact partner alliances and joint-marketing motions.",
      "Retention: Leveraging analytical user churn indicators to pre-emptively defend market share.",
      "Ecosystem Scaling: Creating compounding positive feedback loops that secure long-term leadership."
    ],
    system: {
      name: "Partner Ecosystem and Retention Core",
      description: "A comprehensive strategic growth framework combining data-driven churn prediction with programmatic enterprise partner strategies to unlock new revenue channels and defend core metrics.",
      architecture: [
        "Ecosystem Engine: Measures value alignment and automates co-selling tracking across partner portfolios.",
        "Churn Defense Console: Integrates user telemetry to surface high-risk customer segments.",
        "Strategic Expansion Matrix: Maps geographic and industrial growth sectors with high-density returns."
      ],
      pipelines: [
        "Partner Attribution Pipeline: Attributes and calculates strategic partner-referred revenues and royalty allocations.",
        "Pre-emptive Retention Trigger: Flags drops in account engagement and prompts account leads with customized retention offerings."
      ],
      features: [
        "Programmatic Churn Analysis Boards",
        "Attributed Partner Revenue Trackers",
        "Market Sizing & Opportunity Matrix",
        "Customer Lifetime Value Predictor"
      ]
    },
    impact: {
      metrics: [
        { label: "Partner Revenue Unlocked", value: "$7M+" },
        { label: "Customer Churn Reduced", value: "-15%" },
        { label: "Active Alliances Sealed", value: "24+" },
        { label: "SDR Pipeline Velocity", value: "+45%" }
      ],
      evidence: [
        "Engineered growth programs that unlocked over $7 million in co-sell enterprise revenue.",
        "Designed and implemented quantitative churn models that retained multi-million dollar contracts.",
        "Forged key partnerships across technology and professional sectors, establishing Jaspinder as an ecosystem strategist."
      ]
    }
  },
  {
    id: "world-5",
    title: "HUMAN IMPACT",
    subtitle: "Civic Leadership & Community Empowerment",
    color: "green",
    nebulaColor: "rgba(16, 185, 129, 0.4)",
    challenge: "Technology and capital are powerful accelerators, but they often fail to create lasting value because organizations forget the human core. True transformation demands community-focused leadership, accessible technological literacy, and continuous mentorship structures.",
    thinking: [
      "Sponsorship: Creating professional spaces where future leaders can connect, collaborate, and grow.",
      "Education: Designing practical workshops that de-mystify complex technological topics like AI and finance.",
      "Mentorship: Nurturing individual talents to bridge the gap between academic theory and strategic execution.",
      "Community Building: Organizing high-impact forums that address societal issues and drive public-sector innovations."
    ],
    system: {
      name: "Community Leadership and Technical Literacy Engine",
      description: "A systemic, human-first outreach and leadership structure designed to deliver state-of-the-art technological literacy workshops, host elite professional gatherings, and offer direct career mentorship paths.",
      architecture: [
        "Literacy Workshop Framework: Interactive modules designed to introduce AI engineering, data structures, and financial principles to non-technical professionals.",
        "Alumni Network Lattice: Dedicated connection system linking thousands of high-potential alumni across sectors.",
        "Active Mentorship Circles: One-on-one and small group advisory cohorts designed to raise leadership standards."
      ],
      pipelines: [
        "Workshop Feedback Loops: Captures learning telemetry to iterate and polish workshop curriculum materials dynamically.",
        "Opportunity Dispatch Core: Matches rising talents with open advisory roles or professional placements."
      ],
      features: [
        "Interactive AI Literacy Modules",
        "Professional Cohort Networking Systems",
        "Mentorship Progress Matrices",
        "Civic Tech Community Forum Hubs"
      ]
    },
    impact: {
      metrics: [
        { label: "Elite Gala Attendees", value: "500+" },
        { label: "AI Workshop Graduates", value: "300+" },
        { label: "One-on-One Mentees", value: "50+" },
        { label: "Community Events Hosted", value: "15+" }
      ],
      evidence: [
        "Organized and chaired the flagship Alumni Gala, hosting 500+ esteemed delegates, executives, and public figures.",
        "Conducted 10+ hands-on AI literacy workshops, empowering 300+ professionals to utilize advanced technology in their daily workflows.",
        "Continuously mentors dozens of next-generation female leaders, fostering diversity in technology and corporate strategy."
      ]
    }
  }
];

export const CONSTELLATION_QUESTIONS: Question[] = [
  {
    id: "q-1",
    text: "Can AI become a Chief Financial Officer?",
    answer: "An AI cannot hold the fiduciary, moral, and strategic responsibility of a CFO. However, agentic financial models serve as super-calculators—co-pilots that run infinite stress-tests and scenario planning in seconds, allowing the human CFO to focus purely on high-stakes strategy and trust.",
    x: 20,
    y: 35
  },
  {
    id: "q-2",
    text: "Why do organizations fail despite having massive volumes of data?",
    answer: "Most organizations treat data as historical reporting rather than active decision intelligence. Data fails when it is siloed, when models are static, and when insights do not translate directly into clear action pathways for leadership.",
    x: 45,
    y: 20
  },
  {
    id: "q-3",
    text: "How should modern governments make high-confidence decisions?",
    answer: "By building continuous feedback loops like PunjabOS. Governance must transition from quarterly retro reports to live district-level telemetry, enabling leaders to see citizens' demands immediately and route resources programmatically.",
    x: 75,
    y: 30
  },
  {
    id: "q-4",
    text: "Can strategic growth be engineered, or is it pure intuition?",
    answer: "Intuition sparks partnerships, but engineering sustains them. Programmatic scaling requires mapping value alignments, tracking co-sell attribution, and building analytical churn models to defend existing customer bases systematically.",
    x: 30,
    y: 70
  },
  {
    id: "q-5",
    text: "How can capital be allocated optimally under extreme macroeconomic uncertainty?",
    answer: "By abandoning static yearly plans. Financial modeling must become a continuous sensitivity engine, testing liquidity across dozens of parameters simultaneously, enabling organizations to stay agile and seize market openings.",
    x: 70,
    y: 75
  },
  {
    id: "q-6",
    text: "What is the true balance between technological power and human impact?",
    answer: "Technology is simply a multiplier. It creates options and expands speed. But without human leadership, empathy, and clear societal purpose, it builds empty systems. The absolute center of every system must always be community progress.",
    x: 52,
    y: 85
  }
];

export const CINEMATIC_STEPS: CinematicStep[] = [
  {
    id: 1,
    text: "Every transformation begins with a thought.",
    duration: 5000,
    animationType: "fade"
  },
  {
    id: 2,
    text: "Every system begins with a connection.",
    duration: 5000,
    animationType: "scale"
  },
  {
    id: 3,
    text: "Some people build reports.",
    duration: 3500,
    animationType: "pulse"
  },
  {
    id: 4,
    text: "Some people build dashboards.",
    duration: 3500,
    animationType: "pulse"
  },
  {
    id: 5,
    text: "Some people build models.",
    duration: 3500,
    animationType: "pulse"
  },
  {
    id: 6,
    text: "I BUILD SYSTEMS THAT HELP ORGANIZATIONS MAKE BETTER DECISIONS.",
    duration: 7000,
    animationType: "bigbang"
  },
  {
    id: 7,
    text: "Behold, the five forces of digital transformation...",
    duration: 5000,
    animationType: "fade"
  }
];
