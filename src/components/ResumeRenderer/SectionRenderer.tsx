import React from 'react';
import { ResumeData, SectionId } from '../../types';
import { SectionVariant } from '../../types/template';

import { HeaderSection } from './sections/HeaderSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CustomSection } from './sections/CustomSection';

interface SectionRendererProps {
  sectionId: SectionId;
  data: ResumeData;
  variant: SectionVariant;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ sectionId, data, variant }) => {
  switch (sectionId) {
    case 'personal-info':
      return <HeaderSection data={data.personalInfo} variant={variant} />;

    case 'summary':
      if (!data.summary) return null;
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
            Professional Summary
          </h3>
          <p>{data.summary}</p>
        </div>
      );
      
    case 'experience':
      return <ExperienceSection data={data.experience} variant={variant} />;
      
    case 'education':
      return <EducationSection data={data.education} variant={variant} />;
      
    case 'skills':
      return <SkillsSection data={data.skills} variant={variant} />;
      
    case 'projects':
      return <ProjectsSection data={data.projects} variant={variant} />;
      
    case 'customSections':
      return (
        <>
          {data.customSections.map((section) => (
            <CustomSection key={section.id} section={section} variant={variant} />
          ))}
        </>
      );
      
    // Header is usually handled specially or as part of 'personal-info' if we had that section ID
    // For now, let's assume 'summary' might be the first thing, but we actually need a Header renderer.
    // The current SectionId type doesn't have 'header', but the template might expect it.
    // We'll handle personal info separately or assume it's part of the layout.
    // Actually, let's check the types. SectionId includes 'summary', 'experience', etc.
    // Personal Info is usually always at the top or in sidebar.
    // We might need to add a specific 'header' section to the ID list or handle it in UniversalRenderer.
    // For this POC, let's assume we render Personal Info if it's in the structure list? 
    // Wait, SectionId doesn't have 'personalInfo'.
    // Let's add a special case for 'personal-info' if we modify the type, OR
    // we can just render HeaderSection if we encounter a special ID, or maybe we should add 'personal-info' to SectionId.
    // For now, let's assume the UniversalRenderer might inject it, or we add it to the type.
    // Let's stick to the existing SectionId for now and maybe treat 'summary' as just summary.
    // But we need to render the Name/Contact info.
    // Let's create a HeaderSection and maybe we can use a special ID or just render it at the top of UniversalRenderer?
    // A better approach for the "Universal" renderer is to treat Personal Info as just another section.
    // I will add 'personal-info' to the SectionId type in a separate step if needed, 
    // but for now let's just handle the existing ones.
    // Wait, the user wants a full replacement. The current templates render Personal Info.
    // I should probably add 'personal-info' to the SectionId type to make it fully modular.
    
    default:
      return null;
  }
};
