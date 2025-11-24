import React from 'react';
import { Input, TextArea } from '../ui/Input';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <Card
      title="Education"
      action={
        <Button size="sm" onClick={addEducation} icon={<Plus size={14} />}>
          Add
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <AnimatePresence>
          {resumeData.education.map((edu) => (
            <motion.div
              key={edu.id}
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
                    onClick={() => removeEducation(edu.id)}
                    icon={<Trash2 size={14} />}
                    aria-label="Remove education"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                  <Input
                    label="School"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  />
                  <Input
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                  <Input
                    label="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <Input
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="YYYY"
                    />
                    <Input
                        label="End Date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="YYYY"
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder="• Relevant coursework, honors, etc."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {resumeData.education.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            No education added yet.
          </p>
        )}
      </div>
    </Card>
  );
};
