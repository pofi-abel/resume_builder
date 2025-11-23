import { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TextArea } from './ui/Input';
import { Sparkles, Loader2 } from 'lucide-react';
import { TemplateConfig } from '../types/template';
import { useCustomTemplates } from '../hooks/useCustomTemplates';
import { useResume } from '../hooks/useResume';

const EXAMPLE_PROMPTS = [
  "A creative template with purple accents, large name, and skills in a grid",
  "A conservative corporate template with navy blue, serif fonts, and traditional layout",
  "A minimal tech-focused template with monospace font and dark mode colors",
  "An elegant template with gold accents, centered layout, and lots of white space",
];

export const TemplateGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedTemplate, setGeneratedTemplate] = useState<TemplateConfig | null>(null);
  const { saveCustomTemplate } = useCustomTemplates();
  const { setSelectedTemplate } = useResume();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedTemplate(null);

    try {
      const response = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate template');
      }

      const template: TemplateConfig = await response.json();
      setGeneratedTemplate(template);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate template');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndApply = () => {
    if (!generatedTemplate) return;
    
    saveCustomTemplate(generatedTemplate);
    setSelectedTemplate(generatedTemplate.id as any);
    setPrompt('');
    setGeneratedTemplate(null);
    alert(`Template "${generatedTemplate.name}" saved and applied!`);
  };

  const handleRegenerate = () => {
    setGeneratedTemplate(null);
  };

  return (
    <Card title="AI Template Generator">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Describe your ideal resume template and let AI generate it for you.
        </p>

        {/* Example Prompts */}
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
            Example prompts:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {EXAMPLE_PROMPTS.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(example)}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  padding: '0.25rem 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  textDecoration: 'underline',
                }}
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <TextArea
          label="Describe your template"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., A modern template with blue sidebar, skills as bubbles, and compact experience layout..."
          rows={4}
          disabled={loading}
        />

        {/* Error Message */}
        {error && (
          <div style={{ 
            padding: 'var(--spacing-sm)', 
            backgroundColor: '#fee', 
            border: '1px solid #fcc',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            color: '#c00'
          }}>
            {error}
          </div>
        )}

        {/* Generated Template Preview */}
        {generatedTemplate && (
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Generated: {generatedTemplate.name}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              {generatedTemplate.description}
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <Button onClick={handleSaveAndApply} size="sm">
                Save & Apply
              </Button>
              <Button onClick={handleRegenerate} variant="ghost" size="sm">
                Regenerate
              </Button>
            </div>
          </div>
        )}

        {/* Generate Button */}
        {!generatedTemplate && (
          <Button 
            onClick={handleGenerate} 
            disabled={loading || !prompt.trim()}
            icon={loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
          >
            {loading ? 'Generating...' : 'Generate Template'}
          </Button>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Card>
  );
};
