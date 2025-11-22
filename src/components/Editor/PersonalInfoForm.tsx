import React from 'react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useResume } from '../../hooks/useResume';

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <Card title="Personal Information">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
        <Input
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Job Title"
          value={personalInfo.jobTitle}
          onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
          placeholder="Software Engineer"
        />
        <Input
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo('email', e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          placeholder="+1 234 567 890"
        />
        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo('location', e.target.value)}
          placeholder="New York, NY"
        />
        <Input
          label="Website"
          value={personalInfo.website}
          onChange={(e) => updatePersonalInfo('website', e.target.value)}
          placeholder="johndoe.com"
        />
        <Input
          label="LinkedIn"
          value={personalInfo.linkedin}
          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
        <Input
          label="GitHub"
          value={personalInfo.github}
          onChange={(e) => updatePersonalInfo('github', e.target.value)}
          placeholder="github.com/johndoe"
        />
      </div>
    </Card>
  );
};
