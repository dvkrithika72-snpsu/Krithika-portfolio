import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    institution: "Sapthagiri NPS University, Bengaluru",
    degree: "B.E. (Bachelor of Engineering) in Computer Science & Engineering",
    period: "Oct 2024 - Sept 2028",
    score: "CGPA: 8.60",
    current: true
  },
  {
    institution: "Lakshya PU College, Bengaluru",
    degree: "Intermediate (KSEAB)",
    period: "April 2022 - Mar 2024",
    score: "Percentage: 93.83%"
  },
  {
    institution: "Jawahar Navodaya Vidyalaya, Galibeedu",
    degree: "Matriculation (CBSE)",
    period: "Mar 2021 - Mar 2022",
    score: "Percentage: 87.2%"
  }
];

export const Education: React.FC = () => {
  return (
    <SectionWrapper
      id="education"
      number=""
      title="EDUCATION"
      subtitle="ACADEMIC BACKGROUND."
    >
      <div className="max-w-3xl mx-auto mt-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <GraduationCap size={22} />
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground tracking-wide">Academic Education</h3>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-purple-500/20 before:to-transparent">
          {education.map((edu, index) => (
            <motion.div 
              key={edu.institution}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex items-center group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-primary shadow-xl absolute left-0 shrink-0 z-10 ${edu.current ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-black/80 text-gray-500 border-border/80'}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${edu.current ? 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]' : 'bg-gray-600'}`}></div>
              </div>
              
              <div className="w-full ml-16 glass-panel p-6 rounded-2xl border border-border/50 group-hover:border-purple-500/40 bg-black/40 backdrop-blur-md transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest px-2 py-1 bg-purple-500/5 rounded-md border border-purple-500/10">{edu.period}</span>
                </div>
                <h4 className="font-bold text-gray-100 text-base mb-1 group-hover:text-purple-400 transition-colors">{edu.degree}</h4>
                <p className="text-sm font-medium text-gray-400 mb-4">{edu.institution}</p>
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                  {edu.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
