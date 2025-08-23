import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-10 h-10">
        <div className="absolute border-4 border-t-transparent rounded-full w-full h-full animate-spin" style={{ borderColor: 'var(--color-secondary)', borderTopColor: 'transparent' }}></div>
        <div className="absolute border-4 border-t-transparent rounded-full w-full h-full animate-spin" style={{ animationDelay: '-0.2s', transform: 'rotate(20deg) scale(0.8)', borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}></div>
      </div>
    </div>
  );
};

export default Spinner;