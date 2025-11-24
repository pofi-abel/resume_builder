import React from 'react';
import { ResumeData, SectionId } from '../../types';
import { TemplateConfig } from '../../types/template';
import { SectionRenderer } from './SectionRenderer';

interface UniversalRendererProps {
  data: ResumeData;
  config: TemplateConfig;
}

export const UniversalRenderer: React.FC<UniversalRendererProps> = ({ data, config }) => {
  const { theme, layout, structure, sectionVariants } = config;

  // Construct CSS variables for the theme
  const themeStyles = {
    '--theme-color-primary': theme.colors.primary,
    '--theme-color-secondary': theme.colors.secondary,
    '--theme-color-background': theme.colors.background,
    '--theme-color-text': theme.colors.text,
    '--theme-color-text-muted': theme.colors.textMuted,
    '--theme-color-border': theme.colors.border,
    
    '--theme-color-sidebar-text': theme.colors.sidebarText || theme.colors.text,
    
    '--theme-font-family': theme.typography.fontFamily,
    '--theme-heading-family': theme.typography.headingFamily || theme.typography.fontFamily,
    '--theme-base-size': theme.typography.baseSize,
    '--theme-line-height': theme.typography.lineHeight,
    
    '--theme-spacing-section': theme.spacing.sectionGap,
    '--theme-spacing-item': theme.spacing.itemGap,
    '--theme-page-padding': theme.spacing.pagePadding,
  } as React.CSSProperties;

  const containerStyle: React.CSSProperties = {
    ...themeStyles,
    backgroundColor: 'var(--theme-color-background)',
    color: 'var(--theme-color-text)',
    fontFamily: 'var(--theme-font-family)',
    fontSize: 'var(--theme-base-size)',
    lineHeight: 'var(--theme-line-height)',
    width: '100%',
    maxWidth: '210mm',
    minHeight: '297mm',
    margin: '0 auto',
    padding: 'var(--theme-page-padding)',
    boxShadow: 'var(--shadow-lg)',
    boxSizing: 'border-box',
  };

  const renderSection = (sectionId: SectionId) => {
    return (
      <SectionRenderer
        key={sectionId}
        sectionId={sectionId}
        data={data}
        variant={sectionVariants[sectionId] || 'default'}
      />
    );
  };

  // Use user's custom section order if available, otherwise fall back to template structure
  const sectionOrder = data.sectionOrder && data.sectionOrder.length > 0 
    ? data.sectionOrder 
    : structure.main;

  if (layout.type === 'two-column') {
    const sidebarWidth = layout.columns?.split(' ')[0] || '30%';
    const mainWidth = layout.columns?.split(' ')[1] || '70%';

    // For two-column layouts, split sections between sidebar and main
    // Sidebar gets sections defined in template, main gets the rest in user's order
    const sidebarSections = structure.sidebar || [];
    const mainSections = sectionOrder.filter(id => !sidebarSections.includes(id));

    return (
      <div style={{ ...containerStyle, display: 'flex', padding: 0 }}>
        {layout.sidebarPosition === 'left' && (
          <div style={{ 
            width: sidebarWidth, 
            backgroundColor: 'var(--theme-color-secondary)', 
            color: 'var(--theme-color-sidebar-text)',
            padding: 'var(--theme-page-padding)' 
          }}>
            {sidebarSections.map(renderSection)}
          </div>
        )}
        
        <div style={{ width: mainWidth, padding: 'var(--theme-page-padding)' }}>
          {mainSections.map(renderSection)}
        </div>

        {layout.sidebarPosition === 'right' && (
          <div style={{ 
            width: sidebarWidth, 
            backgroundColor: 'var(--theme-color-secondary)', 
            color: 'var(--theme-color-sidebar-text)',
            padding: 'var(--theme-page-padding)' 
          }}>
            {sidebarSections.map(renderSection)}
          </div>
        )}
      </div>
    );
  }

  // Default single column - use user's section order
  return (
    <div style={containerStyle}>
      {sectionOrder.map(renderSection)}
    </div>
  );
};
