"use client"
import React, { type ComponentProps } from 'react';

interface GoodButtonProps extends ComponentProps<'button'> { }

const GoodButton1: React.FC<GoodButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button className='...' {...props}>
      {children}
    </button>
  );
};

export default GoodButton1;