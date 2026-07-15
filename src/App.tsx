import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Terminal, 
  Compass, 
  ShieldAlert, 
  Linkedin, 
  Mail, 
  FileText, 
  ArrowRight, 
  HelpCircle, 
  Orbit, 
  Layers, 
  ArrowLeft,
  Search,
  MessageSquare,
  Network,
  X
} from "lucide-react";
import CelestialCanvas from "./components/CelestialCanvas";
import CinemaMode from "./components/CinemaMode";
import StrategyConsole from "./components/StrategyConsole";
import WorldDetailModal from "./components/WorldDetailModal";
import { WORLDS, CONSTELLATION_QUESTIONS } from "./data";
import { World, Question } from "./types";

export default function App() {
  const [viewMode, setViewMode] = useState<"cinema" | "interactive" | "convergence" | "finalReveal">("cinema");
  const [cinematicStep, setCinematicStep] = useState(-1);
  
  // Interactive exploration state
  const [activeWorldId, setActiveWorldId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  
  // Interactive overlays
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isOrbitOpen, setIsOrbitOpen] = useState(false);
  
  // Live Telemetry Mouse State
  const [telemetry, setTelemetry] = useState({ r: 0, theta: 0, x: 0, y: 0 });

  // Update mouse telemetry dynamically
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      const r = Math.round(Math.sqrt(cx * cx + cy * cy));
      const theta = Math.round(Math.atan2(cy, cx) * (180 / Math.PI));
      setTelemetry({
        r,
        theta: theta < 0 ? theta + 360 : theta,
        x: Math.round(cx),
        y: Math.round(cy)
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle Convergence and Final Collapse Sequence
  const triggerConvergence = () => {
    setViewMode("convergence");
    setActiveWorldId(null);
    setSelectedQuestionId(null);

    // After 6 seconds, collapse to the single star & Final Reveal
    setTimeout(() => {
      setViewMode("finalReveal");
    }, 6000);
  };

  const activeWorld = WORLDS.find((w) => w.id === activeWorldId);
  const activeQuestion = CONSTELLATION_QUESTIONS.find((q) => q.id === selectedQuestionId);

  return (
    <div className="relative w-full h-screen bg-[#02040a] text-[#f8fafc] overflow-hidden font-sans select-none">
      
      {/* 1. Background Cinematic Celestial Canvas */}
      <CelestialCanvas 
        activeWorldId={activeWorldId}
        selectedQuestionId={selectedQuestionId}
        isInteractive={viewMode === "interactive"}
        isConvergence={viewMode === "convergence"}
        cinematicStepIndex={cinematicStep}
      />

      {/* 2. Cinematic Film Mode */}
      {viewMode === "cinema" && (
        <CinemaMode 
          onStepChange={(step) => setCinematicStep(step)}
          onComplete={() => setViewMode("interactive")}
        />
      )}

      {/* 3. Interactive Mode Layout */}
      {viewMode === "interactive" && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none h-full">
          
          {/* Top Header Navigation Overlay */}
          <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="relative h-7 w-7 rounded-full border border-cosmic-gold/30 flex items-center justify-center bg-black/40">
                <Orbit className="w-4 h-4 text-cosmic-gold animate-spin [animation-duration:15s]" />
              </div>
              <div>
                <h1 className="text-base font-display font-light tracking-wide text-white uppercase flex items-center gap-1">
                  JASPINDER <span className="font-bold">UNIVERSE™</span>
                </h1>
                <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  Finance × AI × Strategy
                </p>
              </div>
            </motion.div>

            {/* Middle Quick Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
                DISCOVER CLUSTERS BY MOUSE HOVER OR QUICK SELECT:
              </span>
              <div className="flex space-x-2">
                {WORLDS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setActiveWorldId(w.id);
                      setSelectedQuestionId(null);
                    }}
                    className={`px-3 py-1.5 rounded-full border text-[9px] font-mono uppercase tracking-wider transition-all duration-350 cursor-pointer ${
                      activeWorldId === w.id
                        ? "bg-white/10 text-white border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                        : "bg-black/30 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    {w.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Header Interactive Accessors */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <button
                onClick={() => setIsConsoleOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-cosmic-purple/30 bg-cosmic-purple/10 text-xs font-mono text-cosmic-purple hover:bg-cosmic-purple hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(131,56,236,0.15)] hover:shadow-[0_0_20px_rgba(131,56,236,0.3)]"
              >
                <Terminal className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Strategy Console</span>
              </button>
              <button
                onClick={() => setIsOrbitOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-xs font-mono text-cosmic-gold hover:bg-cosmic-gold hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Join Orbit</span>
              </button>
            </motion.div>
          </header>

          {/* Left Side Quick Observatory Guide panel */}
          <div className="absolute left-6 md:left-12 top-32 max-w-xs space-y-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-sm glass-panel space-y-4 shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-cosmic-gold animate-pulse" />
                <span className="cinematic-label text-white !opacity-85">
                  Cosmos Coordinates
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed font-light">
                Hover or click on the 5 glowing star clusters to unlock the systemic blueprints of Jaspinder's work in Finance, AI, Strategy, and Civic Innovation.
              </p>
              <div className="h-[1px] bg-white/10" />
              <div className="space-y-1.5 font-mono text-[9px]">
                <div className="flex justify-between">
                  <span className="cinematic-label !opacity-40">ORBITAL NODES:</span>
                  <span className="text-white font-medium">05 DETECTED</span>
                </div>
                <div className="flex justify-between">
                  <span className="cinematic-label !opacity-40">CONSTELLATIONS:</span>
                  <span className="text-white font-medium">06 LINKED</span>
                </div>
                <div className="flex justify-between">
                  <span className="cinematic-label !opacity-40">SYSTEM STATUS:</span>
                  <span className="text-emerald-400 font-medium animate-pulse">SYNCHRONIZED</span>
                </div>
              </div>

              {/* Grand Convergence Button */}
              <button
                onClick={triggerConvergence}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white transition-all cursor-pointer group"
              >
                <span>Trigger Convergence</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Floating Constellation Thought Bubble Detail Overlay */}
          {activeQuestion && (
            <div className="absolute right-6 md:right-12 top-32 max-w-md pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-xl glass-panel-gold space-y-4 shadow-2xl relative"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-cosmic-gold animate-bounce" />
                    <span className="text-[10px] font-mono text-cosmic-gold uppercase tracking-widest">
                      CONSTELLATION THOUGHTS
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedQuestionId(null)}
                    className="p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all cursor-pointer"
                  >
                    close
                  </button>
                </div>
                <h4 className="text-sm font-display font-medium text-white tracking-wide">
                  {activeQuestion.text}
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {activeQuestion.answer}
                </p>
                <div className="pt-2 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>STATION COORDINATES: ({activeQuestion.x}°, {activeQuestion.y}°)</span>
                  <span className="text-cosmic-gold uppercase tracking-wider">ASTRONOMICAL TRUTH</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* Interactive instruction HUD */}
          <div className="absolute left-1/2 bottom-12 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-gray-400 bg-black/40 border border-white/5 rounded-full px-5 py-2.5 backdrop-blur-md"
            >
              <span>Explore Constellation Questions below or click Worlds</span>
            </motion.div>
          </div>

          {/* Bottom Live Telemetry Footer Overlay */}
          <footer className="w-full px-6 md:px-12 py-5 border-t border-white/5 bg-black/25 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between pointer-events-auto">
            <div className="flex items-center space-x-6 mb-3 sm:mb-0">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
                TELESCOPE telemetry:
              </span>
              <div className="flex space-x-4 font-mono text-[9px] text-gray-400">
                <div>R: <span className="text-cosmic-gold">{telemetry.r}px</span></div>
                <div>THETA: <span className="text-cosmic-blue">{telemetry.theta}°</span></div>
                <div>DELTA_X: <span className="text-white">{telemetry.x}</span></div>
                <div>DELTA_Y: <span className="text-white">{telemetry.y}</span></div>
              </div>
            </div>

            <div className="flex items-center space-x-4 font-mono text-[9px] text-gray-500">
              <span className="text-[10px] text-white">MISSION CONTROL: ONLINE</span>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </footer>
        </div>
      )}

      {/* 4. Worlds Navigation Selection Hotspots (Invisible overlays mapped over actual positions on canvas) */}
      {viewMode === "interactive" && !activeWorldId && (
        <div className="absolute inset-0 pointer-events-none z-20">
          
          {/* Constellation Question Selector Node Hotspots */}
          {CONSTELLATION_QUESTIONS.map((q) => {
            // Mapping percentage based coordinates to actual positions
            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestionId(q.id);
                  setActiveWorldId(null);
                }}
                style={{
                  left: `${q.x}%`,
                  top: `${q.y}%`,
                }}
                className="absolute pointer-events-auto w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center cursor-pointer group"
                title={q.text}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cosmic-gold opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
              </button>
            );
          })}

          {/* 5 World Clusters Selector Hotspots */}
          {/* Coordinates mapped to canvas distribution */}
          {[
            { id: "world-1", left: "34%", top: "34%" }, // Civic Blue
            { id: "world-2", left: "66%", top: "32%" }, // Finance Gold
            { id: "world-3", left: "33%", top: "68%" }, // AI Purple
            { id: "world-4", left: "68%", top: "70%" }, // Strategy Crimson
            { id: "world-5", left: "50%", top: "82%" }, // Human Green
          ].map((worldHot) => {
            const w = WORLDS.find((x) => x.id === worldHot.id);
            return (
              <button
                key={worldHot.id}
                onClick={() => {
                  setActiveWorldId(worldHot.id);
                  setSelectedQuestionId(null);
                }}
                style={{
                  left: worldHot.left,
                  top: worldHot.top,
                }}
                className="absolute pointer-events-auto w-24 h-24 -ml-12 -mt-12 rounded-full flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="w-4 h-4 rounded-full border border-white/20 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center bg-black/40 shadow-lg shadow-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-cosmic-gold transition-colors" />
                </div>
                <span className="text-[8px] font-mono text-white/40 group-hover:text-white uppercase tracking-widest mt-2 transition-colors">
                  SELECT
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 5. World Detail Pop-ups */}
      <AnimatePresence>
        {activeWorld && (
          <WorldDetailModal 
            world={activeWorld} 
            onClose={() => setActiveWorldId(null)} 
          />
        )}
      </AnimatePresence>

      {/* 6. Strategy Console AI Model */}
      <StrategyConsole 
        isOpen={isConsoleOpen} 
        onClose={() => setIsConsoleOpen(false)} 
      />

      {/* 7. Join Orbit Observatory View */}
      <AnimatePresence>
        {isOrbitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative w-full max-w-lg p-8 rounded-2xl glass-panel border-white/10 shadow-2xl text-center space-y-6"
            >
              <button
                onClick={() => setIsOrbitOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto h-12 w-12 rounded-full border border-cosmic-gold/30 flex items-center justify-center bg-cosmic-gold/5 animate-pulse">
                <Orbit className="w-6 h-6 text-cosmic-gold" />
              </div>

              <div>
                <h3 className="text-xl font-display font-medium text-white tracking-tight uppercase">
                  JOIN MY ORBIT
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Let's design and build intelligent decision systems together.
                </p>
              </div>

              {/* Resume Quick Panel view */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 text-left">
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">
                  PROFILE CAPSULE & EDUCATION
                </span>
                <p className="text-xs text-white font-medium">Jaspinder Kaur</p>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                  Systems Strategist | Master of Science Candidate. Pioneer of civic intelligence and high-stakes capital forecasting models.
                </p>
              </div>

              <div className="flex flex-col space-y-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/jaspinder-kaur-5683a42a2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5] border border-[#0077b5]/30 text-xs font-mono tracking-wider uppercase text-white hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:text-white transition-colors" />
                    <span>LinkedIn Vector</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="mailto:jaspinderkaur0608@gmail.com"
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-cosmic-blue/10 hover:bg-cosmic-blue border border-cosmic-blue/30 text-xs font-mono tracking-wider uppercase text-white hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-cosmic-blue group-hover:text-white transition-colors" />
                    <span>Direct Transmitter</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => {
                    setIsOrbitOpen(false);
                    setIsConsoleOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-cosmic-purple/10 hover:bg-cosmic-purple border border-cosmic-purple/30 text-xs font-mono tracking-wider uppercase text-white hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Terminal className="w-4 h-4 text-cosmic-purple group-hover:text-white transition-colors" />
                    <span>Query System Console</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. Convergence Animation Cover / Core Transition overlay */}
      {viewMode === "convergence" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 bg-black/40 flex flex-col items-center justify-center font-sans select-none pointer-events-none"
        >
          <div className="text-center space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-xs font-mono text-cosmic-gold uppercase tracking-widest"
            >
              SYSTEM REVELATION CORE INTIATING...
            </motion.p>
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="text-3xl md:text-5xl font-display font-medium tracking-wide text-white uppercase"
            >
              Aligning Multi-System Telemetry
            </motion.h2>
          </div>
        </motion.div>
      )}

      {/* 9. Final Reveal Sequence (Breathtaking ending card showing JASPINDER KAUR) */}
      {viewMode === "finalReveal" && (
        <div className="fixed inset-0 z-40 bg-[#02040a] flex flex-col items-center justify-center p-6 text-center select-none overflow-y-auto no-scrollbar">
          
          <div className="absolute inset-0 pointer-events-none opacity-50 radial-glow-gold" />

          <div className="max-w-2xl space-y-8 my-auto">
            {/* Pulsing Star core */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mx-auto h-2 w-2 rounded-full bg-white shadow-[0_0_20px_#fff]"
            />

            {/* Typography Name and Mission */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-display font-light tracking-tight text-[#f8fafc] uppercase"
              >
                JASPINDER <span className="font-bold">KAUR</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="text-xs md:text-sm font-mono text-cosmic-gold uppercase tracking-widest"
              >
                Finance × AI × Strategy × Human Impact
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1.2 }}
                className="text-sm md:text-lg text-gray-300 font-light max-w-lg mx-auto leading-relaxed font-sans"
              >
                Building intelligent systems that transform information into action.
              </motion.p>
            </div>

            {/* Sequential outcome bullet tree */}
            <div className="space-y-3 pt-6 border-t border-white/5 max-w-sm mx-auto">
              {[
                "One idea.",
                "One system.",
                "One decision.",
                "One outcome.",
                "One organization transformed.",
                "One community impacted.",
                "A better future created."
              ].map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + idx * 0.4, duration: 0.8 }}
                  className="flex items-center space-x-2.5 text-xs text-gray-300 font-mono"
                >
                  <span className="text-cosmic-gold">↓</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>

            {/* In-Universe Observatory Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 1 }}
              className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/jaspinder-kaur-5683a42a2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Vector</span>
              </a>

              <a
                href="mailto:jaspinderkaur0608@gmail.com"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border border-cosmic-blue/30 bg-cosmic-blue/10 text-xs font-mono text-cosmic-blue hover:bg-cosmic-blue hover:text-white transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Transmitter</span>
              </a>

              <button
                onClick={() => {
                  setViewMode("interactive");
                  setIsConsoleOpen(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full border border-cosmic-purple/30 bg-cosmic-purple/10 text-xs font-mono text-cosmic-purple hover:bg-cosmic-purple hover:text-white transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Query Console</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("interactive");
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full border border-white/5 bg-black text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <span>Re-explore Universe</span>
              </button>
            </motion.div>
          </div>
        </div>
      )}

    </div>
  );
}
