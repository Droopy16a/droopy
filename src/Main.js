import { useEffect, useState } from "react";
import "./App.css";

function Main() {
  const staticText = "Hi there,";
  const words = [[" my name is ", "Droopy !"], [" ", "welcome !"]];
  const [text, setText] = useState(["", ""]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout;
    const typingSpeed = 100;
    const deletingSpeed = 30;

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
        timeout = setTimeout(() => setIsDeleting(true), 1200); // pause before deleting
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
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 300); // short pause before next word
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 container px-4 md:px-6 py-16 md:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-white leading-[1.1]">
            {staticText}
            {text[0]}
            <span className="text-blue-400 relative inline-block transition-all duration-100">
              {text[1]}
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </span>
            <span className="absolute text-white" id="cursor"> |</span>
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6 text-white">
            <span className="text-blue-400">Passionate.</span>{" "}
            <span className="text-blue-300">Versatile.</span>{" "}
            <span className="text-white">Efficient.</span>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl lg:max-w-4xl mb-6 sm:mb-8 px-4">
            I am a skilled developer proficient in Python, HTML, CSS, JavaScript, React, and PHP. I have worked on diverse professional projects, including Discord bots, AI systems, websites, apps, and games. Passionate about coding, I thrive on creating innovative solutions.
          </p>

          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group px-6 py-6 h-[60px] rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-[15px] font-medium text-white transition-all duration-300 hover:scale-105">
            <span className="group-hover:text-blue-300 transition-colors duration-300">
              About Me
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Main;
