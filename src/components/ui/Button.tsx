
import React from 'react';

type ButtonOwnProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const Button = React.forwardRef(function Button<E extends React.ElementType = 'button'>(
  {
    as,
    children,
    variant = 'primary',
    className = '',
    ...rest
  }: ButtonProps<E>,
  ref: React.ForwardedRef<any>
) {
  const Component: React.ElementType = as || 'button';
  
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none';

  const variantClasses = {
    primary: 'bg-primary text-background hover:bg-opacity-80 hover:shadow-divine-glow focus:ring-primary',
    secondary: 'bg-secondary text-holy-white hover:bg-opacity-80 hover:shadow-celestial-glow focus:ring-secondary',
    ghost: 'bg-transparent text-foreground/70 hover:bg-foreground/10 focus:ring-foreground/50 shadow-none',
  };

  return (
    <Component ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </Component>
  );
});

export default Button;