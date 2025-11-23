import { useState } from 'react';
import { X, Sparkles, Eye } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import { TemplateGenerator } from './TemplateGenerator';
import { Button } from './ui/Button';
import { Preview } from './Preview/Preview';

interface TemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateDialog = ({ isOpen, onClose }: TemplateDialogProps) => {
  const [activeTab, setActiveTab] = useState<'select' | 'generate' | 'preview'>('select');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: activeTab === 'preview' ? '1200px' : '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text)' }}>
            Template Manager
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={24} color="var(--color-text-muted)" />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0 var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <button
            onClick={() => setActiveTab('select')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'select' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === 'select' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'select' ? 600 : 400,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Select Template
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'generate' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === 'generate' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'generate' ? 600 : 400,
              cursor: 'pointer',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Sparkles size={14} />
            Generate with AI
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'preview' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === 'preview' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'preview' ? 600 : 400,
              cursor: 'pointer',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: 'var(--spacing-lg)',
        }}>
          {activeTab === 'select' && <TemplateSelector />}
          {activeTab === 'generate' && <TemplateGenerator />}
          {activeTab === 'preview' && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 'var(--spacing-lg)',
            }}>
              <div style={{
                transform: 'scale(0.8)',
                transformOrigin: 'top center',
              }}>
                <Preview />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
