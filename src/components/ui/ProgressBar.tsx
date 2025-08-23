import React from 'react';

interface ProgressBarProps {
    value: number;
    label: string;
    icon: React.ReactElement<{ className?: string }>;
    color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, icon, color }) => {
    const displayValue = Math.round(value);
    
    return (
        <div className="flex items-center gap-3 w-full">
            <div className="text-foreground/70">
                {React.cloneElement(icon, { className: 'h-6 w-6' })}
            </div>
            <span className="flex-grow text-sm font-medium">{label}</span>
            <div className="w-2/5 flex items-center gap-2">
                <div className="w-full bg-border rounded-full h-2.5">
                    <div className="h-2.5 rounded-full" style={{ width: `${displayValue}%`, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}></div>
                </div>
                <span className="text-sm font-bold w-12 text-right" style={{ color }}>{displayValue}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;