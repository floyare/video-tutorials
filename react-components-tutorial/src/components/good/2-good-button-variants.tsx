"use client"
import { cn } from '@/lib/utils';
import React, { type ComponentProps } from 'react';

interface GoodButtonProps extends ComponentProps<'button'> { }

const GoodButton2: React.FC<GoodButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={
      cn(
        "bg-purple-600 text-white",
        "hover:bg-purple-700 focus:ring-purple-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        {
          "border-6 border-green-500": props.type === "submit",
        },
        "p-4 rounded-md",
        className
      )
    } {...props}>
      {children}
    </button>
  );
};

export default GoodButton2;