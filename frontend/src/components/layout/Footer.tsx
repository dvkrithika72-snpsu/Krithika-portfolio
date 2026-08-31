import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-medium tracking-wide mb-4">
              <span className="text-accent">KRITHIKA</span> D.V.
            </h3>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Aspiring Technologist | Full-Stack Developer & Machine Learning Enthusiast
            </p>
            <div className="flex items-center gap-4">
              <motion.a 
                href="https://github.com/dvkrithika72-snpsu" 
                target="_blank" 
                rel="noreferrer" 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-2 border border-border rounded-full hover:border-white hover:text-white transition-colors text-gray-400 bg-black/20"
              >
                <GithubIcon style={{ width: '18px', height: '18px' }} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/krithika-d-v-79b558335" 
                target="_blank" 
                rel="noreferrer" 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="p-2 border border-border rounded-full hover:border-[#0077b5] hover:text-[#0077b5] transition-colors text-gray-400 bg-black/20"
              >
                <LinkedinIcon style={{ width: '18px', height: '18px' }} />
              </motion.a>
              <motion.a 
                href="https://leetcode.com/u/Krithi_938023dv/" 
                target="_blank" 
                rel="noreferrer" 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="p-2 border border-border rounded-full hover:border-[#FFA116] hover:text-[#FFA116] transition-colors text-gray-400 bg-black/20"
              >
                <LeetCodeIcon style={{ width: '18px', height: '18px' }} />
              </motion.a>
              <motion.a 
                href="mailto:dvkrithika72@gmail.com" 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors text-gray-400 bg-black/20"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#identity" className="text-gray-400 hover:text-accent transition-colors text-sm tracking-wide">01 / Identity</a></li>
              <li><a href="#stack" className="text-gray-400 hover:text-accent transition-colors text-sm tracking-wide">02 / Stack</a></li>
              <li><a href="#archive" className="text-gray-400 hover:text-accent transition-colors text-sm tracking-wide">03 / Archive</a></li>
              <li><a href="#trajectory" className="text-gray-400 hover:text-accent transition-colors text-sm tracking-wide">04 / Trajectory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:dvkrithika72@gmail.com" className="group flex items-center text-gray-400 hover:text-accent transition-colors text-sm tracking-wide">
                  dvkrithika72@gmail.com
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>

              <li className="text-gray-500 text-sm mt-4">
                Bengaluru, Karnataka
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            © {currentYear} KRITHIKA D.V. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-gray-400 font-mono tracking-wider">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
