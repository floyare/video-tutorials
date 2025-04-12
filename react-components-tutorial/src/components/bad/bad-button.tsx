import React from 'react';

interface BadButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  variant: "primary" | "secondary" | "danger";
  className?: string;
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
}

const BadButton = ({ type = 'button', disabled = false, onClick, children, variant, className }: BadButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        "w-fit px-2" + " " + variants[variant] + " " + className + (disabled ? "cursor-not-allowed opacity-50" : "")
      }
    >
      {children ?? 'Click Me'}
    </button>
  );
};

export default BadButton;