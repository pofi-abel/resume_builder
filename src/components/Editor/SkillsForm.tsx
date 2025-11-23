import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <Card title="Skills">
      <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. React, TypeScript)"
        />
        <Button type="submit" size="md" icon={<Plus size={16} />}>
          Add
        </Button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
        <AnimatePresence>
          {resumeData.skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'var(--color-surface-hover)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                }}
              >
                {skill.name}
                <button
                  onClick={() => removeSkill(skill.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={14} />
                </button>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};
