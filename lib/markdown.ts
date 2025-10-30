import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import rehypeSanitize from "rehype-sanitize";

/**
 * Converts Markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkHtml, { sanitize: true }) // Convert to HTML with sanitization
    .process(markdown);

  return String(result);
}

/**
 * Extracts the first code block from Markdown content
 * Returns the inner text of the code block (the actual prompt)
 */
export function extractFirstCodeBlock(markdown: string): string | null {
  // Match first code block with optional language tag
  // Pattern: ```optional-language\ncontent\n```
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)\n```/;
  const match = markdown.match(codeBlockRegex);

  if (match && match[1]) {
    return match[1].trim();
  }

  // If no code block found, return null
  return null;
}

/**
 * Extracts the intro paragraph (text before first code block)
 */
export function extractIntro(markdown: string): string {
  // Get everything before the first code block
  const codeBlockIndex = markdown.indexOf("```");

  if (codeBlockIndex === -1) {
    // No code block, return all content
    return markdown.trim();
  }

  // Return text before code block
  return markdown.substring(0, codeBlockIndex).trim();
}
