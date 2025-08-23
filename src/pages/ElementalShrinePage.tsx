
import React from 'react';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import { useTheme } from '../theme/ThemeContext';
import { ElementalGuardian, Palette } from '../types';
import Button from '../components/ui/Button';
import { FireGuardianIcon, WaterGuardianIcon, AirGuardianIcon, EarthGuardianIcon, LightGuardianIcon, DarkGuardianIcon, NatureGuardianIcon, AetherGuardianIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';

const iconMap: { [key: string]: React.FC } = {
    FireGuardianIcon,
    WaterGuardianIcon,
    AirGuardianIcon,
    EarthGuardianIcon,
    LightGuardianIcon,
    DarkGuardianIcon,
    NatureGuardianIcon,
    AetherGuardianIcon,
};

const getElementColor = (element: ElementalGuardian['element'], palette: Palette): string => {
    switch (element) {
        case 'Fire': return palette.error;
        case 'Water': return palette.secondary;
        case 'Air': return '#A7D3E2'; // custom
        case 'Earth': return '#A97C50'; // custom
        case 'Light': return palette.primary;
        case 'Dark': return palette.accent;
        case 'Nature': return palette.success;
        case 'Aether': return '#E0B0FF'; // custom
        default: return palette.foreground;
    }
}


const ElementalShrinePage: React.FC = () => {
    const { theme, themeMode } = useTheme();
    const { elementalGuardians, activeGuardianIds, toggleGuardian } = useJunAiKeyData();
    const activePalette = theme.palette[themeMode];

    const handleToggle = (guardianId: string, guardianName: string, isActive: boolean) => {
        toggleGuardian(guardianId);
        const name = guardianName.split('|||')[0];
        if (!isActive) {
            toast.success(`${name}'s blessing is active!`);
        } else {
            toast(`${name}'s blessing has been deactivated.`, { icon: '...'});
        }
    }

    return (
        <div className="space-y-8">
            <header>
                 <TrilingualText as="h1" text={theme.vocabulary.navElementalShrine} />
                 <TrilingualText as="p" text={theme.vocabulary.elementalShrineSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {elementalGuardians.map((guardian) => {
                    const IconComponent = iconMap[guardian.icon];
                    const isActive = activeGuardianIds.includes(guardian.id);
                    const elementColor = getElementColor(guardian.element, activePalette);

                    return (
                        <Card 
                            key={guardian.id} 
                            className={`flex flex-col border-2 transition-all duration-300 ${isActive ? 'shadow-2xl' : 'shadow-lg'}`}
                            style={{ borderColor: isActive ? elementColor : 'var(--color-border)' }}
                        >
                            <div className="flex flex-col items-center text-center flex-grow">
                                <div className="mb-4" style={{ color: elementColor }}>
                                    {IconComponent ? React.createElement(IconComponent) : null}
                                </div>
                                <TrilingualText as="h3" text={guardian.name} className="text-xl font-bold text-card-foreground" />
                                <span className="mt-2 px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: `${elementColor}20`, color: elementColor }}>
                                    {guardian.element}
                                </span>
                                <TrilingualText as="p" text={guardian.description} className="text-sm text-card-foreground/70 mt-4 flex-grow" />
                            </div>
                             <Button 
                                variant={isActive ? 'primary' : 'ghost'} 
                                className="w-full mt-6"
                                onClick={() => handleToggle(guardian.id, guardian.name, isActive)}
                            >
                                <TrilingualText text={isActive ? theme.vocabulary.deactivateBlessingButton : theme.vocabulary.activateBlessingButton} />
                            </Button>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default ElementalShrinePage;