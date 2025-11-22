import { createFileRoute } from '@tanstack/react-router';
import { PersonalInfoForm } from '../components/Editor/PersonalInfoForm';
import { ExperienceForm } from '../components/Editor/ExperienceForm';
import { EducationForm } from '../components/Editor/EducationForm';
import { SkillsForm } from '../components/Editor/SkillsForm';
import { ProjectsForm } from '../components/Editor/ProjectsForm';
import { CustomSectionForm } from '../components/Editor/CustomSectionForm';
import { Preview } from '../components/Preview/Preview';
import { TemplateSelector } from '../components/TemplateSelector';
import { SectionOrderEditor } from '../components/SectionOrderEditor';
import { Card } from '../components/ui/Card';
import { TextArea } from '../components/ui/Input';
import { useResume, ResumeProvider } from '../hooks/useResume';
import { Button } from '../components/ui/Button';
import { Printer } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: () => (
    <ResumeProvider>
      <Home />
    </ResumeProvider>
  ),
});

function Home() {
  const { resumeData, updateSummary } = useResume();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <header className="no-print" style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text)' }}>Resume Builder</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Build your professional resume in minutes.</p>
        </div>
        <Button onClick={handlePrint} icon={<Printer size={16} />}>
            Export PDF
        </Button>
      </header>

      <div className="flex gap-lg" style={{ alignItems: 'flex-start' }}>
        {/* Editor Column */}
        <div className="no-print" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', minWidth: '0' }}>
          <TemplateSelector />
          <SectionOrderEditor />
          <PersonalInfoForm />
          
          <Card title="Professional Summary">
            <TextArea
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="Write a brief summary of your professional background..."
              rows={4}
            />
          </Card>

          <ExperienceForm />
          <ProjectsForm />
          <EducationForm />
          <SkillsForm />
          <CustomSectionForm />
        </div>

        {/* Preview Column */}
        <div style={{ flex: '1', position: 'sticky', top: 'var(--spacing-md)', minWidth: '0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
              transform: 'scale(0.75)', 
              transformOrigin: 'top center',
              width: '210mm',
              boxShadow: 'var(--shadow-xl)',
          }}>
            <Preview />
          </div>
        </div>
      </div>
      
      {/* Print-only container to ensure full size print */}
      <div className="print-only" style={{ display: 'none' }}>
        <Preview />
      </div>
    </div>
  );
}
