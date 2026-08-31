import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ManageCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState<any>({
    name: '', issuer: '', description: '', iconType: 'Award', colorClass: 'from-blue-500/20 to-cyan-500/20', borderClass: 'border-blue-500/50', textGlowClass: 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]', verifyUrl: ''
  });

  const fetchCertifications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/certifications`);
      const data = await res.json();
      if (data.success) setCertifications(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    
    const url = currentCert._id 
      ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/certifications/${currentCert._id}`
      : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/certifications`;
      
    const method = currentCert._id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentCert)
      });
      if (res.ok) {
        setIsEditing(false);
        fetchCertifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/certifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCertifications();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (cert: any = null) => {
    if (cert) {
      setCurrentCert(cert);
    } else {
      setCurrentCert({ name: '', issuer: '', description: '', iconType: 'Award', colorClass: 'from-blue-500/20 to-cyan-500/20', borderClass: 'border-blue-500/50', textGlowClass: 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]', verifyUrl: '' });
    }
    setIsEditing(true);
  };

  if (loading) return <div>Loading certifications...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Certifications</h2>
        {!isEditing && (
          <button onClick={() => startEdit()} className="px-4 py-2 bg-emerald-500 text-black rounded-md font-bold flex items-center gap-2 text-sm hover:bg-emerald-400">
            <Plus size={16} /> Add Certification
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{currentCert._id ? 'Edit Certification' : 'New Certification'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Name</label>
              <input type="text" value={currentCert.name} onChange={e => setCurrentCert({...currentCert, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Issuer</label>
              <input type="text" value={currentCert.issuer} onChange={e => setCurrentCert({...currentCert, issuer: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Description</label>
              <textarea value={currentCert.description} onChange={e => setCurrentCert({...currentCert, description: e.target.value})} rows={3} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Icon Type (Award, Cpu, BrainCircuit, Code, Database, ShieldCheck)</label>
              <input type="text" value={currentCert.iconType} onChange={e => setCurrentCert({...currentCert, iconType: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Verification URL (Optional)</label>
              <input type="text" value={currentCert.verifyUrl} onChange={e => setCurrentCert({...currentCert, verifyUrl: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-emerald-500 outline-none" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 text-black font-bold rounded hover:bg-emerald-400 flex items-center gap-2"><Save size={16}/> Save Certification</button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {certifications.map((cert) => (
            <motion.div key={cert._id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center hover:border-white/20 transition-colors">
              <div>
                <h4 className="font-bold text-white">{cert.name}</h4>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(cert)} className="p-2 text-gray-400 hover:text-white bg-black/30 rounded border border-white/5"><Edit2 size={16}/></button>
                <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded border border-red-500/20"><Trash2 size={16}/></button>
              </div>
            </motion.div>
          ))}
          {certifications.length === 0 && <div className="text-center text-gray-500 py-8">No certifications found.</div>}
        </div>
      )}
    </div>
  );
};
