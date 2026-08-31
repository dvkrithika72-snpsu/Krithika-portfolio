import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { Network } from 'lucide-react';

const ALL_SKILLS = [
  "Python", "JavaScript", "C", "C++", "Java",
  "HTML", "CSS", "React.js", "REST APIs", "Tailwind",
  "Operating Systems", "Data Structures", "DBMS", "AI Prompts",
  "GitHub", "VS Code", "Jupyter"
];

export const SkillOctagon: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const radius = 40;
  const center = 50;
  
  const getVertex = (i: number, r: number = radius) => {
    const angle = (i * Math.PI) / 4; // Octagon = 8 sides
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const outerPoints = Array.from({ length: 8 }).map((_, i) => {
    const v = getVertex(i);
    return `${v.x},${v.y}`;
  }).join(' ');

  const middlePoints = Array.from({ length: 8 }).map((_, i) => {
    const v = getVertex(i, 25);
    return `${v.x},${v.y}`;
  }).join(' ');

  const innerPoints = Array.from({ length: 8 }).map((_, i) => {
    const v = getVertex(i, 10);
    return `${v.x},${v.y}`;
  }).join(' ');

  return (
    <SectionWrapper
      id="stack"
      number=""
      title="SKILLS"
      subtitle="TECHNOLOGIES AND FRAMEWORKS I WORK WITH."
    >
      <div className="relative w-full max-w-5xl mx-auto h-[700px] mt-8 flex items-center justify-center overflow-hidden">
        
        {/* Animated Rotating Parent Container */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Background SVG Octagons */}
          <div className="absolute w-[800px] h-[800px] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60 drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]">
              {/* Spokes */}
              {Array.from({ length: 8 }).map((_, i) => {
                const v = getVertex(i);
                return (
                  <line key={i} x1={center} y1={center} x2={v.x} y2={v.y} stroke="url(#lineGradient)" strokeWidth="0.1" strokeDasharray="1,1" />
                );
              })}
              
              {/* Concentric Octagons */}
              <polygon points={outerPoints} fill="none" stroke="url(#lineGradient)" strokeWidth="0.25" strokeLinejoin="round" />
              <polygon points={middlePoints} fill="none" stroke="url(#lineGradient)" strokeWidth="0.15" strokeLinejoin="round" strokeDasharray="1,1.5" />
              <polygon points={innerPoints} fill="none" stroke="url(#lineGradient)" strokeWidth="0.1" strokeLinejoin="round" />
              
              {/* Nodes on outer octagon */}
              {Array.from({ length: 8 }).map((_, i) => {
                const v = getVertex(i);
                return (
                  <circle key={i} cx={v.x} cy={v.y} r="1.5" fill="#00d2ff" className="drop-shadow-[0_0_8px_#00d2ff]" opacity="0.9" />
                );
              })}

              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3a00ff" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Orbiting Skill Capsules */}
          {ALL_SKILLS.map((skill, index) => {
            const angleOffset = (index * 360) / ALL_SKILLS.length;
            const orbitRadius = index % 2 === 0 ? 320 : 200; // Alternating radii for 17 items
            
            return (
              <div
                key={skill}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                  transform: `rotate(${angleOffset}deg) translateY(-${orbitRadius}px)`,
                }}
              >
                {/* Counter-rotation block */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div style={{ transform: `rotate(${-angleOffset}deg)` }} className="pointer-events-auto">
                    <button
                      onClick={() => setActiveSkill(skill)}
                      className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full border bg-black/40 backdrop-blur-xl whitespace-nowrap transition-all duration-500 font-mono text-xs md:text-sm tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)] ${
                        activeSkill === skill 
                          ? 'border-accent text-accent shadow-[0_0_30px_rgba(0,210,255,0.6)] scale-110 bg-accent/10' 
                          : 'border-accent/30 text-gray-200 hover:border-accent hover:text-white hover:bg-accent/10 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)]'
                      }`}
                    >
                      {skill}
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Center Node (Static relative to page, displays active skill) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSkill || 'default'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute z-30 w-32 h-32 bg-black/80 border border-accent/50 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl shadow-[0_0_60px_rgba(0,210,255,0.4)]"
          >
            {activeSkill ? (
              <div className="text-center px-4">
                <span className="text-accent text-sm font-bold tracking-widest uppercase block drop-shadow-[0_0_10px_rgba(0,210,255,0.9)]">
                  {activeSkill}
                </span>
                <span className="text-[10px] text-accent/70 mt-2 block uppercase tracking-widest font-mono">
                  Active Node
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Network className="text-accent mb-2 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]" size={28} />
                <span className="text-[10px] text-accent/70 uppercase tracking-widest font-mono text-center">
                  Select<br/>Node
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
};
