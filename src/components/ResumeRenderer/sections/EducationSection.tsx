import React from 'react';
import { Education } from '../../../types';
import { SectionVariant } from '../../../types/template';

interface EducationSectionProps {
  data: Education[];
  variant: SectionVariant;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data, variant }) => {
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
        Education
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--theme-spacing-item)' }}>
        {data.map((edu) => (
          <div key={edu.id}>
            {variant === 'minimal' ? (
              <div style={{ marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)', marginBottom: '0.25rem' }}>
                  {edu.school}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1em', color: 'var(--theme-color-text-muted)' }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                  </span>
                  <span style={{ fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)' }}>
                    {edu.school}
                  </h4>
                  <span style={{ fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                
                <div style={{ fontSize: '1em', color: 'var(--theme-color-primary)' }}>
                  {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                </div>
              </>
            )}
            
            {edu.description && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.95em', lineHeight: '1.5' }}>
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
