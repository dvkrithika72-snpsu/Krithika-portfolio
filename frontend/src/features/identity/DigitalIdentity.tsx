import React from 'react';
import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const DigitalIdentity: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const coreInterests = [
    "Full-Stack Development",
    "Machine Learning",
    "Data Science",
    "Threat Intelligence",
    "Real-time Data Systems",
    "Cloud Infrastructure"
  ];

  return (
    <SectionWrapper
      id="identity"
      number="01"
      title="DIGITAL IDENTITY"
      subtitle="MORE THAN A STUDENT. BUILDING TOWARD SOMETHING BIGGER."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-12 relative">
        
        {/* Decorative Background Blur */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        {/* Biography Section */}
        <div className="lg:col-span-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="h-full flex flex-col justify-center relative overflow-hidden"
          >
            
            <div className="flex flex-col xl:flex-row gap-10 xl:items-stretch h-full">
              {/* Profile Photo */}
              <div className="relative shrink-0 group w-full xl:w-[320px]">
                {/* Glowing Aura behind photo */}
                <div className="absolute inset-0 bg-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <img 
                  src="/krithikaDV.jpeg" 
                  alt="Krithika D.V." 
                  className="w-full h-[300px] sm:h-[400px] xl:h-full object-cover object-top rounded-2xl border border-accent/40 relative z-10 shadow-2xl xl:group-hover:scale-[1.02] transition-transform duration-500 grayscale-[10%] hover:grayscale-0"
                />
              </div>

              {/* Biography Text */}
              <div className="text-gray-300 font-light leading-relaxed text-lg flex flex-col justify-center">
                {/* ABOUT ME Pill */}
                <div className="mb-6 inline-flex">
                  <span className="px-4 py-1.5 rounded-full border border-gray-600 text-xs font-mono tracking-widest text-gray-300 uppercase">
                    About Me
                  </span>
                </div>

                <p className="mb-6 text-gray-200">
                  I'm a <span className="text-accent font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">Computer Science & Engineering</span> student at Sapthagiri NPS University with a profound interest in Full-Stack Development, Machine Learning, Data Science, and emerging technologies.
                </p>
                <p className="mb-6 text-gray-400">
                  I enjoy turning ideas into practical solutions — from threat intelligence and real-time data systems to intelligent web applications and cloud infrastructure. My approach blends rigorous engineering principles with an intense curiosity for how new technologies can solve real-world problems.
                </p>
                <p className="text-gray-400">
                  I enjoy solving real-world problems using technology and creating smart applications that can help people in everyday life.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Interest Section */}
        <div className="lg:col-span-4 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-panel border border-border/50 bg-black/40 backdrop-blur-xl rounded-2xl p-8 h-full"
          >
            <h3 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-8">
              Core Interest
            </h3>
            
            <div className="flex flex-col gap-6">
              {coreInterests.map((interest, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  className="flex items-center gap-4 group"
                >
                  <Activity size={18} className="text-accent/70 group-hover:text-accent transition-colors shrink-0" />
                  <span className="text-gray-300 font-mono text-sm md:text-base group-hover:text-white transition-colors">
                    {interest}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
