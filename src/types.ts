export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  location: string;
  jobTitle: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level?: string;
  category?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
};

export type CustomSectionItem = {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type CustomSection = {
  id: string;
  title: string;
  items: CustomSectionItem[];
};

export type SectionId = 'personal-info' | 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'customSections';

export type ResumeData = {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
  sectionOrder: SectionId[];
};

export const defaultSectionOrder: SectionId[] = ['personal-info', 'summary', 'experience', 'projects', 'education', 'skills', 'customSections'];

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    github: '',
    location: '',
    jobTitle: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
  sectionOrder: defaultSectionOrder,
};
