import { useResume } from '../../hooks/useResume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { SectionId, defaultSectionOrder } from '../../types';

export const ClassicTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;
  const sectionOrder = resumeData.sectionOrder || defaultSectionOrder;

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'summary':
        return summary && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
              Professional Summary
            </h2>
            <p>{summary}</p>
          </section>
        );
      
      case 'experience':
        return experience.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.1rem' }}>
                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold' }}>{exp.role}</h3>
                    <span style={{ fontSize: '9pt', color: '#666' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '0.25rem' }}>{exp.company}</div>
                  <p style={{ whiteSpace: 'pre-line' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      
      case 'projects':
        return projects.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
              Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map((project) => (
                <div key={project.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.1rem' }}>
                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold' }}>
                      {project.name}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', fontSize: '9pt', fontWeight: 'normal', color: '#3b82f6', textDecoration: 'none' }}>
                          {project.link}
                        </a>
                      )}
                    </h3>
                  </div>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      
      case 'education':
        return education.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold' }}>{edu.school}</h3>
                    <span style={{ fontSize: '9pt', color: '#666' }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      
      case 'skills':
        return skills.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
              Skills
            </h2>
            <p>{skills.join(', ')}</p>
          </section>
        );
      
      case 'customSections':
        return resumeData.customSections.map((section) => (
          section.items.length > 0 && (
            <section key={section.id} style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', color: '#222' }}>
                {section.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.1rem' }}>
                      <h3 style={{ fontSize: '11pt', fontWeight: 'bold' }}>{item.title}</h3>
                      <span style={{ fontSize: '9pt', color: '#666' }}>
                        {item.date}
                      </span>
                    </div>
                    {item.subtitle && <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '0.25rem' }}>{item.subtitle}</div>}
                    <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )
        ));
      
      default:
        return null;
    }
  };

  return (
    <div
      className="preview-container"
      style={{
        backgroundColor: 'white',
        color: '#333',
        padding: '2rem',
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '10pt',
        lineHeight: '1.4',
        fontFamily: 'Times New Roman, serif',
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: '2px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '24pt', fontWeight: 'bold', marginBottom: '0.25rem', color: '#000' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '14pt', color: '#555', marginBottom: '0.75rem' }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '9pt', color: '#444' }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={12} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={12} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Globe size={12} /> {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Linkedin size={12} /> {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Github size={12} /> {personalInfo.github}
            </div>
          )}
        </div>
      </header>

      {/* Render sections in custom order */}
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}
    </div>
  );
};
