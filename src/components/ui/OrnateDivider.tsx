
import React from 'react';

const OrnateDivider: React.FC = () => {
    return (
        <div className="flex items-center justify-center my-6" aria-hidden="true">
            <div className="w-full h-px bg-border"></div>
            <div className="px-4 text-primary text-2xl font-serif">
                *
            </div>
            <div className="w-full h-px bg-border"></div>
        </div>
    );
}

export default OrnateDivider;
