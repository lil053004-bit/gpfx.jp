import { ReactNode } from 'react';

interface SimpleInputContainerProps {
  children: ReactNode;
}

export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="max-w-md mx-auto px-6 py-8">
      {children}
    </div>
  );
}
