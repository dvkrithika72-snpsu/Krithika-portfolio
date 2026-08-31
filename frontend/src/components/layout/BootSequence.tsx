import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        // Randomize the loading speed slightly for a more authentic feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnterSystem = () => {
    setIsExiting(true);
    // Wait for the exit animation to finish before unmounting
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono selection:bg-accent selection:text-black overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Central Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-24"
          >
            {/* Outer rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-accent/20 border-t-accent/60"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] rounded-full border border-white/10 border-b-white/40"
            />
            
            {/* Core Circle */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-accent/30 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.15)] relative z-10">
              <span className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                KD
              </span>
            </div>
          </motion.div>

          {/* Boot Terminal UI */}
          <div className="w-full max-w-md px-6 relative z-10 flex flex-col items-center">
            
            {/* Header info */}
            <div className="flex justify-between items-end w-full mb-3 text-xs md:text-sm tracking-[0.2em] text-gray-400">
              <span>SYSTEM BOOT</span>
              <span>v1.0.4</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[1px] bg-white/10 relative mb-8">
              {/* Actual Progress Line */}
              <motion.div 
                className="absolute top-0 left-0 h-[2px] bg-accent shadow-[0_0_10px_rgba(0,210,255,0.8)] -translate-y-[0.5px]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Status / Enter Button */}
            <div className="h-12 w-full flex items-center justify-between">
              {isLoaded ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleEnterSystem}
                  className="px-6 py-2 border border-accent/50 text-accent hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 tracking-[0.2em] text-xs md:text-sm uppercase font-bold"
                >
                  Enter System
                </motion.button>
              ) : (
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">Status</span>
                  <span className="text-xs text-accent tracking-[0.2em] animate-pulse">INITIALIZING CORE...</span>
                </div>
              )}

              <div className="text-sm tracking-[0.2em] text-gray-300 font-bold tabular-nums">
                {Math.min(progress, 100)}%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
