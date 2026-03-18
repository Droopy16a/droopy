import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBolt,
  faCode,
  faCodeBranch,
  faCubes,
  faCube,
  faDatabase,
  faFileCode,
  faLayerGroup,
  faServer,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Box from "./Box";

const STATIC_TEXT = "Hi there,";
const WORDS = [[" I'm ", "Droopy !"], [" ", "welcome !"]];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "Python", icon: faTerminal, color: "text-emerald-400" },
  { name: "HTML/CSS", icon: faFileCode, color: "text-orange-400" },
  { name: "JS", icon: faBolt, color: "text-yellow-400" },
  { name: "SQL", icon: faDatabase, color: "text-cyan-400" },
  { name: "TypeScript", icon: faCode, color: "text-blue-400" },
  { name: "React", icon: faAtom, color: "text-sky-400" },
  { name: "Git", icon: faCodeBranch, color: "text-red-400" },
  { name: "C", icon: faCube, color: "text-indigo-400" },
  { name: "Next.js", icon: faLayerGroup, color: "text-white" },
  { name: "Node.js", icon: faServer, color: "text-lime-400" },
  { name: "CamL", icon: faCubes, color: "text-fuchsia-400" },
];

const PROJECTS = [
  {
    name: "Tradyrace",
    category: "Web Apps",
    description:
      "Trading-focused web app with interactive market visuals, auth flows, and production deployment.",
    stack: ["Next.js", "React 19", "D3.js", "MUI", "Neon DB"],
    status: "Live",
    year: "2026",
    updated: "Feb 2026",
    gradient: "from-blue-500/30 via-cyan-400/20 to-indigo-600/30",
    links: {
      code: "https://github.com/Droopy16a/Tradyrace",
      demo: "https://tradesarace.vercel.app",
    },
  },
  {
    name: "CVL Osilys",
    category: "Web Apps",
    description:
    "Interactive CVL platform for OSILYS (2024/25) to present poles, presidents, and activities in a card-based interface.",
    stack: ["React", "JavaScript", "CSS", "gh-pages"],
    status: "Live",
    year: "2025",
    updated: "Jul 2025",
    gradient: "from-emerald-500/30 via-teal-400/20 to-blue-600/30",
    links: {
      code: "https://github.com/Droopy16a/CVL",
      demo: "https://droopy16a.github.io/CVL/",
    },
  },
  {
    name: "LSTM-CryptoForecast",
    category: "AI/ML",
    description:
    "Python desktop app for crypto forecasting using TensorFlow LSTM with PyQt6 live visualizations.",
    stack: ["Python", "TensorFlow", "PyQt6", "Pandas", "scikit-learn"],
    status: "Source",
    year: "2025",
    updated: "Jul 2025",
    gradient: "from-violet-500/25 via-sky-500/20 to-blue-600/25",
    links: {
      code: "https://github.com/Droopy16a/LSTM-CryptoForecast",
      demo: null,
    },
  },
  {
    name: "Minigame",
    category: "Web Apps",
    description:
      "Mini-game project combining Next.js with Three.js rendering and QR code generation features.",
    stack: ["Next.js", "TypeScript", "Three.js", "QRCode"],
    status: "In progress",
    year: "2026",
    updated: "Feb 2026",
    gradient: "from-sky-500/30 via-blue-400/20 to-cyan-600/30",
    links: {
      code: "https://github.com/Droopy16a/minigame",
      demo: "https://jeumobile.vercel.app",
    },
  },
];

const PROJECT_FILTERS = ["All", "Web Apps", "Automation", "AI/ML"];

function Main() {
  const [text, setText] = useState(["", ""]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let timeout;
    const typingSpeed = 100;
    const deletingSpeed = 30;
    const currentWord = WORDS[wordIndex];

    const fullText = currentWord[0] + currentWord[1];

    if (!isDeleting) {
      if (charIndex < fullText.length) {
        const nextCharIndex = charIndex + 1;
        const combined = fullText.substring(0, nextCharIndex);
        setText([
          combined.substring(0, currentWord[0].length),
          combined.substring(currentWord[0].length),
        ]);
        timeout = setTimeout(() => setCharIndex(nextCharIndex), typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 3000);
      }
    } else {
      if (charIndex > 0) {
        const nextCharIndex = charIndex - 1;
        const combined = fullText.substring(0, nextCharIndex);
        setText([
          combined.substring(0, currentWord[0].length),
          combined.substring(currentWord[0].length),
        ]);
        timeout = setTimeout(() => setCharIndex(nextCharIndex), deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("is-visible")) {
            entry.target.classList.add("is-visible", "animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeFilter]);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  const currentYear = new Date().getFullYear();

  const SectionHeader = ({ subtitle, title }) => (
    <div className="reveal mb-10 sm:mb-12 text-center md:text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium uppercase tracking-wider mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        {subtitle}
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-blue-500/30 selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="#" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                D
              </div>
              Droopy
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            <a
              href="#contact"
              className="ml-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Let's Talk
            </a>
            </nav>
          </div>
        </header>

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center max-w-4xl mx-auto mb-20 sm:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Available for new projects
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-up animate-delay-100">
              {STATIC_TEXT}
              {text[0]}
              <span className="text-blue-400 relative inline-block">
                {text[1]}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500/50 rounded-full blur-sm"></span>
              </span>
              <span className="text-blue-400 animate-pulse ml-1">|</span>
            </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-200">
            I build performant digital products with modern full-stack tooling. 
            Focusing on clear UX, maintainable code, and shipping meaningful features.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-up animate-delay-300">
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                About Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                View Projects
              </a>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-20 animate-fade-up animate-delay-300">
                <Box
                  title="5 years"
                  desc="5+ years building sleek, responsive apps and solving real-world problems."
                  color="indigo"
                  icon="faClock"
                />
                <Box
                  title="7 languages"
                  desc="Proficient in 7 languages/frameworks for fast, full-stack development."
                  color="purple"
                  icon="faCode"
                />
                <Box
                  title="100%"
                  desc="Strong delivery quality and long-term maintainability focus."
                  color="blue"
                />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-28 scroll-mt-20">
          <SectionHeader subtitle="About" title="Crafting digital experiences." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <article className="reveal rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I work across frontend, backend, and automation to deliver products that are fast, clear, and production-ready. My workflow is simple: understand the goal, cut unnecessary complexity, and ship stable iterations.
                </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                I enjoy combining animation, performance, and clean architecture so each release feels polished to users and maintainable for teams.
                </p>
              </article>

            <div className="grid grid-cols-1 gap-4">
              <div className="reveal delay-100 rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">01.</span> Focus
                </h3>
                <p className="text-slate-400">
                  Product-minded engineering with practical performance improvements.
                </p>
              </div>
              <div className="reveal delay-200 rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">02.</span> Workflow
                </h3>
                <p className="text-slate-400">
                  Clear specs, iterative delivery, and measurable outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 sm:py-28 scroll-mt-20 border-t border-white/5">
          <SectionHeader subtitle="Skills" title="The tech stack." />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {SKILLS.map((skill, index) => (
              <div
                key={skill.name}
                className="group reveal relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <div className={`text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${skill.color}`}>
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <h3 className="font-medium text-slate-200">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 sm:py-28 scroll-mt-20 border-t border-white/5">
          <SectionHeader subtitle="Portfolio" title="Selected works." />
          
          <div className="flex justify-center mb-12 reveal">
            <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10">
                {PROJECT_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
              <a 
                key={`${activeFilter}-${project.name}`}
                href={project.links.demo || project.links.code}
                target="_blank"
                rel="noreferrer"
                className="group reveal flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
                style={{ "--reveal-delay": `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-medium text-blue-400 mb-1">{project.category}</div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5`}>
                      {project.status}
                    </span>
                    </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                    </div>
                </a>
              ))}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 sm:py-28 border-t border-white/5 scroll-mt-20">
          <div className="reveal max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to ship something <span className="text-blue-400">great</span>?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Always open to freelance collaborations and technically challenging projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Droopy16a"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all duration-300"
              >
                GitHub Profile
              </a>
              <a
                href="mailto:droopya.dev@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Email Me
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
          <p>&copy; {currentYear} Droopy.</p>
        </footer>
      </main>
    </div>
  );
}

export default Main;
