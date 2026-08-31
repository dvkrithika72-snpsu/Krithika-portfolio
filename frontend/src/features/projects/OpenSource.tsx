import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Calendar, Tag } from 'lucide-react';
import { GithubIcon } from '../../components/ui/Icons';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at?: string;
  topics?: string[];
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Recently';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const OpenSource: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/github/repos`);
        const data = await response.json();
        
        if (response.ok) {
          setRepos(data.data);
        } else {
          setError('Failed to load GitHub data');
        }
      } catch (err) {
        setError('Cannot connect to GitHub API');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <GithubIcon style={{ width: '32px', height: '32px' }} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-widest text-white mb-4 text-center uppercase"
          >
            GitHub & Open Source
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono text-sm tracking-widest uppercase text-center max-w-2xl"
          >
            A curated showcase of my public development work, repositories, and open-source contributions.
          </motion.p>
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(0,210,255,0.5)]"></div>
            <span className="text-accent font-mono text-sm tracking-widest animate-pulse">SYNCING REPOSITORIES...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 p-8 rounded-3xl bg-black/40 border border-red-500/20 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
              <span className="text-red-400 text-2xl font-bold">!</span>
            </div>
            <h3 className="text-white text-lg font-bold tracking-wider mb-2">Connection Error</h3>
            <p className="text-red-400/80 font-mono text-sm text-center">{error}</p>
          </div>
        ) : repos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm max-w-2xl mx-auto text-center">
            <div className="text-gray-600 mb-6">
              <GithubIcon style={{ width: '48px', height: '48px' }} />
            </div>
            <h3 className="text-white text-xl font-bold tracking-wider mb-2">No Repositories Found</h3>
            <p className="text-gray-400 font-mono text-sm">Looks like there are no public repositories available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="group flex flex-col h-full p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(0,210,255,0.1)] transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Glow on Hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />
                
                {/* Header */}
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-black/40 text-gray-300 group-hover:text-accent transition-colors border border-white/5 shadow-inner">
                      <GithubIcon style={{ width: '20px', height: '20px' }} />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate max-w-[200px]">
                      {repo.name}
                    </h4>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-400/90 leading-relaxed mb-6 flex-grow relative z-10 min-h-[40px] line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>
                
                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-1.5 group-hover:border-white/20 transition-colors">
                        <Tag size={10} className="text-accent/70" />
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-transparent text-xs font-mono text-gray-500">
                        +{repo.topics.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                {/* Footer Stats & Date */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                        <span className="text-gray-300">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 group-hover:text-gray-200 transition-colors">
                      <Star size={14} className="text-yellow-500/80" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1.5 group-hover:text-gray-200 transition-colors">
                      <GitFork size={14} className="text-gray-500" />
                      {repo.forks_count}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                    <Calendar size={12} />
                    {formatDate(repo.updated_at)}
                  </div>
                </div>

                {/* View on GitHub Button */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold tracking-widest uppercase text-white flex items-center justify-center gap-2 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300 relative z-10 overflow-hidden"
                >
                  <span className="relative z-10">View on GitHub</span>
                  <ExternalLink size={16} className="relative z-10" />
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
