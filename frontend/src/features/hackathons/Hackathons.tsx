import React from 'react';
import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Trophy, Code2, Users, Rocket } from 'lucide-react';

const hackathons = [
  {
    title: "Google Solution Challenge",
    role: "Participant",
    icon: <Rocket size={24} />,
    description: "Participated in the global Google Solution Challenge, leveraging Google technologies to solve real-world problems based on the UN Sustainable Development Goals."
  },
  {
    title: "SJBIT Hackathon",
    role: "Participant",
    icon: <Code2 size={24} />,
    description: "Competed in the intensive SJBIT Hackathon, collaborating with peers to rapidly prototype and develop an innovative technical solution under time constraints."
  },
  {
    title: "Athernex Hackathon",
    role: "Participant",
    icon: <Users size={24} />,
    description: "Engaged in collaborative problem-solving and full-stack development during the Athernex Hackathon, focusing on building scalable systems."
  },
  {
    title: "Vibe2Ship Hackathon",
    role: "Participant",
    icon: <Trophy size={24} />,
    description: "Participated in the fast-paced Vibe2Ship Hackathon, focusing on rapidly deploying MVP products from concept to a shippable state."
  }
];

export const Hackathons: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <SectionWrapper
      id="hackathons"
      number="06"
      title="HACKATHONS"
      subtitle="RAPID PROTOTYPING. REAL-WORLD PROBLEM SOLVING. COMPETITIVE ENGINEERING."
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {hackathons.map((hackathon, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl border border-border/50 bg-black/40 backdrop-blur-xl relative group overflow-hidden hover:border-accent/50 transition-colors duration-500"
          >
            {/* Glowing Hover Effect */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 rounded-xl text-accent border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                  {hackathon.icon}
                </div>
                <span className="text-xs font-mono tracking-widest text-gray-500 uppercase px-3 py-1 border border-border/50 rounded-full">
                  {hackathon.role}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-100 mb-3 tracking-wide group-hover:text-accent transition-colors duration-300">
                {hackathon.title}
              </h3>
              
              <p className="text-gray-400 font-light leading-relaxed flex-grow">
                {hackathon.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
