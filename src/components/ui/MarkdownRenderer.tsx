
import React, { useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import mermaid from 'mermaid';

const MarkdownRenderer: React.FC<{ content: string; className?: string }> = ({ content, className = '' }) => {
  const { themeMode, theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: themeMode,
      fontFamily: theme.fonts.body,
      themeVariables: {
        primaryColor: theme.palette[themeMode].card,
        primaryTextColor: theme.palette[themeMode].foreground,
        primaryBorderColor: theme.palette[themeMode].primary,
        lineColor: theme.palette[themeMode].border,
        secondaryColor: theme.palette[themeMode].background,
        tertiaryColor: theme.palette[themeMode].secondary,
        textColor: theme.palette[themeMode].foreground,
        mainBkg: 'transparent',
        nodeBorder: theme.palette[themeMode].primary,
        clusterBkg: `${theme.palette[themeMode].secondary}1A`,
        clusterBorder: theme.palette[themeMode].secondary,
        defaultLinkColor: theme.palette[themeMode].foreground,
        titleColor: theme.palette[themeMode].primary,
        edgeLabelBackground: theme.palette[themeMode].card,
      },
    });

    const renderMermaid = async () => {
      try {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.mermaid:not([data-rendered])');
        if (elements.length > 0) {
          await mermaid.run({ nodes: elements });
          elements.forEach((el) => el.setAttribute('data-rendered', 'true'));
        }
      } catch (e) {
        console.error('Mermaid rendering error:', e);
      }
    };
    const timer = setTimeout(renderMermaid, 100);
    return () => clearTimeout(timer);
  }, [content, themeMode, theme]);

  const processInline = (text: string) => {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-background/80 border border-border rounded-md text-accent font-mono text-sm">$1</code>');
  };

  const renderBlock = (block: string, index: number) => {
    // Code blocks
    if (block.trim().startsWith('```') && block.trim().endsWith('```')) {
      const lines = block.trim().split('\n');
      const lang = lines[0].substring(3).trim().toLowerCase();
      const code = lines.slice(1, -1).join('\n');

      if (lang === 'mermaid') {
        return (
          <div key={index} className="mermaid my-4 flex justify-center text-foreground p-4 bg-background/50 rounded-lg border border-border">
            {code}
          </div>
        );
      }
      
      return (
        <div key={index} className="my-4 rounded-lg border border-border overflow-hidden bg-background/50">
          {lang && <div className="px-4 py-1 bg-border/20 text-xs font-mono text-foreground/70">{lang}</div>}
          <pre className="p-4 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      );
    }
    
    // Blockquotes
    if (block.startsWith('>')) {
      return (
        <blockquote key={index} className="pl-4 border-l-4 border-border italic my-4 text-foreground/80">
          {block.substring(1).trim().split('\n').map((line, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: processInline(line) }} />
          ))}
        </blockquote>
      );
    }

    // Headings & HR
    if (block.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mt-8 mb-4" dangerouslySetInnerHTML={{ __html: processInline(block.substring(2)) }} />;
    if (block.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mt-6 mb-3" dangerouslySetInnerHTML={{ __html: processInline(block.substring(3)) }} />;
    if (block.startsWith('### ')) return <h3 key={index} className="text-xl font-semibold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: processInline(block.substring(4)) }} />;
    if (block.startsWith('---')) return <hr key={index} className="my-6 border-border" />;

    // Lists
    const listMatch = block.match(/^([*-] .*(\n|$))+/);
    if (listMatch) {
      return (
        <ul key={index} className="list-disc space-y-2 my-4 ml-6">
          {block.split('\n').map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: processInline(item.substring(2)) }} />
          ))}
        </ul>
      );
    }

    // Tables
    const tableLines = block.split('\n');
    if (tableLines.length > 1 && tableLines[0].includes('|') && /^\s*\|?(:?-+:?\|)+(:?-+:?)?\|?\s*$/.test(tableLines[1])) {
      const headerCells = tableLines[0].split('|').map(s => s.trim()).filter((s, i, a) => i > 0 && i < a.length - 1);
      const bodyRows = tableLines.slice(2).map(row => row.split('|').map(s => s.trim()).filter((s, i, a) => i > 0 && i < a.length - 1));
      
      return (
        <div key={index} className="my-4 overflow-x-auto border border-border rounded-lg">
          <table className="min-w-full">
            <thead className="bg-card/40">
              <tr className="border-b-2 border-border">
                {headerCells.map((cell, i) => <th key={i} className="p-3 text-left font-semibold" dangerouslySetInnerHTML={{ __html: processInline(cell) }} />)}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-b-0">
                  {row.map((cell, j) => <td key={j} className="p-3" dangerouslySetInnerHTML={{ __html: processInline(cell) }} />)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Paragraph
    return (
      <p key={index} className="my-4" dangerouslySetInnerHTML={{ __html: processInline(block) }} />
    );
  };

  const smartBlocks = [];
  let inCode = false;
  let currentBlock: string[] = [];

  for(const line of content.split('\n')) {
    if (line.trim().startsWith('```')) {
      if(currentBlock.length > 0) {
        smartBlocks.push(currentBlock.join('\n'));
      }
      currentBlock = [line];
      inCode = true;
    } else if (line.trim().endsWith('```') && inCode) {
      currentBlock.push(line);
      smartBlocks.push(currentBlock.join('\n'));
      currentBlock = [];
      inCode = false;
    } else if (inCode) {
        currentBlock.push(line);
    } else if (line.trim() === '') {
        if (currentBlock.length > 0) {
            smartBlocks.push(currentBlock.join('\n'));
            currentBlock = [];
        }
    } else {
        currentBlock.push(line);
    }
  }
  if (currentBlock.length > 0) {
      smartBlocks.push(currentBlock.join('\n'));
  }

  return <div className={`prose max-w-none text-foreground leading-relaxed ${className}`}>{smartBlocks.map(renderBlock)}</div>;
};

export default MarkdownRenderer;
