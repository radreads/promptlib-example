# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is a learning project/AI portfolio piece built using "vibe-coding" approach. The developer is not very skilled at coding, so **keep everything as simple as possible**. The project is a minimalist public prompt library with a Notion-like UI—no auth, no search, no complex features.

## Tech Stack

- **Next.js (App Router)** with **React** and **TypeScript**
- **Tailwind CSS** + **shadcn/ui** for styling
- **gray-matter** for frontmatter parsing
- **remark/rehype** for Markdown rendering
- **Vercel** for deployment (GitHub integration)

## Content Architecture

**All prompts live as Markdown files in `content/prompts/`**. Each file:
- Has YAML frontmatter: `title`, `slug` (optional), `description` (optional), `order` (optional), `updated` (optional)
- Contains an intro paragraph (optional)
- Has one fenced code block (language tag `prompt` preferred) with the actual prompt text

At build time, the app reads all `.md` files, parses them, and generates static routes at `/p/[slug]`.

## Key Commands

```bash
# Development
npm run dev          # Start dev server (default: localhost:3000)

# Building
npm run build        # Production build with static export
npm run start        # Preview production build locally

# Testing (if added)
npm run test         # Run tests

# Linting/Formatting (if configured)
npm run lint         # Lint with ESLint
```

## Core Architecture

### File Structure (Suggested/Standard)
```
/app
  /layout.tsx          # Root layout with sidebar
  /page.tsx            # Homepage (first prompt or empty state)
  /p/[slug]/page.tsx   # Dynamic prompt detail page (SSG)
/components
  Sidebar.tsx          # Flat list of prompts, active state
  PromptView.tsx       # Title, description, date, code block, copy button
  CopyButton.tsx       # Clipboard logic + toast
  MobileNav.tsx        # Sheet/Drawer for mobile sidebar
/lib
  content.ts           # readAllPrompts(), readPrompt(slug), TypeScript types
  markdown.ts          # Markdown → HTML + extract first code block
/content/prompts       # *.md files (one per prompt)
```

### Data Flow
1. **Build time**: `lib/content.ts` reads all `.md` files from `content/prompts/`, parses frontmatter with `gray-matter`, sorts by `order` then `title`
2. **Static generation**: Next.js creates a static page for each prompt at `/p/[slug]`
3. **Runtime**: Sidebar shows all prompts; clicking a title navigates to `/p/[slug]`; copy button uses `navigator.clipboard.writeText()` to copy the first code block

### Copy Behavior
- The copy button should extract **only** the inner text of the first code block (preferably tagged with `prompt`)
- Falls back to entire Markdown body if no code block exists (show warning in UI)
- Uses `navigator.clipboard.writeText()` with a 2-second toast confirmation

## Important Constraints & Conventions

- **Simplicity first**: This is a learning project. Avoid over-engineering. No auth, no database, no complex state management
- **SSG only**: All pages should be statically generated at build time
- **Duplicate slugs must fail the build** with a clear error message
- **Malformed frontmatter**: Log warning and skip the file during build
- **Sanitize rendered Markdown** with `rehype-sanitize` to prevent HTML injection
- **Lighthouse targets**: Performance ≥95, Accessibility ≥95, Best Practices ≥95

## Accessibility Requirements

- Sidebar must be keyboard navigable (Tab through items)
- Visible focus rings
- Copy button needs `aria-label="Copy prompt"`
- Toast announcements via `role="status"`

## Mobile Behavior

- Sidebar collapses into a Sheet/Drawer component (from shadcn/ui)
- Must remain fully functional on mobile

## Routing & Deep Links

- `/` → Homepage (first prompt or "Select a prompt" empty state)
- `/p/[slug]` → Prompt detail page (one per `.md` file)
- Each prompt has a stable, shareable URL

## Adding New Prompts

1. Create a new `.md` file in `content/prompts/`
2. Add frontmatter (at minimum: `title`)
3. Write a code block with the prompt (use `prompt` language tag)
4. Commit to `main` → Vercel auto-deploys

Example:
```markdown
---
title: "My New Prompt"
slug: "my-new-prompt"
order: 30
---
This prompt does XYZ.

\`\`\`prompt
You are an AI assistant. Do this specific task...
\`\`\`
```

## Error Handling

- **Missing prompt**: Show 404 with link back to `/`
- **No prompts at all**: Empty state message: "No prompts found. Add Markdown files to `/content/prompts`."
- **Duplicate slugs**: Build must fail with helpful console message

## Non-Goals (Do Not Implement)

- Authentication or private areas
- Search, tags, categories, favorites
- Variables/templating in prompts
- CMS, databases, or serverless APIs
- Analytics or cookie consent (stretch goal only)
- Dark mode (stretch goal only)

## Development Philosophy

When working on this project:
- Prioritize readability over cleverness
- Use shadcn/ui components directly (don't reinvent)
- Keep component files small and focused
- Explain technical decisions in non-technical terms when communicating with the user
- Test the copy-to-clipboard flow on every change
- Ensure mobile layout works before considering a feature "done"


Remember that when you create file names, make them descriptive.