"use client"
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React, { type ComponentProps } from 'react';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md
  px-4 py-2 text-sm font-medium transition-colors
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`,
        secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400`,
        danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`,
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface GoodButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> { }

const GoodButton3: React.FC<GoodButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const combinedStyles = cn(buttonVariants({ variant }), className);

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default GoodButton3;