import React from 'react';
import { Input, TextArea } from '../ui/Input';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();

  return (
    <Card
      title="Experience"
      action={
        <Button size="sm" onClick={addExperience} icon={<Plus size={14} />}>
          Add
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <AnimatePresence>
          {resumeData.experience.map((exp) => (
            <motion.div
              key={exp.id}
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
                    onClick={() => removeExperience(exp.id)}
                    icon={<Trash2 size={14} />}
                    aria-label="Remove experience"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <Input
                    label="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                  <Input
                    label="Role"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  />
                  <Input
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                  <Input
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                    disabled={exp.current}
                  />
                </div>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text)' }}>
                        <input 
                            type="checkbox" 
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        />
                        I currently work here
                    </label>
                </div>
                <TextArea
                  label="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="• Led a team of..."
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {resumeData.experience.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            No experience added yet.
          </p>
        )}
      </div>
    </Card>
  );
};
