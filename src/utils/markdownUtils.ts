/**
 * Utilidades para procesar Markdown y extraer front matter
 */

import { matter } from 'vfile-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';

export interface FrontMatter {
  version?: string;
  fecha?: string;
  tipo?: string;
  [key: string]: any;
}

/**
 * Extrae el front matter de un archivo Markdown
 */
export function extractFrontMatter(content: string): {
  frontMatter: FrontMatter;
  content: string;
} {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(() => (tree, file) => {
        matter(file);
      });

    const file = processor.processSync({ value: content, path: 'file.md' });
    const frontMatter = (file.data.matter as FrontMatter) || {};
    
    // Remover front matter del contenido si existe
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const cleanedContent = content.replace(frontMatterRegex, '');

    return {
      frontMatter,
      content: cleanedContent,
    };
  } catch (error) {
    console.warn('Error extrayendo front matter:', error);
    return {
      frontMatter: {},
      content,
    };
  }
}
