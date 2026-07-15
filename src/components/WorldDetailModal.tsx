import { useState } from "react";
import { motion } from "motion/react";
import { World } from "../types";
import { X, ArrowLeft, Target, Layers, Cpu, CheckCircle, Database, GitBranch, Shield, ArrowRight, BarChart2 } from "lucide-react";

interface WorldDetailModalProps {
  world: World;
  onClose: () => void;
}

export default function WorldDetailModal({ world, onClose }: WorldDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"system" | "thinking" | "evidence">("system");

  // Get color configurations
  const glassClass = 
    world.color === "blue" ? "glass-panel-blue" :
    world.color === "gold" ? "glass-panel-gold" :
    world.color === "purple" ? "glass-panel-purple" :
    world.color === "crimson" ? "border-red-500/10 bg-red-950/20" : "border-emerald-500/10 bg-emerald-950/20";

  const glowClass =
    world.color === "blue" ? "radial-glow-blue" :
    world.color === "gold" ? "radial-glow-gold" :
    world.color === "purple" ? "radial-glow-purple" :
    world.color === "crimson" ? "radial-glow-crimson" : "radial-glow-green";

  const textColor = 
    world.color === "blue" ? "text-cosmic-blue" :
    world.color === "gold" ? "text-cosmic-gold" :
    world.color === "purple" ? "text-cosmic-purple" :
    world.color === "crimson" ? "text-red-400" : "text-emerald-400";

  const bgBadge = 
    world.color === "blue" ? "bg-cosmic-blue/10 border-cosmic-blue/30 text-cosmic-blue" :
    world.color === "gold" ? "bg-cosmic-gold/10 border-cosmic-gold/30 text-cosmic-gold" :
    world.color === "purple" ? "bg-cosmic-purple/10 border-cosmic-purple/30 text-cosmic-purple" :
    world.color === "crimson" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-40 bg-[#02040a]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto no-scrollbar`}
    >
      {/* Background glow matching the world color */}
      <div className={`absolute inset-0 w-full h-full pointer-events-none opacity-60 ${glowClass}`} />

      {/* Main Glass Panel */}
      <motion.div
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.96 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`relative w-full max-w-6xl rounded-sm glass-panel ${glassClass} flex flex-col lg:flex-row overflow-hidden shadow-2xl z-10 min-h-[80vh] max-h-[90vh]`}
      >
        {/* Close and Back buttons */}
        <div className="absolute top-6 right-6 flex items-center space-x-3 z-30">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Universe</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Left column - Project overview and metrics */}
        <div className="w-full lg:w-5/12 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Tag Badge */}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border ${bgBadge}`}>
              SYSTEM TARGET: 0{world.id.slice(-1)}
            </span>

            {/* Title / Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                {world.title}
              </h2>
              <p className={`text-sm font-mono mt-1 ${textColor} uppercase tracking-widest`}>
                {world.subtitle}
              </p>
            </div>

            {/* Challenge Block */}
            <div className="space-y-2">
              <span className="cinematic-label text-gray-500 block">
                THE SYSTEMIC CHALLENGE
              </span>
              <p className="text-xs font-sans text-gray-400 leading-relaxed font-light">
                {world.challenge}
              </p>
            </div>
          </div>

          {/* Metric Bento Grid */}
          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <span className="cinematic-label text-gray-500 block">
              MEASURABLE EVIDENCE & IMPACT
            </span>
            <div className="grid grid-cols-2 gap-4">
              {world.impact.metrics.map((metric, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={metric.label}
                  className="bg-white/[0.02] border border-white/5 p-4 rounded-sm flex flex-col justify-between"
                >
                  <span className={`text-2xl md:text-3xl font-display font-semibold tracking-tight ${textColor}`}>
                    {metric.value}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mt-1 block">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Deep dive tabs (System, Thinking, Evidence) */}
        <div className="w-full lg:w-7/12 flex flex-col h-full overflow-hidden">
          {/* Tabs header */}
          <div className="flex border-b border-white/10 bg-white/[0.01] px-6 py-4">
            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all border-b-2 cursor-pointer ${
                activeTab === "system"
                  ? `${textColor} border-current font-medium`
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>THE SYSTEM</span>
            </button>
            <button
              onClick={() => setActiveTab("thinking")}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all border-b-2 cursor-pointer ${
                activeTab === "thinking"
                  ? `${textColor} border-current font-medium`
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>THE THINKING</span>
            </button>
            <button
              onClick={() => setActiveTab("evidence")}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all border-b-2 cursor-pointer ${
                activeTab === "evidence"
                  ? `${textColor} border-current font-medium`
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>SYSTEM EVIDENCE</span>
            </button>
          </div>

          {/* Deep dive tab content */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-black/10">
            {activeTab === "system" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-sm font-display text-white font-medium uppercase tracking-wide">
                    {world.system.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                    {world.system.description}
                  </p>
                </div>

                 {/* Architecture Diagrams Block */}
                <div className="space-y-3">
                  <span className="flex items-center space-x-1.5 text-gray-500">
                    <Database className="w-3.5 h-3.5" />
                    <span className="cinematic-label">SYSTEM ARCHITECTURE LAYERS</span>
                  </span>
                  <div className="space-y-2.5">
                    {world.system.architecture.map((layer, idx) => (
                      <div key={idx} className="p-3.5 rounded-sm bg-white/[0.02] border border-white/5 flex items-start space-x-3">
                        <span className={`text-xs font-mono ${textColor} mt-0.5`}>0{idx+1}</span>
                        <div>
                          <h5 className="text-[11px] font-mono text-gray-200 uppercase tracking-wide font-semibold">
                            {layer.split(":")[0]}
                          </h5>
                          <p className="text-[10px] text-gray-400 leading-normal mt-0.5 font-light">
                            {layer.split(":")[1]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Pipelines Block */}
                <div className="space-y-3">
                  <span className="flex items-center space-x-1.5 text-gray-500">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span className="cinematic-label">ACTIVE TELEMETRY PIPELINES</span>
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {world.system.pipelines.map((pipe, idx) => (
                      <div key={idx} className="p-3.5 rounded-sm bg-white/[0.01] border border-white/5">
                        <h5 className="text-[10px] font-mono text-white tracking-wide uppercase font-semibold">
                          {pipe.split(":")[0]}
                        </h5>
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal font-light">
                          {pipe.split(":")[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "thinking" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-sm font-display text-white font-medium uppercase tracking-wide">
                    Cognitive System Map
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                    How Jaspinder structures strategic decisions and governance programs visually.
                  </p>
                </div>

                {/* Sequential Thinking Flowchart */}
                <div className="flex flex-col space-y-4">
                  {world.thinking.map((step, idx) => (
                    <div key={idx} className="relative flex items-center space-x-4">
                      {/* Connector Line */}
                      {idx < world.thinking.length - 1 && (
                        <div className="absolute left-6 top-10 bottom-0 w-[1px] bg-white/10" />
                      )}

                      {/* Step index circle */}
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-xs z-10 ${
                        idx === 0 
                          ? `bg-white/5 border-white/20 text-white font-bold`
                          : `bg-black border-white/5 ${textColor}`
                      }`}>
                        {idx + 1}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 p-4 rounded-sm bg-white/[0.02] border border-white/5">
                        <h5 className="text-[11px] font-mono text-white tracking-wide uppercase">
                          {step.split(":")[0]}
                        </h5>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal font-light">
                          {step.split(":")[1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "evidence" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-sm font-display text-white font-medium uppercase tracking-wide">
                    Strategic Deployments & Verified Records
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                    Direct validation of Jaspinder's leadership, modeling, and system architectures in professional environments.
                  </p>
                </div>

                {/* Simulated High-Contrast UI Window */}
                <div className="rounded-sm border border-white/10 bg-black/40 overflow-hidden shadow-lg">
                  <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                      SYSTEM_PROV_LOGS_ACTIVE
                    </span>
                  </div>
                  <div className="p-4 font-mono text-[10px] text-gray-400 space-y-2.5 leading-relaxed">
                    <p className="text-emerald-500">[OK] INITIATING SECURE INTEGRATION CREDENTIALS...</p>
                    <p className="text-gray-500">[LOG] VERIFIED DATA SCHEMA SYNCHRONIZATION</p>
                    <p className="text-cosmic-gold">[SYSTEM] $10M+ Capital Model: COMPLETED stress test (15 sensitivity variables, NPV accuracy 97.8%)</p>
                    <p className="text-cosmic-blue">[PunjabOS] Linked 18 state authorities; real-time resolution pipeline initialized with latency drop of 4.2x</p>
                    <p className="text-purple-400">[AGENT_ORCH] RAG model indexed 1,500+ standard files; success threshold reached at 92.5% confidence</p>
                  </div>
                </div>

                {/* List of evidence */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="flex items-center space-x-1.5 text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="cinematic-label">CREDIBILITY AUDIT TRAIL</span>
                  </span>
                  <ul className="space-y-2">
                    {world.impact.evidence.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300 font-light leading-relaxed">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${textColor}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
