import { SectionId } from '../types';

export type ThemeConfig = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textMuted: string;
    border: string;
    sidebarText?: string;
  };
  typography: {
    fontFamily: string;
    headingFamily?: string;
    baseSize: string;
    lineHeight: string;
  };
  spacing: {
    sectionGap: string;
    itemGap: string;
    pagePadding: string;
  };
};

export type SectionVariant = 
  | 'default' 
  | 'centered' 
  | 'minimal' 
  | 'timeline' 
  | 'grid' 
  | 'tags' 
  | 'bubbles' 
  | 'bullet-list'
  | 'sidebar'
  | 'compact';

export type TemplateConfig = {
  id: string;
  name: string;
  description: string;
  theme: ThemeConfig;
  layout: {
    type: 'single-column' | 'two-column';
    columns?: string; // e.g. "30% 70%" for grid layout
    sidebarPosition?: 'left' | 'right';
  };
  structure: {
    sidebar?: SectionId[];
    main: SectionId[];
  };
  sectionVariants: Record<SectionId, SectionVariant>;
};
