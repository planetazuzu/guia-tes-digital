import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

const MarkdownViewer = ({ content, className = '' }: MarkdownViewerProps) => {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkFrontmatter]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSanitize,
          rehypeHighlight,
        ]}
        components={{
          // Personalizar componentes de Markdown
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 mt-8 text-foreground" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mb-3 mt-6 text-foreground" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-medium mb-2 mt-4 text-foreground" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-foreground leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4 text-foreground" {...props} />
          ),
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return (
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-foreground" {...props} />
              );
            }
            return (
              <code className="block p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono text-foreground" {...props} />
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-border" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold text-left text-foreground" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2 text-foreground" {...props} />
          ),
          a: ({ node, ...props }: any) => (
            <a className="text-primary hover:underline" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
