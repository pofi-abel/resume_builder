import { useState } from 'react';
import { TemplateConfig } from '../types/template';

const CUSTOM_TEMPLATES_KEY = 'custom-resume-templates';

export interface CustomTemplate extends TemplateConfig {
  createdAt: string;
}

export const useCustomTemplates = () => {
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveCustomTemplate = (template: TemplateConfig) => {
    const customTemplate: CustomTemplate = {
      ...template,
      createdAt: new Date().toISOString(),
    };

    const updated = [...customTemplates, customTemplate];
    setCustomTemplates(updated);
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
    return customTemplate;
  };

  const deleteCustomTemplate = (id: string) => {
    const updated = customTemplates.filter(t => t.id !== id);
    setCustomTemplates(updated);
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
  };

  const getCustomTemplate = (id: string) => {
    return customTemplates.find(t => t.id === id);
  };

  return {
    customTemplates,
    saveCustomTemplate,
    deleteCustomTemplate,
    getCustomTemplate,
  };
};
