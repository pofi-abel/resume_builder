import React from 'react';
import { Experience } from '../../../types';
import { SectionVariant } from '../../../types/template';

interface ExperienceSectionProps {
  data: Experience[];
  variant: SectionVariant;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, variant }) => {
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
        Experience
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--theme-spacing-item)' }}>
        {data.map((exp) => (
          <div key={exp.id} style={{ 
            display: 'flex', 
            flexDirection: variant === 'timeline' ? 'row' : 'column',
            gap: variant === 'timeline' ? '1rem' : '0.25rem'
          }}>
            {variant === 'timeline' && (
              <div style={{ minWidth: '120px', fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                {exp.startDate} - {exp.endDate}
              </div>
            )}
            
            <div style={{ flex: 1 }}>
              {variant === 'minimal' ? (
                <div style={{ marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)', marginBottom: '0.25rem' }}>
                    {exp.position}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '1em', color: 'var(--theme-color-text-muted)', fontWeight: 500 }}>
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </span>
                    <span style={{ fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>
              ) : variant === 'compact' ? (
                <div style={{ marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.05em', fontWeight: 'bold', color: 'var(--theme-color-text)', margin: 0 }}>
                      {exp.position}
                    </h4>
                    <span style={{ fontSize: '0.95em', color: 'var(--theme-color-primary)' }}>
                      @ {exp.company}
                    </span>
                    <span style={{ fontSize: '0.85em', color: 'var(--theme-color-text-muted)' }}>
                      ({exp.startDate} - {exp.endDate})
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)' }}>
                      {exp.position}
                    </h4>
                    {variant !== 'timeline' && (
                      <span style={{ fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '1em', color: 'var(--theme-color-primary)', marginBottom: '0.25rem' }}>
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                </>
              )}
              
              <p style={{ whiteSpace: 'pre-line', fontSize: variant === 'compact' ? '0.9em' : '0.95em', lineHeight: '1.5' }}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
