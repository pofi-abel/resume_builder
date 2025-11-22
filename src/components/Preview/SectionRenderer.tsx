import { ResumeData, SectionId } from '../../types';

interface SectionRendererProps {
  resumeData: ResumeData;
  renderSection: (sectionId: SectionId) => React.ReactNode;
}

export const SectionRenderer = ({ resumeData, renderSection }: SectionRendererProps) => {
  return (
    <>
      {resumeData.sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </>
  );
};
