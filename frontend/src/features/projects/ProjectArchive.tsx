import { useState, useEffect } from 'react';
import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const ProjectArchive: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // or a skeleton loader
  return (
    <SectionWrapper
      id="archive"
      number="03"
      title="PROJECT ARCHIVE"
      subtitle="SYSTEMS, PLATFORMS, AND APPLICATIONS."
    >
      <div className="relative flex flex-col gap-32 mt-24">
        {/* Central Vertical Road (Desktop) */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/20 to-transparent -translate-x-1/2 z-0 hidden lg:block" />

        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`group relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
            >
              {/* Central Node & Zig-Zag Connector (Desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                <div className="w-6 h-6 rounded-full bg-black border-[3px] border-accent shadow-[0_0_20px_rgba(0,210,255,0.8)] relative group-hover:scale-125 transition-transform duration-500">
                  <div className={`absolute top-1/2 -translate-y-1/2 h-[2px] w-12 lg:w-32 opacity-50 group-hover:opacity-100 transition-all duration-700 ${isEven ? 'left-full bg-gradient-to-r from-accent to-transparent' : 'right-full bg-gradient-to-l from-accent to-transparent'}`} />
                </div>
              </div>

              {/* Image Section */}
              <div className={`w-full lg:w-[45%] relative z-10 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl group-hover:bg-accent/20 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                <div className="relative rounded-2xl overflow-hidden border border-border/50 group-hover:border-accent/40 transition-colors duration-500 aspect-video shadow-2xl">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className={`w-full lg:w-[45%] flex flex-col z-20 ${isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                    <Terminal size={12} />
                    <span>SYS_PROJECT_{index + 1}</span>
                  </div>
                  <div className="h-px bg-border/50 flex-1 ml-4" />
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <div className="glass-panel p-6 mb-6 rounded-xl border border-border/50 shadow-xl bg-black/40 backdrop-blur-xl group-hover:border-accent/20 transition-colors">
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>



                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {project.technologies?.map((tech: string) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[11px] tracking-wider text-gray-300 uppercase hover:text-accent hover:border-accent/50 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
