import React from 'react';
import { Project } from '../../../types';
import { SectionVariant } from '../../../types/template';
import { Github, Globe } from 'lucide-react';

interface ProjectsSectionProps {
  data: Project[];
  variant: SectionVariant;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, variant }) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginBottom: 'var(--theme-spacing-section)' }}>
      <h3 style={{ 
        fontFamily: 'var(--theme-heading-family)',
        fontSize: '1.25em', 
        borderBottom: '2px solid var(--theme-color-border)', 
        paddingBottom: '0.25rem',
        marginBottom: '0.75rem',
        color: 'var(--theme-color-primary)'
      }}>
        Projects
      </h3>
      
      <div style={{ 
        display: variant === 'grid' ? 'grid' : 'flex', 
        flexDirection: variant === 'grid' ? undefined : 'column',
        gridTemplateColumns: variant === 'grid' ? 'repeat(auto-fit, minmax(250px, 1fr))' : undefined,
        gap: variant === 'grid' ? '1.5rem' : 'var(--theme-spacing-item)' 
      }}>
        {data.map((project) => (
          <div key={project.id} style={{
            border: variant === 'grid' ? '1px solid var(--theme-color-border)' : 'none',
            padding: variant === 'grid' ? '1rem' : '0',
            borderRadius: variant === 'grid' ? '8px' : '0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)' }}>
                {project.name}
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9em', flexShrink: 0, marginLeft: '0.5rem' }}>
                {project.githubUrl && (
                  <a href={project.githubUrl} style={{ color: 'var(--theme-color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                    <Github size={12} /> {variant !== 'grid' && 'Code'}
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} style={{ color: 'var(--theme-color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                    <Globe size={12} /> {variant !== 'grid' && 'Live'}
                  </a>
                )}
              </div>
            </div>
            
            <p style={{ fontSize: '0.95em', lineHeight: '1.5', marginTop: '0.25rem', color: 'var(--theme-color-text)' }}>
              {project.description}
            </p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                {project.technologies.map((tech, index) => (
                  <span key={index} style={{ 
                    fontSize: '0.85em', 
                    color: 'var(--theme-color-text-muted)',
                    backgroundColor: 'var(--theme-color-secondary)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
