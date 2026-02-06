import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, priority = false }) => {
  return (
    <div 
      onClick={() => onClick(project.id)}
      className={`
        group relative overflow-hidden rounded-2xl cursor-pointer
        bg-neutral-900 border border-neutral-800
        transition-all duration-500 hover:border-neutral-600
        ${priority ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}
      `}
    >
      {/* Image Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-start mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
             <div className="flex gap-2">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs uppercase tracking-wider bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
             </div>
             <div className="bg-white text-black p-2 rounded-full">
                <ArrowUpRight size={16} />
             </div>
          </div>

          <h3 className={`font-bold text-white mb-1 ${priority ? 'text-3xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 group-hover:text-white transition-colors">
            {project.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};