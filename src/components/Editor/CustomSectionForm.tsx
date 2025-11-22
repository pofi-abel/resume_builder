import React, { useState } from 'react';
import { Input, TextArea } from '../ui/Input';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useResume } from '../../hooks/useResume';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomSectionForm = () => {
  const { resumeData, addCustomSection, removeCustomSection, addCustomSectionItem, updateCustomSectionItem, removeCustomSectionItem } = useResume();
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      addCustomSection(newSectionTitle.trim());
      setNewSectionTitle('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <Card title="Add Custom Section">
        <form onSubmit={handleAddSection} style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Section Title (e.g. Volunteer, Awards)"
          />
          <Button type="submit" size="md" icon={<Plus size={16} />}>
            Add
          </Button>
        </form>
      </Card>

      {resumeData.customSections.map((section) => (
        <Card
          key={section.id}
          title={section.title}
          action={
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                 <Button size="sm" onClick={() => addCustomSectionItem(section.id)} icon={<Plus size={14} />}>
                    Add Item
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomSection(section.id)}
                    icon={<Trash2 size={14} />}
                    aria-label="Remove section"
                />
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <AnimatePresence>
              {section.items.map((item) => (
                <motion.div
                  key={item.id}
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
                        onClick={() => removeCustomSectionItem(section.id, item.id)}
                        icon={<Trash2 size={14} />}
                        aria-label="Remove item"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                      <Input
                        label="Title"
                        value={item.title}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, 'title', e.target.value)}
                        placeholder="Role or Award Name"
                      />
                      <Input
                        label="Subtitle"
                        value={item.subtitle}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, 'subtitle', e.target.value)}
                        placeholder="Organization or Issuer"
                      />
                      <Input
                        label="Date"
                        value={item.date}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, 'date', e.target.value)}
                        placeholder="Date or Duration"
                      />
                    </div>
                    <TextArea
                      label="Description"
                      value={item.description}
                      onChange={(e) => updateCustomSectionItem(section.id, item.id, 'description', e.target.value)}
                      placeholder="Description..."
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {section.items.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                No items added yet.
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
