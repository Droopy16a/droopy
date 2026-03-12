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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  // { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    name: "Python",
    icon: faTerminal,
    iconColor: "text-emerald-200",
    iconBg: "from-emerald-500/35 to-teal-500/25",
    cardHover:
      "hover:border-emerald-300/40 hover:shadow-[0_18px_34px_-24px_rgba(16,185,129,0.9)]",
  },
  {
    name: "HTML/CSS",
    icon: faFileCode,
    iconColor: "text-orange-200",
    iconBg: "from-orange-500/35 to-amber-500/25",
    cardHover:
      "hover:border-orange-300/40 hover:shadow-[0_18px_34px_-24px_rgba(249,115,22,0.9)]",
  },
  {
    name: "JS",
    icon: faBolt,
    iconColor: "text-yellow-200",
    iconBg: "from-yellow-400/35 to-amber-500/25",
    cardHover:
      "hover:border-yellow-300/40 hover:shadow-[0_18px_34px_-24px_rgba(250,204,21,0.9)]",
  },
  {
    name: "SQL",
    icon: faDatabase,
    iconColor: "text-cyan-200",
    iconBg: "from-cyan-500/35 to-sky-500/25",
    cardHover:
      "hover:border-cyan-300/40 hover:shadow-[0_18px_34px_-24px_rgba(6,182,212,0.9)]",
  },
  {
    name: "TypeScript",
    icon: faCode,
    iconColor: "text-blue-200",
    iconBg: "from-blue-500/35 to-indigo-500/25",
    cardHover:
      "hover:border-blue-300/40 hover:shadow-[0_18px_34px_-24px_rgba(59,130,246,0.9)]",
  },
  {
    name: "React",
    icon: faAtom,
    iconColor: "text-sky-200",
    iconBg: "from-sky-500/35 to-cyan-500/25",
    cardHover:
      "hover:border-sky-300/40 hover:shadow-[0_18px_34px_-24px_rgba(14,165,233,0.9)]",
  },
  {
    name: "Git",
    icon: faCodeBranch,
    iconColor: "text-red-200",
    iconBg: "from-red-500/35 to-rose-500/25",
    cardHover:
      "hover:border-red-300/40 hover:shadow-[0_18px_34px_-24px_rgba(239,68,68,0.9)]",
  },
  {
    name: "C",
    icon: faCube,
    iconColor: "text-indigo-200",
    iconBg: "from-indigo-500/35 to-violet-500/25",
    cardHover:
      "hover:border-indigo-300/40 hover:shadow-[0_18px_34px_-24px_rgba(99,102,241,0.9)]",
  },
  {
    name: "Next.js",
    icon: faLayerGroup,
    iconColor: "text-slate-100",
    iconBg: "from-slate-500/35 to-zinc-500/25",
    cardHover:
      "hover:border-slate-300/40 hover:shadow-[0_18px_34px_-24px_rgba(148,163,184,0.9)]",
  },
  {
    name: "Node.js",
    icon: faServer,
    iconColor: "text-lime-200",
    iconBg: "from-lime-500/35 to-green-500/25",
    cardHover:
      "hover:border-lime-300/40 hover:shadow-[0_18px_34px_-24px_rgba(132,204,22,0.9)]",
  },
  {
    name: "CamL",
    icon: faCubes,
    iconColor: "text-fuchsia-200",
    iconBg: "from-fuchsia-500/35 to-pink-500/25",
    cardHover:
      "hover:border-fuchsia-300/40 hover:shadow-[0_18px_34px_-24px_rgba(217,70,239,0.9)]",
  },
];

// const JOURNEY = [
//   {
//     title: "Web Product Development",
//     period: "2024 - Present",
//     detail:
//       "Designing and shipping modern web apps from prototype to deployment with a focus on useful UX.",
//   },
//   {
//     title: "AI and Automation Builds",
//     period: "2025 - Present",
//     detail:
//       "Building data-driven tools and forecasts with Python and TensorFlow for practical automation use cases.",
//   },
//   {
//     title: "Community Platforms",
//     period: "2025",
//     detail:
//       "Delivering interactive platforms for groups and organizations with clear structure and maintainable code.",
//   },
// ];

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
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
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

  return (
    <main id="home" className="relative min-h-[100dvh] overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb orb-one absolute top-[12%] right-[4%] w-56 h-56 sm:w-72 sm:h-72 md:top-1/4 md:right-1/4 md:w-96 md:h-96 bg-blue-500/20 rounded-full"></div>
        <div className="floating-orb orb-two absolute bottom-[8%] left-[2%] w-56 h-56 sm:w-72 sm:h-72 md:bottom-1/4 md:left-1/4 md:w-96 md:h-96 bg-slate-500/20 rounded-full"></div>
        <div className="floating-orb orb-three absolute top-[38%] left-[35%] w-44 h-44 sm:w-56 sm:h-56 bg-cyan-500/15 rounded-full"></div>
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="#home" className="brand-font text-lg sm:text-xl text-white tracking-tight">
              Droopy
            </a>

            <nav className="hidden md:flex items-center gap-5 text-sm">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-300 hover:text-blue-200 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg border border-blue-400/35 bg-blue-500/10 text-xs sm:text-sm text-blue-100 hover:border-blue-300/55 hover:bg-blue-500/20 transition-all"
            >
              Work with me
            </a>
          </div>
        </header>

        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full">
            <h1 className="animate-fade-up text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-5 sm:mb-8 text-white leading-[1.15] transition-all duration-700 delay-100 opacity-100 translate-y-0 break-words">
              {STATIC_TEXT}
              {text[0]}
              <span className="text-blue-400 relative inline-block transition-all duration-100">
                {text[1]}
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </span>
              <span className="text-white ml-1 inline-block align-middle" id="cursor">
                |
              </span>
            </h1>

            <div className="animate-fade-up animate-delay-100 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6 text-white transition-all duration-700 delay-200 opacity-100 translate-y-0">
              <span className="text-blue-400">Passionate.</span>{" "}
              <span className="text-blue-300">Versatile.</span>{" "}
              <span className="text-white">Efficient.</span>
            </div>

            <p className="animate-fade-up animate-delay-200 text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl lg:max-w-4xl mb-6 sm:mb-8 px-1 sm:px-3 transition-all duration-700 delay-300 opacity-100 translate-y-0">
              I design and build performant digital products with modern frontend
              and full-stack tooling. My focus is clear UX, maintainable code, and
              shipping features that actually help users.
            </p>

            <div className="reveal delay-3 mb-12 sm:mb-16 flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="#about"
                className="w-full max-w-xs sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 min-h-[52px] rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                About Me
              </a>
              <a
                href="#projects"
                className="w-full max-w-xs sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 min-h-[52px] rounded-xl border border-blue-400/35 bg-blue-500/10 hover:bg-blue-500/20 text-[15px] font-medium text-blue-100 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                View Projects
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              <div className="reveal delay-1">
                <Box
                  title="7 years"
                  desc="5+ years building sleek, responsive apps and solving real-world problems."
                  color="indigo"
                  icon="faClock"
                />
              </div>
              <div className="reveal delay-2">
                <Box
                  title="7 languages"
                  desc="Proficient in 7 languages/frameworks for fast, full-stack development."
                  color="purple"
                  icon="faCode"
                />
              </div>
              <div className="reveal delay-3">
                <Box
                  title="100%"
                  desc="Strong delivery quality and long-term maintainability focus."
                  color="blue"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-10">
          <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 sm:p-7 md:p-8">
            <div className="reveal mb-7 sm:mb-9">
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-3">
                <span className="text-blue-300">+</span>
                About
              </p>
              <h2 className="brand-font text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Building useful products with clean UX.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
              <article className="reveal lg:col-span-3 rounded-xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                  I work across frontend, backend, and automation to deliver products
                  that are fast, clear, and production-ready. My workflow is simple:
                  understand the goal, cut unnecessary complexity, and ship stable
                  iterations.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 mt-4">
                  I enjoy combining animation, performance, and clean architecture so
                  each release feels polished to users and maintainable for teams.
                </p>
              </article>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <article className="reveal delay-1 rounded-xl border border-white/10 bg-slate-900/60 p-5">
                  <h3 className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                    Focus
                  </h3>
                  <p className="text-sm text-slate-300">
                    Product-minded engineering with practical performance improvements.
                  </p>
                </article>
                <article className="reveal delay-2 rounded-xl border border-white/10 bg-slate-900/60 p-5">
                  <h3 className="text-sm uppercase tracking-wider text-blue-200 mb-2">
                    Workflow
                  </h3>
                  <p className="text-sm text-slate-300">
                    Clear specs, iterative delivery, and measurable outcomes.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="container mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
          <div className="reveal mb-7 sm:mb-9">
            <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-3">
              <span className="text-blue-300">+</span>
              Skills
            </p>
            <h2 className="brand-font text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Technical stack that ships.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {SKILLS.map((skill, index) => (
              <article
                key={skill.name}
                className={`group reveal rounded-xl border border-white/10 bg-slate-900/65 px-3 py-4 sm:px-4 sm:py-5 text-center transition-all duration-300 hover:-translate-y-1 ${skill.cardHover}`}
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <div
                  className={`mx-auto mb-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${skill.iconBg} shadow-lg shadow-black/35 transition-transform duration-300 group-hover:scale-105`}
                >
                  <FontAwesomeIcon icon={skill.icon} className={`text-base ${skill.iconColor}`} />
                </div>
                <p className="text-sm sm:text-base font-semibold text-white">{skill.name}</p>
              </article>
            ))}
          </div>
        </section>

        {/* <section id="journey" className="container mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
          <div className="reveal mb-7 sm:mb-9">
            <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-3">
              <span className="text-blue-300">+</span>
              Journey
            </p>
            <h2 className="brand-font text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              How I approach growth and delivery.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {JOURNEY.map((item, index) => (
              <article
                key={item.title}
                className="reveal portfolio-card rounded-2xl border border-white/10 bg-slate-900/65 p-5 sm:p-6"
                style={{ "--reveal-delay": `${index * 100}ms` }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-blue-200">
                  {item.period}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-white mt-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </section> */}

        <section id="projects" className="container mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6 md:p-8">
            <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7 sm:mb-9">
              <div className="text-left">
                <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-3">
                  <span className="text-blue-300">+</span>
                  Portfolio Showcase
                </p>
                <h2 className="brand-font text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Projects Space
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                  Real projects pulled from my GitHub portfolio with live demos, code
                  links, and stack highlights.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                {PROJECT_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      activeFilter === filter
                        ? "border-blue-400/35 bg-blue-500/15 text-blue-100"
                        : "border-white/15 bg-white/5 text-slate-300 hover:border-blue-300/30 hover:bg-white/10"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project, index) => (
                <a href={project.links.demo || project.links.code}>
                <article
                  key={`${activeFilter}-${project.name}`}
                  className="reveal portfolio-card group rounded-2xl overflow-hidden border border-white/10 bg-slate-900/65 text-left backdrop-blur-sm hover:border-blue-400/35 transition-colors"
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <div className={`relative h-40 sm:h-44 bg-gradient-to-br ${project.gradient}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_60%)]"></div>
                    <div className="absolute top-3 left-3 text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 bg-black/25 text-white">
                      {project.category}
                    </div>
                    <div className="absolute bottom-3 left-3 text-xs text-white/90">
                      {project.updated}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {project.name}
                      </h3>
                      <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-blue-400/30 text-blue-100 bg-blue-500/10 whitespace-nowrap">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={`${project.name}-${tech}`}
                          className="text-xs sm:text-sm px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200 transition-colors group-hover:border-blue-300/25"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <a
                        href={project.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 text-white hover:border-blue-300/40 hover:text-blue-100 transition-colors"
                      >
                        View Code
                      </a>
                      {project.links.demo ? (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-blue-400/30 bg-blue-500/10 text-blue-100 hover:border-blue-300/50 transition-colors"
                        >
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 sm:px-6 mt-14 sm:mt-20 pb-14 sm:pb-20">
          <div className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8 md:p-10">
            <div className="absolute -top-20 -right-12 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-4">
                <span className="text-blue-300">+</span>
                Contact
              </p>
              <h2 className="brand-font text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-3xl">
                Looking for a developer who can ship quickly and cleanly?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                I am open to freelance collaborations, long-term product builds, and
                technically challenging projects where performance and UX both matter.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Droopy16a"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-blue-400/40 bg-blue-500/15 text-blue-100 hover:bg-blue-500/20 transition-colors"
                >
                  GitHub Profile
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white hover:border-blue-300/35 hover:text-blue-100 transition-colors"
                >
                  Browse Projects
                </a>
                <a
                  href="https://tradesarace.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white hover:border-blue-300/35 hover:text-blue-100 transition-colors"
                >
                  Latest Live App
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 sm:px-6 pb-10 text-xs sm:text-sm text-slate-400">
          {currentYear} made by Droopy.
        </footer>
      </div>
    </main>
  );
}

export default Main;
