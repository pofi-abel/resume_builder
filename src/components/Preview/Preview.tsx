import { useResume } from '../../hooks/useResume';
import { UniversalRenderer } from '../ResumeRenderer/UniversalRenderer';
import classicConfig from '../../templates/classic.json';
import modernConfig from '../../templates/modern.json';
import minimalConfig from '../../templates/minimal.json';
import { TemplateConfig } from '../../types/template';
import { useCustomTemplates } from '../../hooks/useCustomTemplates';

export const Preview = () => {
  const { selectedTemplate, resumeData } = useResume();
  const { getCustomTemplate } = useCustomTemplates();

  const getConfig = (): TemplateConfig => {
    // Check if it's a custom template
    const customTemplate = getCustomTemplate(selectedTemplate);
    if (customTemplate) {
      return customTemplate;
    }

    // Fall back to built-in templates
    switch (selectedTemplate) {
      case 'modern':
        return modernConfig as unknown as TemplateConfig;
      case 'minimal':
        return minimalConfig as unknown as TemplateConfig;
      case 'classic':
      default:
        return classicConfig as unknown as TemplateConfig;
    }
  };

  return <UniversalRenderer data={resumeData} config={getConfig()} />;
};
