import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Menu, X, Download, ArrowLeft, Mail, Linkedin, Dribbble, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { PROJECTS, EXPERIENCE } from './constants';
import { Button } from './components/Button';
import { ProjectCard } from './components/ProjectCard';
import { Project } from './types';

// --- Components defined here for simplicity in file structure requests ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          RAW GALLERY<span className="text-neutral-500">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={`hover:text-neutral-400 transition-colors ${isActive('/') ? 'text-white' : 'text-neutral-400'}`}>WORK</Link>
          <Link to="/about" className={`hover:text-neutral-400 transition-colors ${isActive('/about') ? 'text-white' : 'text-neutral-400'}`}>ABOUT</Link>
          <Link to="/contact" className={`hover:text-neutral-400 transition-colors ${isActive('/contact') ? 'text-white' : 'text-neutral-400'}`}>CONTACT</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 text-2xl font-light">
            <Link to="/" onClick={() => setIsOpen(false)}>WORK</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>ABOUT</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-neutral-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} Ronald Walker. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/ron-walker-2a33a67a/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="https://dribbble.com/rawgallery" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Dribbble size={20} /></a>
          <a href="mailto:ronaldwalk3r@gmail.com" className="text-neutral-400 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

const ProjectListRow: React.FC<{ project: Project; onClick: (id: string) => void }> = ({ project, onClick }) => (
  <div 
    onClick={() => onClick(project.id)}
    className="group flex items-center justify-between py-6 border-b border-neutral-900 hover:bg-neutral-900/40 transition-colors cursor-pointer px-2 -mx-2 rounded-lg"
  >
    <div className="flex items-center gap-6">
       <div className="w-16 h-12 rounded overflow-hidden hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
         <img src={project.thumbnailUrl} className="w-full h-full object-cover" alt="" />
       </div>
       <div>
         <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">{project.title}</h3>
         <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors hidden sm:block">{project.client} — {project.subtitle}</p>
       </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex gap-2">
        {project.tags.slice(0,2).map(tag => (
          <span key={tag} className="text-xs text-neutral-600 border border-neutral-800 px-3 py-1 rounded-full whitespace-nowrap">
            {tag}
          </span>
        ))}
      </div>
      <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
        <ArrowUpRight size={18} />
      </div>
    </div>
  </div>
);

// --- Pages ---

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Split projects into featured grid (top 6) and list view (rest)
  const featuredProjects = PROJECTS.slice(0, 6);
  const archiveProjects = PROJECTS.slice(6);

  return (
    <div className="min-h-screen pt-32 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <header className="mb-24 pt-8">
          <div className="space-y-12">
            <h1 className="text-6xl md:text-9xl font-bold leading-[0.85] tracking-tighter max-w-6xl">
              Designing systems <br /> for human potential.
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border-l border-neutral-800 pl-6 md:pl-0 md:border-l-0">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 border border-neutral-800 bg-neutral-900">
                  <img 
                    src="/profile.png" 
                    alt="Ronald Walker" 
                    className="w-full h-full object-cover" 
                  />
               </div>
               <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light max-w-2xl">
                  <span className="text-white font-normal">Lead Product Designer</span> specializing in observability platforms and intuitive, AI-driven experiences. 
                  <span className="block mt-2">Currently crafting the future at <span className="text-white font-normal">New Relic</span>.</span>
               </p>
            </div>
          </div>
        </header>

        {/* Intelligent Bento Grid - Increased Spacing */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-4">
           <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">Featured Work</h2>
           <span className="text-xs text-neutral-600 hidden md:inline-block">2016 — Present</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[360px] mb-20">
          {featuredProjects.map((project, index) => {
            // Custom Layout Logic for Bento Grid
            // Item 0: Large (2x2)
            // Item 1, 2: Standard (1x1) stacked on right
            // Item 3, 4, 5: Standard row
            let classes = "md:col-span-1 md:row-span-1";
            if (index === 0) classes = "md:col-span-2 md:row-span-2";
            
            return (
              <div key={project.id} className={classes}>
                <ProjectCard 
                  project={project} 
                  onClick={(id) => navigate(`/project/${id}`)}
                  priority={index === 0} // Passes style cue to card
                />
              </div>
            );
          })}
        </div>

        {/* Archive List View */}
        {archiveProjects.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
               <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">Selected Archive</h2>
               <span className="text-xs text-neutral-600">{archiveProjects.length} projects</span>
            </div>
            <div className="space-y-1">
              {archiveProjects.map((project) => (
                <ProjectListRow 
                  key={project.id} 
                  project={project} 
                  onClick={(id) => navigate(`/project/${id}`)} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const handleDownloadResume = () => {
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Ensure a file named 'resume.pdf' is in the public folder
    link.setAttribute('download', 'Ronald_Walker_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
        <div className="flex-1 mt-4 md:mt-0">
          <div className="prose prose-invert prose-lg text-neutral-300 mb-8">
            <p className="mb-6 text-xl text-white font-medium leading-relaxed">
              I view myself as a creative liaison between people and products, driven by a passion for leveraging the intrinsic power of brands in novel ways.
            </p>
            <p>
              Specializing in cloud software and SaaS, I design comprehensive B2B experiences that cover the full UX spectrum—from foundational user research and rapid prototyping to high-fidelity UI design and the stewardship of complex design systems.
            </p>
          </div>
          <Button onClick={handleDownloadResume} icon={<Download size={18} />}>
            Download Resume
          </Button>
        </div>
        <div className="w-full md:w-1/3 aspect-square relative rounded-full overflow-hidden bg-neutral-800 border border-neutral-800">
          <img 
            src="/profile.png" 
            alt="Ronald Walker" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-16">
        <h2 className="text-3xl font-bold mb-10">Experience</h2>
        <div className="space-y-12">
          {EXPERIENCE.map((job) => (
            <div key={job.id} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-neutral-500 font-mono text-sm pt-1">
                {job.startDate} — {job.endDate}
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                <div className="text-neutral-400 mb-4">{job.company}, {job.location}</div>
                <p className="text-neutral-300 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const email = "ronaldwalk3r@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset form after a delay if needed
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info Side */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's work <br/> together.</h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
              I'm always interested in discussing new projects, creative opportunities, or design partnerships. 
              Currently based in San Francisco, but available for remote work worldwide.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Email Widget */}
            <div 
              onClick={handleCopyEmail}
              className="group cursor-pointer bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-neutral-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500 font-mono uppercase tracking-wider">Email</span>
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-neutral-500 group-hover:text-white transition-colors" />}
              </div>
              <div className="text-xl md:text-2xl font-medium text-white group-hover:text-neutral-200 transition-colors truncate">
                {email}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-white font-medium">Los Angeles, CA</div>
                <div className="text-sm text-neutral-500">Local time: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' })}</div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://linkedin.com/in/ron-walker-2a33a67a/" },
                { icon: <Dribbble size={24} />, label: "Dribbble", href: "https://dribbble.com/rawgallery" },
                { icon: <Mail size={24} />, label: "Email", href: `mailto:${email}` }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target={social.label !== 'Email' ? "_blank" : undefined}
                  rel={social.label !== 'Email' ? "noopener noreferrer" : undefined}
                  className="w-14 h-14 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Form Side */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-8 md:p-10">
          {formState === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-2">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-neutral-400 max-w-xs">
                Thanks for reaching out. I'll get back to you within 24-48 hours.
              </p>
              <Button onClick={() => setFormState('idle')} variant="outline" className="mt-6">
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  placeholder="What's your name?"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="your@email.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-400 mb-2">Subject</label>
                <select 
                  id="subject" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none"
                >
                  <option>Project Inquiry</option>
                  <option>Freelance Availability</option>
                  <option>Speaking Opportunity</option>
                  <option>Job Opportunity</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full justify-center" 
                  icon={formState === 'submitting' ? undefined : <Send size={18} />}
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-neutral-400 hover:text-white flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" /> 
          Back to Work
        </Link>

        {/* Project Header */}
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-neutral-800 text-neutral-400 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-8xl font-bold leading-none tracking-tighter mb-6">{project.title}</h1>
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-relaxed">{project.subtitle}</p>
            </div>
            
            <div className="hidden md:block">
              <Button icon={<ArrowUpRight size={18} />}>Visit Live Site</Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <img src={project.images[0]?.url || project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </header>

        {/* Project Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24">
          
          {/* Sticky Sidebar */}
          <div className="md:col-span-4 space-y-12 h-fit md:sticky md:top-32">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">Client</h3>
              <p className="text-xl font-medium">{project.client}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">Role & Scope</h3>
              <p className="text-xl text-neutral-300">{project.scopeAndTeam}</p>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">Impact</h3>
              <p className="text-xl text-neutral-300">{project.impact}</p>
            </div>

            <div className="block md:hidden pt-8">
               <Button className="w-full justify-center" icon={<ArrowUpRight size={18} />}>Visit Live Site</Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-xl text-neutral-400 leading-relaxed">{project.problemStatement}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-xl text-neutral-400 leading-relaxed mb-8">{project.overview}</p>
              
              {/* Additional Images */}
              <div className="space-y-8">
                {project.images.slice(1).map((img, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
                      <img src={img.url} alt={img.caption} className="w-full h-auto" />
                    </div>
                    <p className="text-sm text-neutral-500 text-center">{img.caption}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Next Project Nav */}
        <div className="border-t border-neutral-900 pt-12 flex justify-between items-center">
           <Link to="/" className="text-neutral-500 hover:text-white transition-colors">Back to Home</Link>
           {/* Logic to find next project could go here */}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;