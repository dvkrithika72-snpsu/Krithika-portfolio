import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Mail, FileText, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../../components/ui/Icons';

export const Contact: React.FC = () => {
  const socialLinks = [
    { icon: <Mail size={20} />, label: "Email", value: "dvkrithika72@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=dvkrithika72@gmail.com" },
    { icon: <LinkedinIcon style={{ width: '20px', height: '20px' }} />, label: "LinkedIn", value: "linkedin.com/in/krithika-d-v", href: "https://www.linkedin.com/in/krithika-d-v-79b558335" },
    { icon: <GithubIcon style={{ width: '20px', height: '20px' }} />, label: "GitHub", value: "@dvkrithika72-snpsu", href: "https://github.com/dvkrithika72-snpsu" },
    { icon: <LeetCodeIcon style={{ width: '20px', height: '20px' }} />, label: "LeetCode", value: "Krithi_938023dv", href: "https://leetcode.com/u/Krithi_938023dv/" },
  ];

  return (
    <SectionWrapper
      id="contact"
      number="05"
      title="LET'S BUILD SOMETHING"
      subtitle="HAVE AN IDEA, OPPORTUNITY, OR PROJECT IN MIND? LET'S TURN IT INTO SOMETHING REAL."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">Open to New Opportunities</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              I am currently looking for full-time opportunities or exciting collaborative projects. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            
            <div className="space-y-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 glass-panel rounded-xl border border-border/50 hover:border-accent/40 bg-black/40 backdrop-blur-md transition-all group"
                >
                  <div className="p-3 bg-white/5 rounded-lg text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono tracking-wider mb-0.5">{link.label}</p>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              download="Krithika_DV_Resume.pdf"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 glass-panel rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all font-medium"
            >
              <FileText size={18} />
              Download Full Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Direct Communication */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-2xl border border-border/50 bg-black/40 backdrop-blur-xl relative overflow-hidden h-full flex flex-col justify-center"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Mail size={32} className="text-gray-300" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Direct Communication</h3>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg">
                For professional inquiries, project proposals, or networking. I typically respond within 24-48 hours.
              </p>

              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dvkrithika72@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 bg-[#111111] border border-white/10 rounded-2xl hover:border-accent/50 transition-colors"
              >
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">Email Address</p>
                  <p className="text-lg md:text-2xl font-medium text-white tracking-wide">dvkrithika72@gmail.com</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors border border-white/10 group-hover:border-accent text-gray-400 flex-shrink-0 ml-4">
                  <ExternalLink size={20} />
                </div>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
};
