import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card = ({ children, className, title, action }: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
      className={className}
    >
      {(title || action) && (
        <div
          style={{
            padding: 'var(--spacing-md)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {title && <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ padding: 'var(--spacing-md)' }}>{children}</div>
    </div>
  );
};
