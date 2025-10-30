import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the shape of our prompt data
export interface PromptFrontmatter {
  title: string;
  slug?: string;
  description?: string;
  order?: number;
  updated?: string;
}

export interface Prompt {
  slug: string;
  title: string;
  description?: string;
  order: number;
  updated?: string;
  content: string; // The full markdown content (without frontmatter)
}

// Path to the prompts directory
const promptsDirectory = path.join(process.cwd(), "content/prompts");

/**
 * Reads all prompt files from content/prompts and returns them sorted
 */
export function readAllPrompts(): Prompt[] {
  // Check if directory exists
  if (!fs.existsSync(promptsDirectory)) {
    console.warn("Prompts directory not found:", promptsDirectory);
    return [];
  }

  // Get all .md files
  const fileNames = fs.readdirSync(promptsDirectory);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith(".md"));

  // Parse each file
  const prompts = mdFiles.map((fileName) => {
    const fullPath = path.join(promptsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse frontmatter
    const { data, content } = matter(fileContents);
    const frontmatter = data as PromptFrontmatter;

    // Generate slug from filename if not provided in frontmatter
    const slug =
      frontmatter.slug || fileName.replace(/\.md$/, "").toLowerCase();

    return {
      slug,
      title: frontmatter.title || "Untitled",
      description: frontmatter.description,
      order: frontmatter.order ?? 999, // Default to high number if not specified
      updated: frontmatter.updated,
      content,
    };
  });

  // Sort by order (ascending), then by title (alphabetically)
  prompts.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });

  // Check for duplicate slugs
  const slugs = prompts.map((p) => p.slug);
  const duplicateSlugs = slugs.filter(
    (slug, index) => slugs.indexOf(slug) !== index
  );

  if (duplicateSlugs.length > 0) {
    throw new Error(
      `Duplicate slugs found: ${duplicateSlugs.join(", ")}. Each prompt must have a unique slug.`
    );
  }

  return prompts;
}

/**
 * Reads a single prompt by slug
 */
export function readPrompt(slug: string): Prompt | null {
  const allPrompts = readAllPrompts();
  const prompt = allPrompts.find((p) => p.slug === slug);
  return prompt || null;
}

/**
 * Gets all slugs for static generation
 */
export function getAllPromptSlugs(): string[] {
  const prompts = readAllPrompts();
  return prompts.map((p) => p.slug);
}
