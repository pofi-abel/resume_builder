import { Upload } from 'lucide-react';
import { Button } from './ui/Button';
import { useResume } from '../hooks/useResume';
import { ResumeData } from '../types';
import { useRef, useState } from 'react';

export const ImportButton = () => {
  const { setResumeData } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ResumeData;
        
        // Basic validation
        if (!data.personalInfo || !data.experience || !data.education) {
          throw new Error('Invalid resume data format');
        }
        
        // Migrate old data if needed
        if (data.sectionOrder && !data.sectionOrder.includes('personal-info')) {
          data.sectionOrder = ['personal-info', ...data.sectionOrder];
        }
        
        setResumeData(data);
        setError(null);
        alert('Resume data imported successfully!');
      } catch (err) {
        setError('Failed to import: Invalid JSON format');
        console.error('Import error:', err);
        alert('Failed to import resume data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      <Button 
        onClick={() => fileInputRef.current?.click()} 
        variant="outline" 
        size="sm"
        icon={<Upload size={14} />}
      >
        Import Data
      </Button>
      {error && (
        <div style={{ fontSize: '0.75rem', color: 'var(--color-error)', marginTop: '0.25rem' }}>
          {error}
        </div>
      )}
    </>
  );
};
