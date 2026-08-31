import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const VerifyContact: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const verifyToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link may be expired or invalid.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error. Unable to verify at this time.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-primary text-primary-foreground">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-panel p-8 md:p-12 rounded-2xl border border-border/50 bg-black/40 backdrop-blur-xl text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {status === 'loading' && (
              <>
                <Loader2 size={48} className="text-accent animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Verifying Email...</h2>
                <p className="text-gray-400">Please wait while we confirm your email address.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">✓ Message Sent Successfully</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your email has been verified and your enquiry has been successfully received. 
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ArrowLeft size={18} /> Return to Portfolio
                </button>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6">
                  <XCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Verification Failed</h2>
                <p className="text-gray-400">{message}</p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ArrowLeft size={18} /> Return to Portfolio
                </button>
              </>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
