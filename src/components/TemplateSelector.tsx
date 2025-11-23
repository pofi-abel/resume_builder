import { useResume } from '../hooks/useResume';
import { ResumeTemplate } from '../types';
import { Check, Trash2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomTemplates } from '../hooks/useCustomTemplates';
import { useState } from 'react';
import { TemplateGenerator } from './TemplateGenerator';

const templates: Array<{ id: ResumeTemplate; name: string; description: string; preview: string }> = [
  { id: 'classic', name: 'Classic', description: 'Traditional professional resume', preview: '/templates/classic-preview.png' },
  { id: 'modern', name: 'Modern', description: 'Two-column with accent colors', preview: '/templates/modern-preview.png' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and spacious design', preview: '/templates/minimal-preview.png' },
];

export const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const { customTemplates, deleteCustomTemplate } = useCustomTemplates();
  const [showGenerator, setShowGenerator] = useState(false);

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this custom template?')) {
      deleteCustomTemplate(id);
      if (selectedTemplate === id) {
        setSelectedTemplate('classic');
      }
    }
  };

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
          Choose Template
        </h3>
        <button
          onClick={() => setShowGenerator(!showGenerator)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: 'var(--color-primary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
          }}
        >
          <Sparkles size={14} />
          {showGenerator ? 'Hide' : 'Generate with AI'}
        </button>
      </div>

      {showGenerator && (
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <TemplateGenerator />
        </div>
      )}

      {/* Built-in Templates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--spacing-md)', marginBottom: customTemplates.length > 0 ? 'var(--spacing-lg)' : 0 }}>
        {templates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            style={{
              position: 'relative',
              padding: 0,
              backgroundColor: 'var(--color-surface)',
              border: `3px solid ${selectedTemplate === template.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              overflow: 'hidden',
              boxShadow: selectedTemplate === template.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {selectedTemplate === template.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <Check size={16} color="white" strokeWidth={3} />
              </div>
            )}
            
            <div style={{ 
              width: '100%', 
              height: '200px', 
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={template.preview} 
                alt={`${template.name} template preview`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'top'
                }}
              />
            </div>
            
            <div style={{ 
              padding: 'var(--spacing-sm) var(--spacing-md)',
              textAlign: 'left',
              backgroundColor: selectedTemplate === template.id ? 'var(--color-primary)' : 'white'
            }}>
              <div style={{ 
                fontWeight: 600, 
                fontSize: '0.875rem', 
                color: selectedTemplate === template.id ? 'white' : 'var(--color-text)', 
                marginBottom: '0.125rem' 
              }}>
                {template.name}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: selectedTemplate === template.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)',
                lineHeight: '1.3'
              }}>
                {template.description}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Custom Templates */}
      {customTemplates.length > 0 && (
        <>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)', textTransform: 'uppercase' }}>
            Custom Templates
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--spacing-md)' }}>
            {customTemplates.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id as any)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: 'relative',
                  padding: 'var(--spacing-md)',
                  backgroundColor: selectedTemplate === template.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  border: `3px solid ${selectedTemplate === template.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  boxShadow: selectedTemplate === template.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
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
                      width: '1.5rem',
                      height: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Check size={16} color="var(--color-primary)" strokeWidth={3} />
                  </div>
                )}
                
                <button
                  onClick={(e) => handleDeleteCustom(template.id, e)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem',
                    backgroundColor: '#fee',
                    border: 'none',
                    borderRadius: '50%',
                    width: '1.5rem',
                    height: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  <Trash2 size={12} color="#c00" />
                </button>

                <div style={{ 
                  fontWeight: 600, 
                  fontSize: '0.875rem', 
                  color: selectedTemplate === template.id ? 'white' : 'var(--color-text)', 
                  marginBottom: '0.125rem' 
                }}>
                  {template.name}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: selectedTemplate === template.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)',
                  lineHeight: '1.3'
                }}>
                  {template.description}
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
