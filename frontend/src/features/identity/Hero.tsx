import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay, no blur */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Audio Toggle Button */}
      <button 
        onClick={toggleMute}
        className="absolute top-24 right-6 md:right-12 z-20 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-[30vh]">
        
        {/* Main Name Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative inline-block mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight text-white drop-shadow-2xl">
            KRITHIKA D.V.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-200 font-medium mb-10 tracking-wide drop-shadow-lg"
        >
          Aspiring Technologist <span className="mx-3 text-accent drop-shadow-md">|</span> Full-Stack Developer <span className="mx-3 text-accent drop-shadow-md">|</span> AI Prompting & LLM Integration
        </motion.h2>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <a 
            href="#archive" 
            className="px-6 md:px-8 py-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-black transition-all duration-300 font-medium tracking-wide text-sm md:text-base backdrop-blur-sm bg-black/20"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="px-6 md:px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 font-medium tracking-wide text-sm md:text-base backdrop-blur-sm bg-black/20"
          >
            Contact Me
          </a>
          <a 
            href="/resume.pdf" 
            download
            className="px-6 md:px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 font-medium tracking-wide text-sm md:text-base backdrop-blur-sm bg-black/20 flex items-center gap-2"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
