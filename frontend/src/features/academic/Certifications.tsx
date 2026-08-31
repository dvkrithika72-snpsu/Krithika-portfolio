import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight, ShieldCheck, Database, BrainCircuit, Code, Cpu } from 'lucide-react';

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'Cpu': return <Cpu className="w-8 h-8" />;
    case 'BrainCircuit': return <BrainCircuit className="w-8 h-8" />;
    case 'Code': return <Code className="w-8 h-8" />;
    case 'Database': return <Database className="w-8 h-8" />;
    case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
    default: return <Award className="w-8 h-8" />;
  }
};

const TiltCard = ({ cert }: { cert: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-md mx-auto aspect-[4/3] rounded-3xl border bg-black/60 backdrop-blur-2xl shadow-2xl ${cert.borderClass}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className={`absolute inset-0 bg-gradient-to-br ${cert.colorClass} opacity-30 rounded-3xl`}
      />
      
      <div 
        style={{ transform: "translateZ(80px)" }}
        className="absolute inset-0 p-8 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div className={`p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md shadow-lg ${cert.textGlowClass}`}>
            {getIcon(cert.iconType)}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 font-mono tracking-wider shadow-lg">
            <CheckCircle2 size={14} /> VERIFIED
          </div>
        </div>

        <div>
          <h4 className={`text-3xl font-black mb-3 ${cert.textGlowClass} leading-tight`}>
            {cert.name}
          </h4>
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-4 w-1.5 rounded-full bg-current ${cert.textGlowClass?.split(' ')[0]}`}></div>
            <span className="text-sm font-bold text-gray-200 uppercase tracking-widest">{cert.issuer}</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            {cert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/certifications`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCertifications(data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const nextCert = () => setCurrentIndex((prev) => (prev + 1) % certifications.length);
  const prevCert = () => setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);

  if (certifications.length === 0) return null;

  return (
    <SectionWrapper
      id="certifications"
      number=""
      title="CERTIFICATIONS"
      subtitle="PROFESSIONAL CREDENTIALS."
    >
      <div className="max-w-4xl mx-auto mt-16 perspective-1000">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <Award size={32} />
          </div>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide text-center">
            Interactive Credentials
          </h3>
        </div>
        
        {/* Carousel Area */}
        <div className="relative flex items-center justify-center min-h-[400px] mb-12">
          <button 
            onClick={prevCert}
            className="absolute left-0 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-110 backdrop-blur-md hidden sm:block"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full relative flex justify-center px-4 sm:px-16" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 20 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="w-full"
              >
                <TiltCard cert={certifications[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextCert}
            className="absolute right-0 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-110 backdrop-blur-md hidden sm:block"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile controls & Indicators */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <button onClick={prevCert} className="p-2 sm:hidden rounded-full bg-white/5 border border-white/10"><ChevronLeft size={20} /></button>
            {certifications.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-8 h-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
            <button onClick={nextCert} className="p-2 sm:hidden rounded-full bg-white/5 border border-white/10"><ChevronRight size={20} /></button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://www.linkedin.com/in/krithika-d-v-79b558335/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-400 hover:from-emerald-500 hover:to-cyan-500 hover:text-black transition-all duration-500 font-bold shadow-lg hover:shadow-emerald-500/25 group"
            >
              <span>View All on LinkedIn</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
