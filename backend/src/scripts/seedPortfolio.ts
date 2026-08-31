import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import Certification from '../models/Certification';
import connectDB from '../config/db';

dotenv.config();

const projectsData = [
  {
    title: "Threat Intelligence Correlation Engine (TICE)",
    category: "Software Engineering",
    technologies: ["Python", "FastAPI", "httpx", "Pydantic", "asyncio", "React", "REST API"],
    description: "An automated OSINT threat intelligence engine that concurrently queries multiple APIs (e.g., VirusTotal, AbuseIPDB) to normalize fragmented JSON responses and compute unified risk scores using a weighted scoring algorithm.",
    features: [
      "Built a high-performance asynchronous REST API handling concurrent I/O-bound tasks.",
      "Developed an automated engine that queries multiple OSINT threat intelligence APIs.",
      "Normalized fragmented JSON responses to compute unified risk scores using a weighted scoring algorithm."
    ],
    image: "/projects/tice.jpg"
  },
  {
    title: "CHAIN IQ",
    category: "Software Engineering",
    technologies: ["Apache Kafka", "Flink", "Gemini 1.5", "Neo4j AuraDB", "FastAPI", "Redis", "React.js", "GCP"],
    description: "A self-healing autonomous supply chain 'immune system' that processes global signals in real-time.",
    features: [
      "Engineered a real-time data processing and ingestion pipeline for global signals.",
      "Developed a secure dashboard protected by JWT and RBAC.",
      "Delivered an 'immune system' for supply chains that reduced damage by 82% during testing."
    ],
    image: "/projects/chain_iq.jpg"
  },
  {
    title: "SkillCraft Technology Tasks (Data Science Internship)",
    category: "Data Science",
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "Matplotlib/Seaborn", "Jupyter Notebook"],
    description: "Completed practical data science implementation tasks involving building models and performing in-depth analysis.",
    features: [
      "Built a Machine Learning-driven traffic threat detection pipeline.",
      "Performed in-depth Exploratory Data Analysis (EDA) on traffic accident datasets.",
      "Visualized patterns and risk factors to extract actionable insights."
    ],
    image: "/projects/skillcraft.jpg"
  },
  {
    title: "Civic Shield",
    category: "Software Engineering",
    technologies: ["Python", "React", "REST APIs", "Git/GitHub"],
    description: "A community-focused security platform designed to track, analyze, and report local incidents or public infrastructure threats to enhance public safety monitoring.",
    features: [
      "Developed a community-focused security platform.",
      "Tracked, analyzed, and reported local incidents and threats.",
      "Enhanced public safety monitoring through structured reporting."
    ],
    image: "/projects/civic_shield.jpg"
  },
  {
    title: "Multi-Cloud Recovery System",
    category: "Software Engineering",
    technologies: ["Python", "Cloud Infrastructure APIs", "Automation Scripts", "Redis"],
    description: "Engineered an automated resilience and failover prototype to ensure high availability and data integrity across distributed multi-cloud environments.",
    features: [
      "Engineered an automated resilience and failover prototype.",
      "Ensured high availability across distributed multi-cloud environments.",
      "Maintained data integrity using Redis and Cloud Infrastructure APIs."
    ],
    image: "/projects/multicloud.jpg"
  },
  {
    title: "FitMind: Fitness Tracker Website",
    category: "Web Development",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    description: "Designed an interactive fitness tracking web application enabling users to log workouts, monitor health metrics, and visualize daily progress with a sleek, responsive user interface.",
    features: [
      "Designed an interactive fitness tracking web application.",
      "Enabled users to log workouts and monitor health metrics.",
      "Visualized daily progress with a sleek, responsive user interface."
    ],
    image: "/projects/fitmind.jpg"
  },
  {
    title: "GadgetCart: IoT Marketplace",
    category: "Web Development",
    technologies: ["Full-Stack Web Technologies", "REST APIs", "Database Management"],
    description: "Built a specialized e-commerce platform catered toward IoT devices and smart gadgets, featuring product filtering, secure cart management, and streamlined user checkout flows.",
    features: [
      "Built a specialized e-commerce platform catered toward IoT devices.",
      "Implemented product filtering and secure cart management.",
      "Created streamlined user checkout flows."
    ],
    image: "/projects/gadgetcart.jpg"
  }
];

const certificationsData = [
  { 
    name: "Apply AI", 
    issuer: "Cisco Networking Academy", 
    iconType: "Cpu",
    colorClass: "from-blue-500/20 to-cyan-500/20",
    borderClass: "border-blue-500/50",
    textGlowClass: "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]",
    description: "Practical automation and LLM implementation for professional workflows." 
  },
  { 
    name: "Claude / AI Fluency: Framework", 
    issuer: "Anthropic AI", 
    iconType: "BrainCircuit",
    colorClass: "from-amber-500/20 to-orange-500/20",
    borderClass: "border-amber-500/50",
    textGlowClass: "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    description: "Prompt engineering, model alignment, and AI safety frameworks." 
  },
  { 
    name: "Claude Code in Action", 
    issuer: "Anthropic AI", 
    iconType: "Code",
    colorClass: "from-purple-500/20 to-fuchsia-500/20",
    borderClass: "border-purple-500/50",
    textGlowClass: "text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]",
    description: "Integrating Claude's API into software workflows and rapid app development." 
  },
  { 
    name: "DBMS Part 2 Certification", 
    issuer: "Infosys", 
    iconType: "Database",
    colorClass: "from-emerald-500/20 to-green-500/20",
    borderClass: "border-emerald-500/50",
    textGlowClass: "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]",
    description: "Advanced implementation of ACID properties, concurrency control, and transaction management." 
  },
  { 
    name: "Agentic AI", 
    issuer: "Udemy (opencode)", 
    iconType: "ShieldCheck",
    colorClass: "from-rose-500/20 to-pink-500/20",
    borderClass: "border-rose-500/50",
    textGlowClass: "text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]",
    description: "Building your free AI workspace and mastering intelligent autonomy." 
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to DB...');
    
    await Project.deleteMany();
    await Certification.deleteMany();
    console.log('Cleared existing data...');

    await Project.insertMany(projectsData);
    console.log('Projects imported!');

    await Certification.insertMany(certificationsData);
    console.log('Certifications imported!');

    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedDB();
