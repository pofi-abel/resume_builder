import React from 'react';
import { Input, TextArea } from '../ui/Input';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();

  return (
    <Card
      title="Projects"
      action={
        <Button size="sm" onClick={addProject} icon={<Plus size={14} />}>
          Add
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <AnimatePresence>
          {resumeData.projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-md)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 'var(--spacing-sm)', right: 'var(--spacing-sm)' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    icon={<Trash2 size={14} />}
                    aria-label="Remove project"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <Input
                    label="Project Name"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  />
                  <Input
                    label="GitHub URL"
                    value={project.githubUrl}
                    onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                  <Input
                    label="Live URL"
                    value={project.liveUrl}
                    onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <TextArea
                  label="Description"
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Brief description of the project..."
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {resumeData.projects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            No projects added yet.
          </p>
        )}
      </div>
    </Card>
  );
};
