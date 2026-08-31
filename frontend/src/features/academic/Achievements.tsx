import { SectionWrapper } from '../../components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const Achievements: React.FC = () => {
  return (
    <SectionWrapper
      id="achievements"
      number=""
      title="ACHIEVEMENTS"
      subtitle="KEY MILESTONES."
    >
      <div className="max-w-3xl mx-auto mt-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500">
            <Star size={22} />
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground tracking-wide">Key Milestones</h3>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="group relative overflow-hidden glass-panel p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent hover:border-yellow-500/40 transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
            <Star size={80} />
          </div>
          <h4 className="text-xl font-bold text-yellow-500 mb-3">Promoted to Core Leadership</h4>
          <p className="text-gray-300 leading-relaxed relative z-10">
            Elevated to <span className="text-white font-semibold">IT and Innovation Head</span> at Shakthi Foundation after one year of high-impact service as a volunteer, demonstrating exceptional leadership and technical growth.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
