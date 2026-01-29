import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface SolutionRendererProps {
  content: string;
  className?: string;
}

export function SolutionRenderer({ content, className }: SolutionRendererProps) {
  return (
    <div className={cn("prose prose-sm max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-foreground mt-4 mb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-foreground mt-3 mb-2">{children}</h3>
          ),
          p: ({ children }) => {
            const text = String(children);
            // Handle LaTeX display math
            if (text.includes('$$')) {
              const parts = text.split(/(\$\$[^$]+\$\$)/g);
              return (
                <p className="text-muted-foreground mb-2">
                  {parts.map((part, i) => {
                    if (part.startsWith('$$') && part.endsWith('$$')) {
                      return (
                        <span key={i} className="block my-2 p-3 bg-secondary/50 rounded-lg font-mono text-center text-foreground">
                          {part.replace(/\$\$/g, '')}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            }
            // Handle inline LaTeX
            if (text.includes('$')) {
              const parts = text.split(/(\$[^$]+\$)/g);
              return (
                <p className="text-muted-foreground mb-2">
                  {parts.map((part, i) => {
                    if (part.startsWith('$') && part.endsWith('$')) {
                      return (
                        <code key={i} className="px-1 py-0.5 bg-secondary/50 rounded font-mono text-sm text-foreground">
                          {part.replace(/\$/g, '')}
                        </code>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            }
            return <p className="text-muted-foreground mb-2">{children}</p>;
          },
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-3 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-3 text-muted-foreground">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground">{children}</li>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="p-3 bg-secondary/50 rounded-lg overflow-x-auto my-2">
                  <code className="font-mono text-sm text-foreground">{children}</code>
                </pre>
              );
            }
            return (
              <code className="px-1 py-0.5 bg-secondary/50 rounded font-mono text-sm text-foreground">
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-3">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
