import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, initialResumeData, ResumeTemplate, SectionId, Experience, Education, Project, CustomSectionItem } from '../types';

const STORAGE_KEY = 'resume-builder-data';
const TEMPLATE_STORAGE_KEY = 'resume-builder-template';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<ResumeTemplate>>;
  updatePersonalInfo: (field: keyof ResumeData['personalInfo'], value: string) => void;
  updateSummary: (value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: keyof Experience, value: any) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: any) => void;
  removeEducation: (id: string) => void;
  addSkill: (skillName: string) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: keyof Project, value: any) => void;
  removeProject: (id: string) => void;
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, field: keyof CustomSectionItem, value: string) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  reorderSections: (newOrder: SectionId[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Migrate old data: ensure personal-info is in sectionOrder
          if (parsed.sectionOrder && !parsed.sectionOrder.includes('personal-info')) {
            parsed.sectionOrder = ['personal-info', ...parsed.sectionOrder];
          }
          return parsed;
        } catch (e) {
          console.error('Failed to parse resume data', e);
        }
      }
    }
    return initialResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      if (saved && ['classic', 'modern', 'minimal'].includes(saved)) {
        return saved as ResumeTemplate;
      }
    }
    return 'classic';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, selectedTemplate);
    }
  }, [selectedTemplate]);

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateSummary = (value: string) => {
    setResumeData((prev) => ({ ...prev, summary: value }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skillName: string) => {
    if (!skillName.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: crypto.randomUUID(), name: skillName }],
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: crypto.randomUUID(),
          name: '',
          description: '',
          githubUrl: '',
          liveUrl: '',
          technologies: [],
        },
      ],
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addCustomSection = (title: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: crypto.randomUUID(),
          title,
          items: [],
        },
      ],
    }));
  };

  const updateCustomSection = (id: string, title: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === id ? { ...sec, title } : sec
      ),
    }));
  };

  const removeCustomSection = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((sec) => sec.id !== id),
    }));
  };

  const addCustomSectionItem = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: [
                ...sec.items,
                {
                  id: crypto.randomUUID(),
                  title: '',
                  subtitle: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                },
              ],
            }
          : sec
      ),
    }));
  };

  const updateCustomSectionItem = (
    sectionId: string,
    itemId: string,
    field: keyof ResumeData['customSections'][0]['items'][0],
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: sec.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : sec
      ),
    }));
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: sec.items.filter((item) => item.id !== itemId),
            }
          : sec
      ),
    }));
  };

  const reorderSections = (newOrder: SectionId[]) => {
    setResumeData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  const value: ResumeContextType = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    reorderSections,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
