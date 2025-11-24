import { createFileRoute } from '@tanstack/react-router';
import { PersonalInfoForm } from '../components/Editor/PersonalInfoForm';
import { ExperienceForm } from '../components/Editor/ExperienceForm';
import { EducationForm } from '../components/Editor/EducationForm';
import { SkillsForm } from '../components/Editor/SkillsForm';
import { ProjectsForm } from '../components/Editor/ProjectsForm';
import { CustomSectionForm } from '../components/Editor/CustomSectionForm';
import { Preview } from '../components/Preview/Preview';
import { TemplateDialog } from '../components/TemplateDialog';
import { SectionOrderEditor } from '../components/SectionOrderEditor';
import { ExportButton } from '../components/ExportButton';
import { ImportButton } from '../components/ImportButton';
import { Card } from '../components/ui/Card';
import { TextArea } from '../components/ui/Input';
import { useResume, ResumeProvider } from '../hooks/useResume';
import { Button } from '../components/ui/Button';
import { Printer, Eye, X, Palette } from 'lucide-react';
import { useState } from 'react';
import packageJson from '../../package.json';

export const Route = createFileRoute('/')({
  component: () => (
    <ResumeProvider>
      <Home />
    </ResumeProvider>
  ),
});

function Home() {
  const { resumeData, updateSummary } = useResume();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <header className="no-print" style={{ 
        marginBottom: 'var(--spacing-xl)', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        alignItems: 'flex-start'
      }}>
        <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', color: 'var(--color-text)' }}>Resume Builder <span style={{ fontSize: 'clamp(.6rem, 5vw, .6rem)' }}>{packageJson.version}</span></h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Build your professional resume in minutes.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
          <Button onClick={() => setShowTemplateDialog(true)} icon={<Palette size={16} />} variant="secondary">
            Templates
          </Button>
          <Button onClick={handlePrint} icon={<Printer size={16} />}>
              Export PDF
          </Button>
          <ExportButton />
          <ImportButton />
        </div>
      </header>

      <TemplateDialog isOpen={showTemplateDialog} onClose={() => setShowTemplateDialog(false)} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 'var(--spacing-lg)',
        alignItems: 'stretch'
      }}>
        {/* Editor Column */}
        <div className="no-print" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--spacing-lg)',
          width: '100%'
        }}>
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

        {/* Preview Column - Hidden on mobile, shown on desktop */}
        <div className="no-print desktop-preview" style={{ 
          display: 'none',
          position: 'sticky', 
          top: 'var(--spacing-md)',
          justifyContent: 'center'
        }}>
          <div style={{ 
              transform: 'scale(0.5)', 
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

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div 
          className="no-print"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            overflow: 'auto',
            padding: 'var(--spacing-md)',
          }}
          onClick={() => setShowMobilePreview(false)}
        >
          <div style={{ 
            position: 'sticky',
            top: 'var(--spacing-md)',
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 'var(--spacing-md)',
          }}>
            <button
              onClick={() => setShowMobilePreview(false)}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
              }}
            >
              <X size={24} />
            </button>
          </div>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '100%',
              maxWidth: '210mm',
              margin: '0 auto',
            }}
          >
            <Preview />
          </div>
        </div>
      )}

      {/* Floating Preview Button - Mobile Only */}
      <button
        className="no-print mobile-preview-btn"
        onClick={() => setShowMobilePreview(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--spacing-lg)',
          right: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          width: '3.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
        }}
      >
        <Eye size={24} />
      </button>

      <style>{`
        @media (min-width: 768px) {
          .container > div:nth-child(2) {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          
          .container > div:nth-child(2) > div:first-child {
            flex: 1;
            max-width: 50%;
          }
          
          .desktop-preview {
            display: flex !important;
            flex: 1;
          }
          
          header {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }

          .mobile-preview-btn {
            display: none !important;
          }
        }

        @media (min-width: 1024px) {
          .desktop-preview > div {
            transform: scale(0.6) !important;
          }
        }

        @media (min-width: 1280px) {
          .desktop-preview > div {
            transform: scale(0.75) !important;
          }
        }
      `}</style>
    </div>
  );
}
