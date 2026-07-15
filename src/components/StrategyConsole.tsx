import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Terminal, X, MessageSquare, ArrowRight, CornerDownLeft } from "lucide-react";
import { ChatMessage } from "../types";

interface StrategyConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategyConsole({ isOpen, onClose }: StrategyConsoleProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "System online. Neural sensors connected to Jaspinder's data clusters. I am the Strategy Console. Enter any prompt or transmit one of my system inquiries below.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested inquiries
  const SUGGESTED_QUERIES = [
    "What is PunjabOS?",
    "What is your leadership philosophy?",
    "How have you influenced $10M+ in capital?",
    "What are you building next?"
  ];

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Map history to server spec
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/strategy-console", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: historyPayload
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.reply || "Transmission failed. Recalibrating cosmic array...",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Error: Could not connect to the cosmic core. Jaspinder's records are safe, but my telemetry arrays are temporarily disrupted.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl h-[85vh] md:h-[75vh] flex flex-col rounded-2xl glass-panel border-white/10 overflow-hidden shadow-2xl shadow-cosmic-purple/10"
          >
            {/* Console Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/30">
                  <Terminal className="w-4 h-4 text-cosmic-purple animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-medium text-white tracking-wide uppercase">
                    Strategy Console v1.4
                  </h3>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    SYSTEM DIRECTORY: ACTIVE LATTICE
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Console Output (Messages) */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl border ${
                      m.role === "user"
                        ? "bg-cosmic-purple/10 border-cosmic-purple/30 text-gray-100 rounded-tr-none"
                        : "bg-white/[0.03] border-white/5 text-gray-300 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                        {m.role === "user" ? "VISITOR TRANSMISSION" : "SYSTEM INTELLIGENCE"}
                      </span>
                      <span className="text-[8px] font-mono text-gray-600">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs font-sans leading-relaxed whitespace-pre-line text-gray-200">
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-4 rounded-xl bg-white/[0.03] border border-white/5 rounded-tl-none">
                    <div className="flex items-center space-x-2 text-[9px] font-mono text-cosmic-gold uppercase tracking-widest mb-1">
                      <Sparkles className="w-3 h-3 text-cosmic-gold animate-spin" />
                      <span>Synthesizing System Records...</span>
                    </div>
                    <div className="flex space-x-1 py-1.5">
                      <span className="block w-2.5 h-2.5 bg-cosmic-purple rounded-full animate-bounce delay-100" />
                      <span className="block w-2.5 h-2.5 bg-cosmic-gold rounded-full animate-bounce delay-200" />
                      <span className="block w-2.5 h-2.5 bg-cosmic-blue rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-6 pb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mb-2">
                  SUGGESTED VECTORS OF INQUIRY:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTED_QUERIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-left px-3 py-2 text-[10px] font-sans text-gray-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-lg transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <span className="line-clamp-1">{q}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-cosmic-gold transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white/[0.01] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Transmit coordinates or ask a question..."
                  className="w-full pl-4 pr-16 py-3 text-xs bg-black/40 border border-white/10 focus:border-cosmic-purple/50 rounded-xl text-white outline-none placeholder-gray-600 transition-all font-sans"
                />
                <div className="absolute right-2 flex items-center space-x-1">
                  <span className="hidden md:inline-flex items-center text-[8px] font-mono text-gray-600 border border-gray-800 rounded px-1.5 py-0.5">
                    ENTER <CornerDownLeft className="w-2 h-2 ml-1" />
                  </span>
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-1.5 rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple text-cosmic-purple hover:text-white border border-cosmic-purple/30 hover:border-cosmic-purple transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
