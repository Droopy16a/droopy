import { useEffect, useState } from "react";
import "./App.css";
import Box from "./Box";

const STATIC_TEXT = "Hi there,";
const WORDS = [[" I'm ", "Droopy !"], [" ", "welcome !"]];

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
    name: "Rosttatime",
    category: "Automation",
    description:
      "Browser-extension workflow project with frontend/worker builds powered by Deno and Make tooling.",
    stack: ["TypeScript", "Deno", "Chrome Extension", "Makefile"],
    status: "Source",
    year: "2026",
    updated: "Jan 2026",
    gradient: "from-emerald-500/25 via-blue-500/20 to-indigo-500/25",
    links: {
      code: "https://github.com/Droopy16a/Rosttatime",
      demo: null,
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

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0">
        <div className="absolute top-[12%] right-[4%] w-56 h-56 sm:w-72 sm:h-72 md:top-1/4 md:right-1/4 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[8%] left-[2%] w-56 h-56 sm:w-72 sm:h-72 md:bottom-1/4 md:left-1/4 md:w-96 md:h-96 bg-slate-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 container px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full">
          <h1 className="animate-fade-up text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-5 sm:mb-8 text-white leading-[1.15] transition-all duration-700 delay-100 opacity-100 translate-y-0 break-words">
            {STATIC_TEXT}
            {text[0]}
            <span className="text-blue-400 relative inline-block transition-all duration-100">
              {text[1]}
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </span>
            <span className="text-white ml-1 inline-block align-middle" id="cursor">|</span>
          </h1>

          <div className="animate-fade-up animate-delay-100 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6 text-white transition-all duration-700 delay-200 opacity-100 translate-y-0">
            <span className="text-blue-400">Passionate.</span>{" "}
            <span className="text-blue-300">Versatile.</span>{" "}
            <span className="text-white">Efficient.</span>
          </div>

          <p className="animate-fade-up animate-delay-200 text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl lg:max-w-4xl mb-6 sm:mb-8 px-1 sm:px-3 transition-all duration-700 delay-300 opacity-100 translate-y-0">
            I am a skilled developer proficient in Python, HTML, CSS, JavaScript, TypeScript, React, Next.js and SQL. I have worked on diverse professional projects, including Discord bots, AI systems, websites, apps, and games. Passionate about coding, I thrive on creating innovative solutions.
          </p>

          <button className="mb-12 sm:mb-16 w-full max-w-xs sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group px-6 sm:px-8 py-3 sm:py-4 min-h-[52px] rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-[15px] font-medium text-white transition-all duration-300 hover:scale-105">
            <span className="group-hover:text-blue-300 transition-colors duration-300">
              About Me
            </span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <Box title="7 years" desc="5+ years building sleek, responsive apps and solving real-world problems." color="indigo" icon="faClock"/>
            <Box title="7 languages" desc="Proficient in 7 languages/frameworks for fast, full-stack development." color="purple" icon="faCode"/>
            <Box title="100%" desc="100% users satisfied with my work." color="blue" />
          </div>

          <section className="w-full mt-14 sm:mt-20">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7 sm:mb-9">
                <div className="text-left">
                  <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-blue-200 border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 rounded-full mb-3">
                    <span className="text-blue-300">+</span>
                    Portfolio Showcase
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    Projects Space
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                    Real projects pulled from my GitHub portfolio with live demos, code links, and stack highlights.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  {PROJECT_FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-full border transition-colors ${
                        activeFilter === filter
                          ? "border-blue-400/35 bg-blue-500/15 text-blue-100"
                          : "border-white/15 bg-white/5 text-slate-300 hover:border-blue-300/30"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProjects.map((project) => (
                  <article
                    key={project.name}
                    className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-900/65 text-left backdrop-blur-sm hover:border-blue-400/35 transition-colors"
                  >
                    <div className={`relative h-40 sm:h-44 bg-gradient-to-br ${project.gradient}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_60%)]"></div>
                      <div className="absolute top-3 left-3 text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 bg-black/25 text-white">
                        {project.category}
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs text-white/90">
                        {project.updated}
                      </div>
                      {/* <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/30 border border-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        ->
                      </div> */}
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
                            className="text-xs sm:text-sm px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
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
                ))}
              </div>
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}

export default Main;
