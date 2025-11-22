import { useResume } from '../hooks/useResume';
import { ResumeTemplate } from '../types';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const templates: Array<{ id: ResumeTemplate; name: string; description: string }> = [
  { id: 'classic', name: 'Classic', description: 'Traditional professional resume' },
  { id: 'modern', name: 'Modern', description: 'Two-column with accent colors' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and spacious design' },
];

export const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--spacing-sm)' }}>
        Choose Template
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
        {templates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              position: 'relative',
              padding: 'var(--spacing-md)',
              backgroundColor: selectedTemplate === template.id ? 'var(--color-primary)' : 'var(--color-surface)',
              border: `2px solid ${selectedTemplate === template.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
          >
            {selectedTemplate === template.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  width: '1.25rem',
                  height: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={14} color="var(--color-primary)" strokeWidth={3} />
              </div>
            )}
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: selectedTemplate === template.id ? 'white' : 'var(--color-text)', marginBottom: '0.25rem' }}>
              {template.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: selectedTemplate === template.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)' }}>
              {template.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
