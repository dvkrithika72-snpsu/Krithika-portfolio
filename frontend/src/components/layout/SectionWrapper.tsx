import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionWrapperProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  number,
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <section id={id} className={cn('relative py-24 w-full min-h-screen flex flex-col justify-center', className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-mono text-sm tracking-wider font-medium">
              {number}
            </span>
            <div className="h-[1px] w-12 bg-border"></div>
            <span className="text-sm font-mono tracking-[0.2em] text-gray-400 uppercase">
              {title}
            </span>
          </div>
          {subtitle && (
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary-foreground max-w-3xl leading-tight">
              {subtitle}
            </h2>
          )}
        </motion.div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
};
