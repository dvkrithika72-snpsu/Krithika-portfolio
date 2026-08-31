import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Code2, MonitorPlay, Cpu, Wrench } from 'lucide-react';

const skills = [
  {
    category: "Programming & Scripting",
    icon: Code2,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/30",
    items: ["Python", "JavaScript", "C", "C++", "Java"]
  },
  {
    category: "Web & DevOps Tools",
    icon: MonitorPlay,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/30",
    items: ["HTML", "CSS", "React.js", "REST APIs", "Tailwind"]
  },
  {
    category: "Core Fundamentals",
    icon: Cpu,
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/30",
    items: ["Operating Systems", "Data Structures & Algorithms", "DBMS", "AI Prompts"]
  },
  {
    category: "Tools & Version Control",
    icon: Wrench,
    color: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-orange-500/30",
    items: ["GitHub", "VS Code", "Jupyter Notebook"]
  }
];

export const StackMatrix: React.FC = () => {
  return (
    <SectionWrapper
      id="stack"
      number="02"
      title="ENGINEERING STACK"
      subtitle="TECHNOLOGIES AND FRAMEWORKS I WORK WITH."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {skills.map((skillGroup, index) => {
          const Icon = skillGroup.icon;
          return (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Animated Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className={`relative glass-panel p-8 h-full border border-border/50 ${skillGroup.border} transition-colors duration-500 rounded-2xl flex flex-col z-10 overflow-hidden`}>
                {/* Decorative Background Element */}
                <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <Icon size={160} />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-mono tracking-widest text-primary-foreground uppercase group-hover:text-accent transition-colors">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {skillGroup.items.map((item, itemIndex) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + itemIndex * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      key={item}
                      className="px-3.5 py-1.5 bg-black/30 border border-white/5 rounded-lg text-sm tracking-wide text-gray-400 hover:text-white hover:bg-black/50 hover:border-accent/50 transition-all cursor-default relative overflow-hidden group/item"
                    >
                      <span className="relative z-10">{item}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-700" />
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
