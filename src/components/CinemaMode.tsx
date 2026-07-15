import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CINEMATIC_STEPS } from "../data";

interface CinemaModeProps {
  onComplete: () => void;
  onStepChange: (index: number) => void;
}

export default function CinemaMode({ onComplete, onStepChange }: CinemaModeProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 is absolute black start
  const [flickerStar, setFlickerStar] = useState(false);

  // Stabilize callbacks using refs so parent re-renders don't reset the cinematic flow
  const onStepChangeRef = useRef(onStepChange);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStepChangeRef.current = onStepChange;
  }, [onStepChange]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let text1Timer: ReturnType<typeof setTimeout> | undefined;
    
    // Stage 0: Pure black start (2.5 seconds)
    const startTimer = setTimeout(() => {
      setFlickerStar(true);
      // Move to first text after 3 more seconds
      text1Timer = setTimeout(() => {
        setCurrentStep(0);
        onStepChangeRef.current(0);
      }, 3000);
    }, 2500);

    return () => {
      clearTimeout(startTimer);
      if (text1Timer) clearTimeout(text1Timer);
    };
  }, []); // Run only once on mount

  useEffect(() => {
    if (currentStep < 0 || currentStep >= CINEMATIC_STEPS.length) return;

    const step = CINEMATIC_STEPS[currentStep];
    const timer = setTimeout(() => {
      const next = currentStep + 1;
      if (next < CINEMATIC_STEPS.length) {
        setCurrentStep(next);
        onStepChangeRef.current(next);
      } else {
        // Film mode ends
        onCompleteRef.current();
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const currentText = currentStep >= 0 && currentStep < CINEMATIC_STEPS.length 
    ? CINEMATIC_STEPS[currentStep].text 
    : "";

  const currentAnimation = currentStep >= 0 && currentStep < CINEMATIC_STEPS.length
    ? CINEMATIC_STEPS[currentStep].animationType
    : "none";

  // Customize layout/animation style depending on the specific text
  const isBigBang = currentAnimation === "bigbang";

  return (
    <div className="fixed inset-0 z-50 bg-[#02040a] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Background Star twinkle during silence */}
      {flickerStar && currentStep < 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 1, 0.3, 1, 0.4],
            scale: [1, 1.5, 1, 1.8, 1.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_#fff]"
        />
      )}

      {/* Cinematic Text Overlay */}
      <div className="max-w-4xl px-8 text-center z-10">
        <AnimatePresence mode="wait">
          {currentText && (
            <motion.div
              key={currentStep}
              initial={{ 
                opacity: 0, 
                scale: isBigBang ? 0.9 : 1.0,
                y: 15 
              }}
              animate={{ 
                opacity: 1, 
                scale: isBigBang ? [1, 1.05, 1] : 1,
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: isBigBang ? 1.15 : 1.0,
                filter: isBigBang ? "blur(12px)" : "none",
                y: -10 
              }}
              transition={{ 
                duration: isBigBang ? 2.0 : 1.6, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="flex flex-col items-center"
            >
              {/* Extra visual indicators / layout rhythm */}
              {isBigBang ? (
                <div className="space-y-4">
                  <motion.span 
                    initial={{ letterSpacing: "0.25em" }}
                    animate={{ letterSpacing: "0.45em" }}
                    transition={{ duration: 4 }}
                    className="cinematic-label text-cosmic-gold tracking-widest block uppercase mb-3"
                  >
                    COSMIC REVELATION
                  </motion.span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-[#f8fafc] leading-tight tracking-tight">
                    {currentText}
                  </h1>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cosmic-gold to-transparent mx-auto mt-6" />
                </div>
              ) : (
                <div className="space-y-2">
                  {currentStep > 1 && currentStep < 6 && (
                    <span className="cinematic-label text-gray-500 uppercase tracking-widest block mb-2">
                      Observation 0{currentStep - 1}
                    </span>
                  )}
                  <p className={`text-2xl md:text-4xl font-serif text-gray-100 leading-relaxed font-light tracking-wide`}>
                    {currentText}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Skip Controller (High-end, subtle, non-intrusive) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        whileHover={{ opacity: 0.9, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        onClick={onComplete}
        className="absolute bottom-10 right-10 px-5 py-2.5 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/70 bg-black/30 backdrop-blur-md transition-all cursor-pointer"
      >
        Skip Experience →
      </motion.button>

      {/* Audio ambient placeholder indicator to raise the "spiritual, cinematic" mood */}
      <div className="absolute bottom-10 left-10 flex items-center space-x-2 text-[9px] font-mono text-gray-500 tracking-widest uppercase">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmic-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cosmic-gold"></span>
        </span>
        <span>Ambient Audio Connected</span>
      </div>
    </div>
  );
}
