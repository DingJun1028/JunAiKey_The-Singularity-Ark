import React from 'react';

interface TrilingualTextProps {
  text?: string;
  as?: React.ElementType;
  className?: string;
  lineClassName?: string;
  showPinyin?: boolean;
  style?: React.CSSProperties;
}

const TrilingualText: React.FC<TrilingualTextProps> = ({ text = '', as: Component = 'div', className='', lineClassName='', showPinyin = true, style }) => {
    const [primary, secondary, pinyin] = (text || '...|||...|||...').split('|||');
    
    return (
        <Component className={className} style={style}>
            <span className={`block ${lineClassName}`}>{primary}</span>
            {secondary && (
                <span className={`block text-sm opacity-70 ${lineClassName}`}>
                    {showPinyin && pinyin && <span className="font-mono mr-2">{pinyin}</span>}
                    {secondary}
                </span>
            )}
        </Component>
    );
};

export default TrilingualText;