// 📁 components/Button.tsx
import React from 'react';
import { COLORS } from '@/lib/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-[${COLORS.PRIMARY}] text-white px-6 py-2 rounded disabled:opacity-50`}
    >
      {children}
    </button>
  );
}