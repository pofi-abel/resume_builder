import React from 'react';
import { PersonalInfo } from '../../../types';
import { SectionVariant } from '../../../types/template';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

interface HeaderSectionProps {
  data: PersonalInfo;
  variant: SectionVariant;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ data, variant }) => {
  const { fullName, jobTitle, email, phone, location, linkedin, github, website } = data;

  const containerStyle: React.CSSProperties = {
    marginBottom: 'var(--theme-spacing-section)',
    textAlign: variant === 'centered' ? 'center' : 'left',
    borderBottom: variant === 'minimal' ? 'none' : '2px solid var(--theme-color-border)',
    paddingBottom: variant === 'minimal' ? '0' : '1rem',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: 'var(--theme-color-primary)',
    fontFamily: 'var(--theme-heading-family)',
    marginBottom: '0.25rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25em',
    color: 'var(--theme-color-text-muted)',
    marginBottom: '0.75rem',
  };

  const contactStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: variant === 'centered' ? '0.75rem 1.5rem' : '0.75rem',
    fontSize: '0.9em',
    justifyContent: variant === 'centered' ? 'center' : 'flex-start',
    color: 'var(--theme-color-text)',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  };

  const renderContactItem = (icon: React.ReactNode, text: string) => (
    <div style={itemStyle}>
      {icon}
      <span>{text}</span>
    </div>
  );

  return (
    <header style={containerStyle}>
      <h1 style={nameStyle}>{fullName || 'Your Name'}</h1>
      <p style={titleStyle}>{jobTitle || 'Job Title'}</p>
      
      <div style={contactStyle}>
        {email && renderContactItem(<Mail size={14} />, email)}
        {phone && renderContactItem(<Phone size={14} />, phone)}
        {location && renderContactItem(<Globe size={14} />, location)}
        {linkedin && renderContactItem(<Linkedin size={14} />, linkedin)}
        {github && renderContactItem(<Github size={14} />, github)}
        {website && renderContactItem(<Globe size={14} />, website)}
      </div>
    </header>
  );
};
