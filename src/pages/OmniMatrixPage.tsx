

import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../components/ui/Card';
import TrilingualText from '../components/ui/TrilingualText';
import { useTheme } from '../theme/ThemeContext';
import { motion } from 'framer-motion';
import { OMNI_ARCHITECTURE_DATA } from '../data/omni-architecture';
import type { OmniModule, MeceDimension } from '../types';

const ModuleCard: React.FC<{ module: OmniModule }> = ({ module }) => {
    const { theme } = useTheme();
    return (
        <NavLink to={module.href}>
            <Card className="h-full group transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {React.createElement(module.icon, { className: 'h-6 w-6' })}
                    </div>
                    <div className="flex-1">
                        <TrilingualText text={theme.vocabulary[module.nameKey]} as="h4" className="font-bold text-card-foreground transition-colors group-hover:text-primary" />
                        <TrilingualText text={theme.vocabulary[module.descriptionKey]} as="p" className="text-xs text-card-foreground/70 mt-1" showPinyin={false} />
                    </div>
                </div>
            </Card>
        </NavLink>
    );
};

const OmniMatrixPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="space-y-8">
            <header>
                <TrilingualText as="h1" text={theme.vocabulary.navOmniMatrix} />
                <TrilingualText as="p" text={theme.vocabulary.omniMatrixSubtitle} className="text-lg text-foreground/70 mt-2" />
            </header>

            <div className="space-y-12">
                {OMNI_ARCHITECTURE_DATA.map((dimension: MeceDimension, index: number) => (
                    <motion.section 
                        key={dimension.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="mb-4">
                             <TrilingualText as="h2" text={theme.vocabulary[dimension.nameKey]} className="text-2xl font-bold" />
                             <TrilingualText as="p" text={theme.vocabulary[dimension.descriptionKey]} className="text-foreground/70" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dimension.modules.map(module => (
                                <ModuleCard key={module.id} module={module} />
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default OmniMatrixPage;
