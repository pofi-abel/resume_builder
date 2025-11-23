import React from 'react';
import { Skill } from '../../../types';
import { SectionVariant } from '../../../types/template';

interface SkillsSectionProps {
  data: Skill[];
  variant: SectionVariant;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data, variant }) => {
  if (!data || data.length === 0) return null;

  // Group skills by category if needed, but for now flat list
  // Assuming data is flat list of skills with categories
  
  const groupedSkills = data.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
        Skills
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category}>
            <h4 style={{ fontSize: '1em', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--theme-color-text)' }}>
              {category}
            </h4>
            
            {variant === 'bubbles' || variant === 'tags' ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{
                    backgroundColor: variant === 'bubbles' ? 'var(--theme-color-secondary)' : 'transparent',
                    border: variant === 'tags' ? '1px solid var(--theme-color-border)' : 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: variant === 'bubbles' ? '999px' : '4px',
                    fontSize: '0.9em',
                  }}>
                    {skill.name} {skill.level ? `(${skill.level})` : ''}
                  </span>
                ))}
              </div>
            ) : variant === 'bullet-list' ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                {skills.map((skill, idx) => (
                  <span key={skill.id} style={{ fontSize: '0.95em', color: 'var(--theme-color-text-muted)' }}>
                    {skill.name}{idx < skills.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            ) : variant === 'sidebar' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skills.map((skill) => (
                  <div key={skill.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontSize: '0.9em'
                  }}>
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span style={{ 
                        fontSize: '0.85em', 
                        color: 'var(--theme-color-text-muted)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px'
                      }}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.95em', lineHeight: '1.5' }}>
                {skills.map(s => s.name).join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
