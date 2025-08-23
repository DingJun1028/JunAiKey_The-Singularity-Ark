
import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { useJunAiKeyData } from '../hooks/useJunAiKeyData';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { Rule } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import TrilingualText from '../components/ui/TrilingualText';

const RuleToggle: React.FC<{rule: Rule, onToggle: (rule: Rule) => void}> = ({ rule, onToggle }) => {
  const { theme, themeMode } = useTheme();
  const activePalette = theme.palette[themeMode];
  return (
    <div className="flex items-center">
      <TrilingualText text={rule.enabled ? theme.vocabulary.enabled : theme.vocabulary.disabled} as="span" className={`mr-3 text-sm font-medium ${rule.enabled ? 'text-success' : 'text-foreground/60'}`} />
      <button
        type="button"
        onClick={() => onToggle(rule)}
        className={`relative inline-flex flex-shrink-0 h-7 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-secondary`}
        style={{backgroundColor: rule.enabled ? activePalette.success : 'var(--color-border)'}}
        role="switch"
        aria-checked={rule.enabled}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-holy-white shadow transform ring-0 transition ease-in-out duration-200 ${
            rule.enabled ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

const OmniFlowPage: React.FC = () => {
  const { rules, loading, updateRule } = useJunAiKeyData();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = useMemo(() => {
    if (!searchTerm) {
      return rules;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return rules.filter(rule =>
      rule.name.toLowerCase().includes(lowercasedTerm) ||
      rule.description.toLowerCase().includes(lowercasedTerm) ||
      (rule.tags && rule.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)))
    );
  }, [rules, searchTerm]);

  const handleCreateNewRule = () => {
    navigate('/app/omni-flow/new');
  };

  const handleToggle = (rule: Rule) => {
    updateRule({ ...rule, enabled: !rule.enabled });
  };
  
  const handleEdit = (ruleId: string) => {
    navigate(`/app/omni-flow/${ruleId}`);
  };
  
  if (loading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-20 w-1/3 mb-8" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div>
            <TrilingualText as="h1" text={theme.vocabulary.omniFlowTitle} />
            <TrilingualText as="p" text={theme.vocabulary.omniFlowSubtitle} className="text-lg text-foreground/70 mt-2" />
        </div>
        <Button onClick={handleCreateNewRule} variant="primary" className="!py-3 !px-5">
          <TrilingualText text={theme.vocabulary.createRuleButton} />
        </Button>
      </header>

      <Card>
        <input
            type="text"
            placeholder="Search rules by name, description, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-background/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-secondary focus:outline-none"
        />
      </Card>

      <div className="space-y-4">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule) => (
            <Card key={rule.id} glow={rule.eternal}>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                   <h3 className="text-xl font-bold text-card-foreground">{rule.name}</h3>
                   {rule.eternal && <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary">Core</span>}
                </div>
                <p className="text-base text-card-foreground/70 mt-1">{rule.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {rule.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border my-4"></div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <Button variant="ghost" onClick={() => handleEdit(rule.id)}>
                  <TrilingualText text={theme.vocabulary.editButton} />
                </Button>
                <RuleToggle rule={rule} onToggle={handleToggle} />
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p className="text-center text-card-foreground/70 py-10">No rules match your search criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OmniFlowPage;
