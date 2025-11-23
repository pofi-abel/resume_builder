import { useResume } from '../hooks/useResume';
import { SectionId, defaultSectionOrder } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowUp, ArrowDown } from 'lucide-react';

const sectionLabels: Record<SectionId, string> = {
  'personal-info': 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  customSections: 'Custom Sections',
};

export const SectionOrderEditor = () => {
  const { resumeData, reorderSections } = useResume();
  const sectionOrder = resumeData.sectionOrder || defaultSectionOrder;

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    reorderSections(newOrder);
  };

  return (
    <Card title="Section Order">
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
        Reorder how sections appear in your resume
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {sectionOrder.map((sectionId, index) => (
          <div
            key={sectionId}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'var(--color-surface-hover)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>
              {index + 1}. {sectionLabels[sectionId]}
            </span>
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                icon={<ArrowUp size={14} />}
                aria-label="Move up"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSection(index, 'down')}
                disabled={index === sectionOrder.length - 1}
                icon={<ArrowDown size={14} />}
                aria-label="Move down"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
