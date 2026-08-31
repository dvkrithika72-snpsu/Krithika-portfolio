import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experience = [
  {
    role: "IT and Innovation Head",
    company: "Shakthi Foundation",
    period: "Present",
    desc: "Elevated to leadership after one year of high-impact volunteer service, driving technical growth and innovation.",
    current: true
  },
  {
    role: "Campus Ambassador",
    company: "GSSoC 2026 (GirlScript Summer of Code)",
    period: "Present",
    desc: "Selected as an official Campus Ambassador for GSSoC 2026 to foster open-source contributions and technical communities.",
    current: true
  },
  {
    role: "Data Science Intern",
    company: "SkillCraft Technology",
    period: "Past",
    desc: "Built a ML-driven traffic threat detection pipeline and performed EDA on traffic accident datasets.",
    current: false
  }
];

export const Experience: React.FC = () => {
  return (
    <SectionWrapper
      id="experience"
      number=""
      title="EXPERIENCE"
      subtitle="PROFESSIONAL JOURNEY AND ROLES."
    >
      <div className="max-w-3xl mx-auto mt-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 text-accent">
            <Briefcase size={22} />
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground tracking-wide">Professional Experience</h3>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent before:via-accent/20 before:to-transparent">
          {experience.map((exp, index) => (
            <motion.div 
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex items-center group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-primary shadow-xl absolute left-0 shrink-0 z-10 ${exp.current ? 'bg-accent/20 text-accent border-accent/50' : 'bg-black/80 text-gray-500 border-border/80'}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${exp.current ? 'bg-accent shadow-[0_0_12px_rgba(0,210,255,1)]' : 'bg-gray-600'}`}></div>
              </div>
              
              <div className="w-full ml-16 glass-panel p-6 rounded-2xl border border-border/50 group-hover:border-accent/40 bg-black/40 backdrop-blur-md transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest px-2 py-1 bg-accent/5 rounded-md border border-accent/10">{exp.period}</span>
                </div>
                <h4 className="font-bold text-gray-100 text-lg mb-1 group-hover:text-accent transition-colors">{exp.role}</h4>
                <p className="text-sm font-medium text-gray-400 mb-4">{exp.company}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
