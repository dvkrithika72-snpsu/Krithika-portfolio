import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Trash2, Clock, Sparkles, AlertTriangle } from 'lucide-react';

export interface InquiryMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  emailStatus: 'pending' | 'verified';
  aiCategory?: string;
  aiSummary?: string;
  aiPriority?: 'High' | 'Medium' | 'Low';
  aiTone?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export const ManageInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setInquiries(data.data || []);
      } else {
        setError('Failed to fetch inquiries');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status: newStatus as any } : inq));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = search.toLowerCase() === '' || 
      inq.name.toLowerCase().includes(search.toLowerCase()) || 
      inq.email.toLowerCase().includes(search.toLowerCase()) || 
      inq.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesPriority = filterPriority === '' || inq.aiPriority === filterPriority;
    const matchesStatus = filterStatus === '' || inq.status === filterStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'Oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'Highest Priority') {
      const p = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return (p[b.aiPriority || 'Medium'] || 0) - (p[a.aiPriority || 'Medium'] || 0);
    }
    // Default Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getPriorityColor = (priority?: string) => {
    if (priority === 'High') return 'bg-red-500/20 text-red-400 border-red-500/50';
    if (priority === 'Medium') return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
  };

  if (loading && inquiries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent/50"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select 
            value={filterPriority} 
            onChange={e => setFilterPriority(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent/50 appearance-none"
          >
            <option value="">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent/50 appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>

          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent/50 appearance-none"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Highest Priority">Highest Priority</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Inquiries List */}
      <div className="grid gap-6">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 border border-white/10 rounded-2xl bg-white/5 text-center flex flex-col items-center">
            <h3 className="text-xl font-medium text-gray-400">No Inquiries Found</h3>
          </div>
        ) : (
          filteredInquiries.map((inq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={inq._id}
              className={`p-6 md:p-8 rounded-2xl border ${inq.emailStatus === 'pending' ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 bg-black/40'} backdrop-blur-md hover:border-accent/30 transition-colors group flex flex-col`}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className={`text-xl font-bold transition-colors ${inq.emailStatus === 'pending' ? 'text-gray-400' : 'text-white group-hover:text-accent'}`}>{inq.name.toUpperCase()}</h3>
                    
                    {inq.emailStatus === 'verified' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 uppercase flex items-center gap-1">
                        ✓ VERIFIED
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/50 uppercase flex items-center gap-1">
                        <AlertTriangle size={10} /> EMAIL VERIFICATION PENDING
                      </span>
                    )}

                    {inq.emailStatus === 'verified' && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${getPriorityColor(inq.aiPriority)} uppercase`}>
                        {inq.aiPriority || 'Medium'} PRIORITY
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-400">
                    <a href={inq.emailStatus === 'verified' ? `mailto:${inq.email}` : '#'} className={`${inq.emailStatus === 'verified' ? 'hover:text-accent' : 'cursor-not-allowed opacity-50'} flex items-center gap-1.5`}>
                      <Mail size={14} /> {inq.email}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq._id, e.target.value)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-white focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="new">STATUS: NEW</option>
                    <option value="read">STATUS: READ</option>
                    <option value="replied">STATUS: REPLIED</option>
                  </select>
                  <button 
                    onClick={() => deleteInquiry(inq._id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* AI Insights */}
              {(inq.emailStatus === 'verified' && (inq.aiSummary || inq.aiCategory)) && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-transparent border-l-2 border-accent">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold tracking-wider uppercase">AI Analysis</span>
                  </div>
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "{inq.aiSummary}"
                  </p>
                  {inq.aiCategory && (
                    <p className="text-xs text-gray-500 mt-2 font-mono">Category: {inq.aiCategory}</p>
                  )}
                </div>
              )}
              
              {/* Message */}
              <div className="p-5 bg-white/5 rounded-xl border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap mb-6">
                {inq.message}
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {inq.emailStatus === 'verified' ? (
                  <a 
                    href={`mailto:${inq.email}?subject=Re: Your Inquiry`} 
                    className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Mail size={16} /> Reply via Email
                  </a>
                ) : (
                  <button 
                    disabled
                    className="px-4 py-2 bg-gray-500/10 border border-gray-500/30 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed flex items-center gap-2"
                  >
                    <Mail size={16} /> Reply via Email (Requires Verification)
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
