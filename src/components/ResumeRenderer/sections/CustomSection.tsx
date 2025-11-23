import React from 'react';
import { CustomSection as CustomSectionType } from '../../../types';
import { SectionVariant } from '../../../types/template';

interface CustomSectionProps {
  section: CustomSectionType;
  variant: SectionVariant;
}

export const CustomSection: React.FC<CustomSectionProps> = ({ section, variant }) => {
  if (!section.items || section.items.length === 0) return null;

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
        {section.title}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--theme-spacing-item)' }}>
        {section.items.map((item) => (
          <div key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h4 style={{ fontSize: '1.1em', fontWeight: 'bold', color: 'var(--theme-color-text)' }}>
                {item.title}
              </h4>
              <span style={{ fontSize: '0.9em', color: 'var(--theme-color-text-muted)' }}>
                {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
              </span>
            </div>
            
            {item.subtitle && (
              <div style={{ fontSize: '1em', color: 'var(--theme-color-primary)', marginBottom: '0.25rem' }}>
                {item.subtitle}
              </div>
            )}
            
            <p style={{ whiteSpace: 'pre-line', fontSize: '0.95em', lineHeight: '1.5' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
