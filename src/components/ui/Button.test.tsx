

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies default (primary) variant classes', () => {
    render(<Button>Primary Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-primary');
    expect(buttonElement).toHaveClass('text-background');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-secondary');
    expect(buttonElement).toHaveClass('text-holy-white');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-transparent');
    expect(buttonElement).toHaveClass('text-foreground/70');
  });

  it('applies custom className', () => {
    render(<Button className="mt-4">Custom Class</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('mt-4');
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled:opacity-50');
  });

  it('renders as a different element when "as" prop is used', () => {
    render(<Button as="a" href="#">Link Button</Button>);
    // It's a link, but might still have button-like role depending on context.
    // The most reliable check is for the element type itself.
    const linkElement = screen.getByRole('link', { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '#');
  });
});