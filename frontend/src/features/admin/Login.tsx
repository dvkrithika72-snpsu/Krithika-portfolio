import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent border border-accent/20 shadow-[0_0_20px_rgba(0,210,255,0.3)] mb-6">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-widest text-white mb-2">SYSTEM LOGIN</h2>
          <p className="text-accent/60 font-mono text-sm tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl border border-border/50 bg-black/40 backdrop-blur-xl shadow-2xl relative">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 tracking-wider uppercase">Admin ID</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-mono"
                placeholder="Enter ID..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 tracking-wider uppercase">Passcode</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 rounded-lg font-bold font-mono tracking-widest flex items-center justify-center gap-3 bg-accent/90 text-black hover:bg-accent hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] transition-all disabled:opacity-50"
            >
              {isLoading ? 'AUTHENTICATING...' : (
                <>
                  <Lock size={18} />
                  ACCESS TERMINAL
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-xs font-mono text-gray-500 hover:text-accent transition-colors">
            &larr; RETURN TO PUBLIC MATRIX
          </button>
        </div>
      </motion.div>
    </div>
  );
};
