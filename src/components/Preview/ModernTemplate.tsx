import { useResume } from '../../hooks/useResume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';

export const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div
      className="preview-container"
      style={{
        backgroundColor: 'white',
        color: '#1a1a1a',
        padding: '2rem',
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '10pt',
        lineHeight: '1.5',
        fontFamily: "'Inter', sans-serif",
        display: 'grid',
        gridTemplateColumns: '35% 1fr',
        gap: '2rem',
      }}
    >
      {/* Left Sidebar */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '2rem', margin: '-2rem 0 -2rem -2rem', borderRadius: '0 1rem 1rem 0' }}>
        {/* Profile */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '20pt', fontWeight: 'bold', marginBottom: '0.5rem', wordBreak: 'break-word' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '12pt', opacity: 0.9, marginBottom: '1rem' }}>
            {personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '0.25rem' }}>
            Contact
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '9pt' }}>
            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Mail size={12} /> <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={12} /> <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={12} /> <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Globe size={12} /> <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Linkedin size={12} /> <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Github size={12} /> <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '0.25rem' }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '9pt' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '0.25rem' }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ fontSize: '9pt' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{edu.degree}</div>
                  <div style={{ opacity: 0.9 }}>{edu.school}</div>
                  {edu.field && <div style={{ opacity: 0.8, fontSize: '8pt' }}>{edu.field}</div>}
                  <div style={{ opacity: 0.7, fontSize: '8pt', marginTop: '0.25rem' }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ paddingTop: '1rem' }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem', borderBottom: '2px solid #2563eb', paddingBottom: '0.25rem' }}>
              About Me
            </h2>
            <p style={{ color: '#4a4a4a' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem', borderBottom: '2px solid #2563eb', paddingBottom: '0.25rem' }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', color: '#1a1a1a' }}>{exp.role}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '9pt', color: '#666', whiteSpace: 'nowrap' }}>
                      <Calendar size={10} />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '10pt', color: '#2563eb', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</div>
                  <p style={{ color: '#4a4a4a', whiteSpace: 'pre-line' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem', borderBottom: '2px solid #2563eb', paddingBottom: '0.25rem' }}>
              Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    {project.name}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', fontSize: '9pt', fontWeight: 'normal', color: '#2563eb', textDecoration: 'none' }}>
                        {project.link}
                      </a>
                    )}
                  </h3>
                  <p style={{ color: '#4a4a4a' }}>{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          section.items.length > 0 && (
            <section key={section.id} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '13pt', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem', borderBottom: '2px solid #2563eb', paddingBottom: '0.25rem' }}>
                {section.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '11pt', fontWeight: 'bold', color: '#1a1a1a' }}>{item.title}</h3>
                      {item.date && <span style={{ fontSize: '9pt', color: '#666' }}>{item.date}</span>}
                    </div>
                    {item.subtitle && <div style={{ fontSize: '10pt', color: '#2563eb', fontWeight: 600, marginBottom: '0.25rem' }}>{item.subtitle}</div>}
                    <p style={{ color: '#4a4a4a', whiteSpace: 'pre-line' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  );
};
