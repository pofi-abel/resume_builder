import React from 'react';
import { Loader2 } from 'lucide-react';
import '../../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, icon, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
      secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]',
      danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
      ghost: 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    // Note: Since we are using vanilla CSS variables but might want some utility classes, 
    // I'll use inline styles for dynamic parts or just rely on the classes defined in styles.css 
    // combined with these generated class strings if I were using Tailwind. 
    // Since the prompt asked for Vanilla CSS but allowed clsx/tailwind-merge, I will stick to 
    // a hybrid approach where I define component specific styles here or use style objects if needed.
    // For now, let's assume we are using the utility classes defined in styles.css or adding specific ones.
    
    // actually, let's make this pure CSS modules or styled components style for simplicity in this file? 
    // No, I'll just use style objects for the dynamic parts to keep it simple and "Vanilla-ish"
    
    const style: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      fontWeight: 500,
      transition: 'background-color 0.2s, color 0.2s',
      cursor: props.disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: props.disabled || isLoading ? 0.5 : 1,
      border: 'none',
      outline: 'none',
      ...((variant === 'primary') && { backgroundColor: 'var(--color-primary)', color: 'white' }),
      ...((variant === 'secondary') && { backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }),
      ...((variant === 'danger') && { backgroundColor: 'var(--color-danger)', color: 'white' }),
      ...((variant === 'ghost') && { backgroundColor: 'transparent', color: 'var(--color-text-muted)' }),
      
      ...((size === 'sm') && { height: '2rem', padding: '0 0.75rem', fontSize: '0.75rem' }),
      ...((size === 'md') && { height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem' }),
      ...((size === 'lg') && { height: '3rem', padding: '0 2rem', fontSize: '1rem' }),
    };

    return (
      <button
        ref={ref}
        style={style}
        {...props}
        onMouseEnter={(e) => {
            if (props.disabled || isLoading) return;
            if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            if (variant === 'secondary') e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            if (variant === 'ghost') {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                e.currentTarget.style.color = 'var(--color-text)';
            }
        }}
        onMouseLeave={(e) => {
            if (props.disabled || isLoading) return;
            if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            if (variant === 'secondary') e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            if (variant === 'ghost') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-muted)';
            }
        }}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
        {!isLoading && icon && <span style={{ marginRight: '0.5rem', display: 'flex' }}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
