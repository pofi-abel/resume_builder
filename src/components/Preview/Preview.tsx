import { useResume } from '../../hooks/useResume';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';

export const Preview = () => {
  const { selectedTemplate } = useResume();

  switch (selectedTemplate) {
    case 'modern':
      return <ModernTemplate />;
    case 'minimal':
      return <MinimalTemplate />;
    case 'classic':
    default:
      return <ClassicTemplate />;
  }
};
