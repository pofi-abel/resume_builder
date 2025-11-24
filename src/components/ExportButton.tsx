import { Download } from 'lucide-react';
import { Button } from './ui/Button';
import { useResume } from '../hooks/useResume';

export const ExportButton = () => {
  const { resumeData } = useResume();

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      size="sm"
      icon={<Download size={14} />}
    >
      Export Data
    </Button>
  );
};
