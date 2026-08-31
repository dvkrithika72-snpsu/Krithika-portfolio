import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({
    title: '', description: '', category: 'Software Engineering', image: '', techInput: '', highlightsInput: ''
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/projects`);
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    
    // Parse comma-separated inputs
    const technologies = currentProject.techInput ? currentProject.techInput.split(',').map((s: string) => s.trim()) : [];
    const features = currentProject.highlightsInput ? currentProject.highlightsInput.split('\n').map((s: string) => s.trim()).filter(Boolean) : [];

    const payload = {
      ...currentProject,
      technologies,
      features
    };

    const url = currentProject._id 
      ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/projects/${currentProject._id}`
      : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/projects`;
      
    const method = currentProject._id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsEditing(false);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/portfolio/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (project: any = null) => {
    if (project) {
      setCurrentProject({
        ...project,
        techInput: project.technologies?.join(', ') || '',
        highlightsInput: project.features?.join('\n') || ''
      });
    } else {
      setCurrentProject({ title: '', description: '', category: 'Software Engineering', image: '', techInput: '', highlightsInput: '' });
    }
    setIsEditing(true);
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Projects</h2>
        {!isEditing && (
          <button onClick={() => startEdit()} className="px-4 py-2 bg-accent text-black rounded-md font-bold flex items-center gap-2 text-sm hover:bg-[#00bfff]">
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{currentProject._id ? 'Edit Project' : 'New Project'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Title</label>
              <input type="text" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Category</label>
              <input type="text" value={currentProject.category} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Image URL</label>
              <input type="text" value={currentProject.image} onChange={e => setCurrentProject({...currentProject, image: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" placeholder="/projects/my_project.jpg or https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Description</label>
              <textarea value={currentProject.description} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} rows={3} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Technologies (comma separated)</label>
              <input type="text" value={currentProject.techInput} onChange={e => setCurrentProject({...currentProject, techInput: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" placeholder="React, Node, Python..." />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Highlights / Features (one per line)</label>
              <textarea value={currentProject.highlightsInput} onChange={e => setCurrentProject({...currentProject, highlightsInput: e.target.value})} rows={4} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 mt-1 focus:border-accent outline-none" placeholder="Implemented X...&#10;Designed Y..." />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-accent text-black font-bold rounded hover:bg-[#00bfff] flex items-center gap-2"><Save size={16}/> Save Project</button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <motion.div key={project._id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center hover:border-white/20 transition-colors">
              <div>
                <h4 className="font-bold text-white">{project.title}</h4>
                <p className="text-sm text-gray-400">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(project)} className="p-2 text-gray-400 hover:text-white bg-black/30 rounded border border-white/5"><Edit2 size={16}/></button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded border border-red-500/20"><Trash2 size={16}/></button>
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && <div className="text-center text-gray-500 py-8">No projects found.</div>}
        </div>
      )}
    </div>
  );
};
