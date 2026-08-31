import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BootSequence } from './components/layout/BootSequence';
import { Hero } from './features/identity/Hero';
import { DigitalIdentity } from './features/identity/DigitalIdentity';
import { Experience } from './features/academic/Experience';
import { ProjectArchive } from './features/projects/ProjectArchive';
import { OpenSource } from './features/projects/OpenSource';
import { Education } from './features/academic/Education';
import { SkillOctagon } from './features/stack/SkillOctagon';
import { Hackathons } from './features/hackathons/Hackathons';
import { Achievements } from './features/academic/Achievements';
import { Certifications } from './features/academic/Certifications';
import { Contact } from './features/contact/Contact';
import { VerifyContact } from './features/contact/VerifyContact';
import { PortfolioAssistant } from './features/assistant/PortfolioAssistant';
import { Login } from './features/admin/Login';
import { Dashboard } from './features/admin/Dashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PortfolioHome = ({ isBooted, setIsBooted }: { isBooted: boolean, setIsBooted: (v: boolean) => void }) => (
  <div className="relative">
    {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
    <div className={`transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
      <Navbar />
      <main>
        <Hero />
        <DigitalIdentity />
        <Experience />
        <ProjectArchive />
        <OpenSource />
        <Education />
        <SkillOctagon />
        <Hackathons />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <PortfolioAssistant />
    </div>
  </div>
);

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Shift + Alt + K
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary text-primary-foreground font-sans selection:bg-accent selection:text-primary relative">
      <Routes>
        <Route path="/" element={<PortfolioHome isBooted={isBooted} setIsBooted={setIsBooted} />} />
        <Route path="/verify-contact/:token" element={<VerifyContact />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
