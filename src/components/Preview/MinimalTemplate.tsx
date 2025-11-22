import { useResume } from '../../hooks/useResume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const MinimalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div
      className="preview-container"
      style={{
        backgroundColor: 'white',
        color: '#2d2d2d',
        padding: '3rem 2.5rem',
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '10pt',
        lineHeight: '1.6',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28pt', fontWeight: 300, letterSpacing: '-0.5px', marginBottom: '0.5rem', color: '#000' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '12pt', color: '#666', marginBottom: '1.5rem', fontWeight: 400 }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem 1.5rem', fontSize: '9pt', color: '#555', maxWidth: '100%' }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={11} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={11} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={11} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Globe size={11} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Linkedin size={11} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Github size={11} /> <span style={{ wordBreak: 'break-all' }}>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '10.5pt', color: '#444', textAlign: 'center', maxWidth: '90%', margin: '0 auto', lineHeight: '1.7' }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#000', textAlign: 'center' }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '12pt', fontWeight: 600, color: '#000', marginBottom: '0.25rem' }}>{exp.role}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '10pt', color: '#666', fontWeight: 500 }}>{exp.company}</span>
                    <span style={{ fontSize: '9pt', color: '#999' }}>
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#555', whiteSpace: 'pre-line', fontSize: '10pt' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#000', textAlign: 'center' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.map((project) => (
              <div key={project.id}>
                <h3 style={{ fontSize: '11pt', fontWeight: 600, color: '#000', marginBottom: '0.25rem' }}>
                  {project.name}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', fontSize: '9pt', fontWeight: 400, color: '#666', textDecoration: 'none' }}>
                      ↗
                    </a>
                  )}
                </h3>
                <p style={{ color: '#555', fontSize: '10pt' }}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#000', textAlign: 'center' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <div style={{ marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 600, color: '#000' }}>{edu.school}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '10pt', color: '#666' }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </span>
                    <span style={{ fontSize: '9pt', color: '#999' }}>
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#000', textAlign: 'center' }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {skills.map((skill, idx) => (
              <span key={idx} style={{ fontSize: '9.5pt', color: '#555', padding: '0.25rem 0' }}>
                {skill}{idx < skills.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {resumeData.customSections.map((section) => (
        section.items.length > 0 && (
          <section key={section.id} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#000', textAlign: 'center' }}>
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {section.items.map((item) => (
                <div key={item.id}>
                  <div style={{ marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '11pt', fontWeight: 600, color: '#000' }}>{item.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      {item.subtitle && <span style={{ fontSize: '10pt', color: '#666' }}>{item.subtitle}</span>}
                      {item.date && <span style={{ fontSize: '9pt', color: '#999' }}>{item.date}</span>}
                    </div>
                  </div>
                  <p style={{ color: '#555', whiteSpace: 'pre-line', fontSize: '10pt' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};
