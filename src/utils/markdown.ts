// Shared utility for rendering markdown content with LaTeX math support
import katex from 'katex';
import DOMPurify from 'dompurify';

export const renderMarkdownWithMath = (content: string): string => {
  let html = content;

  // Process in specific order to avoid conflicts
  
  // 1. Math blocks (LaTeX) - protect from other replacements
  const mathBlocks: string[] = [];
  // Display math ($$...$$)
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    const placeholder = `__MATH_BLOCK_${mathBlocks.length}__`;
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        output: 'html'
      });
      mathBlocks.push(`<div class="my-6 overflow-x-auto flex justify-center">${rendered}</div>`);
    } catch (e) {
      mathBlocks.push(`<div class="my-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">Erreur LaTeX: ${math}</div>`);
    }
    return placeholder;
  });
  
  // Inline math ($...$)
  html = html.replace(/\$([^\$\n]+)\$/g, (match, math) => {
    const placeholder = `__MATH_BLOCK_${mathBlocks.length}__`;
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        output: 'html'
      });
      mathBlocks.push(`<span class="inline-math">${rendered}</span>`);
    } catch (e) {
      mathBlocks.push(`<span class="text-red-700">Erreur: ${math}</span>`);
    }
    return placeholder;
  });
  
  // 2. Code blocks (protect from other replacements)
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm font-mono">${code.trim()}</code></pre>`);
    return placeholder;
  });

  // 3. Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>');

  // 4. Headers (process ### before ## before #)
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 mt-10 text-gray-900">$1</h1>');
  
  // 5. Tables (markdown format)
  html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headerCells = header.split('|').filter((c: string) => c.trim()).map((h: string) => 
      `<th class="px-4 py-2 bg-gray-100 font-semibold text-left border border-gray-300">${h.trim()}</th>`
    ).join('');
    
    const bodyRows = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((cell: string) => 
        `<td class="px-4 py-2 border border-gray-300">${cell.trim()}</td>`
      ).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    
    return `\n<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`;
  });
  
  // 6. Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 my-1 list-disc">$1</li>');
  html = html.replace(/^[0-9]+\. (.+)$/gm, '<li class="ml-6 my-1 list-decimal">$1</li>');
  
  // 7. Text formatting (bold, italic, underline)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  
  // 8. Separators
  html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200">');
  
  // 9. Restore code blocks
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block);
  });
  
  // 10. Restore math blocks
  mathBlocks.forEach((block, index) => {
    html = html.replace(`__MATH_BLOCK_${index}__`, block);
  });
  
  // 11. Line breaks (convert double newlines to paragraphs, single to <br>)
  html = html.replace(/\n\n+/g, '</p><p class="my-4">');
  html = html.replace(/\n/g, '<br>');
  html = `<p class="my-4">${html}</p>`;

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'span', 'code', 'pre', 
                   'ul', 'ol', 'li', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr'],
    ALLOWED_ATTR: ['class'],
  });

  return sanitizedHtml;
};
