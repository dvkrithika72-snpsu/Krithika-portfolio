import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Terminal, Mail, RefreshCw, Briefcase, Award } from 'lucide-react';
import { ManageProjects } from './ManageProjects';
import { ManageCertifications } from './ManageCertifications';
import { ManageInquiries } from './ManageInquiries';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'certifications'>('messages');
  const navigate = useNavigate();

  // Navigation/Auth checks only
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-center text-accent">
              <Terminal size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-widest">COMMAND CENTER</h1>
              <p className="text-sm font-mono text-gray-500 uppercase">Incoming Transmissions</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all flex items-center gap-2 font-mono text-sm"
            >
              <RefreshCw size={16} />
              SYNC
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all flex items-center gap-2 font-mono text-sm"
            >
              <LogOut size={16} />
              DISCONNECT
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                activeTab === 'messages' 
                  ? 'bg-accent/10 border-accent text-white' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Mail size={18} className={activeTab === 'messages' ? 'text-accent' : ''} />
              <span className="font-bold tracking-wide">Inquiries</span>
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                activeTab === 'projects' 
                  ? 'bg-accent/10 border-accent text-white' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Briefcase size={18} className={activeTab === 'projects' ? 'text-accent' : ''} />
              <span className="font-bold tracking-wide">Projects</span>
            </button>
            <button 
              onClick={() => setActiveTab('certifications')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                activeTab === 'certifications' 
                  ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Award size={18} className={activeTab === 'certifications' ? 'text-emerald-500' : ''} />
              <span className="font-bold tracking-wide">Certifications</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'messages' && <ManageInquiries />}
            {activeTab === 'projects' && <ManageProjects />}
            {activeTab === 'certifications' && <ManageCertifications />}
          </div>
        </div>

      </div>
    </div>
  );
};
