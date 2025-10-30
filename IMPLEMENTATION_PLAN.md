# PromptLib Implementation Plan

This is a step-by-step plan for building the PromptLib project. Each step is designed to be small, testable, and understandable for someone learning to code.

---

## ✅ Step 1: Initialize Next.js Project (COMPLETED)

**Goal:** Set up the foundation - a working Next.js project with TypeScript and Tailwind CSS.

**What we did:**
- Created a new Next.js 16 project with App Router
- Installed TypeScript for type safety
- Installed Tailwind CSS v4 for styling
- Set up the basic file structure

**Files created:**
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration
- `app/layout.tsx` - Root layout wrapper
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles
- `next.config.ts` - Next.js configuration

**Test:** Visit http://localhost:3000 and see the default Next.js welcome page

---

## ✅ Step 2: Install shadcn/ui (COMPLETED)

**Goal:** Add a component library that provides beautiful, pre-built UI components.

**What we did:**
- Initialized shadcn/ui in the project
- Added the Button component as a test
- Updated the homepage to display three different button styles

**Files created:**
- `components/ui/button.tsx` - Reusable Button component
- `lib/utils.ts` - Helper functions for CSS classes
- `components.json` - shadcn/ui configuration

**Files modified:**
- `app/globals.css` - Added design tokens (colors, spacing)
- `app/page.tsx` - Simple test page with buttons
- `package.json` - Added new dependencies

**Test:** Visit http://localhost:3000 and see three styled buttons (Default, Secondary, Outline)

---

## Step 3: Create Basic Layout with Placeholder Sidebar

**Goal:** Build the main layout structure with a left sidebar and content area.

**What we'll do:**
- Create a simple two-column layout
- Add a placeholder sidebar on the left (will show "Prompts will appear here")
- Add a content area on the right
- Make it responsive (sidebar should work on desktop first)

**Files to create/modify:**
- `components/Sidebar.tsx` - New file for the sidebar
- `app/layout.tsx` - Update to include sidebar in layout

**Test:** The page should show a sidebar on the left and content area on the right

---

## Step 4: Create Example Markdown Files

**Goal:** Create the content structure - add some example prompt files.

**What we'll do:**
- Create the `content/prompts/` directory
- Add 2-3 example `.md` files with frontmatter
- Each file will have: title, description, and a code block with a prompt

**Files to create:**
- `content/prompts/` directory
- `content/prompts/writing-assistant.md` - First example prompt
- `content/prompts/code-reviewer.md` - Second example prompt
- `content/prompts/brainstorm-helper.md` - Third example prompt

**Test:** Use a text editor to verify the files exist and have proper frontmatter

---

## Step 5: Build Content Parser

**Goal:** Write code that reads the Markdown files and extracts the data.

**What we'll do:**
- Install `gray-matter` package (parses frontmatter)
- Create `lib/content.ts` with functions to:
  - Read all prompts from the `content/prompts/` folder
  - Parse the frontmatter (title, description, etc.)
  - Sort prompts by order, then by title

**Files to create:**
- `lib/content.ts` - Functions to read and parse prompts

**Files to modify:**
- `package.json` - Add `gray-matter` dependency

**Test:** We'll temporarily log the parsed data to the console to verify it works

---

## Step 6: Display Prompts in Sidebar

**Goal:** Connect the content parser to the sidebar - show real prompt titles.

**What we'll do:**
- Update `Sidebar.tsx` to call the content parser
- Display a list of prompt titles from the Markdown files
- Add basic styling to make it look clean

**Files to modify:**
- `components/Sidebar.tsx` - Display real prompt data
- `app/layout.tsx` - Pass prompt data to sidebar

**Test:** The sidebar should now show the actual titles from your Markdown files

---

## Step 7: Build Markdown Renderer

**Goal:** Write code that converts Markdown content to HTML for display.

**What we'll do:**
- Install `remark` and `rehype` packages (Markdown processing)
- Install `rehype-sanitize` (security - prevents bad HTML)
- Create `lib/markdown.ts` with function to:
  - Convert Markdown to HTML
  - Extract the first code block (the actual prompt text)

**Files to create:**
- `lib/markdown.ts` - Markdown to HTML conversion

**Files to modify:**
- `package.json` - Add remark/rehype dependencies

**Test:** We'll log the converted HTML to verify it works

---

## Step 8: Create Prompt View Component

**Goal:** Build the component that displays a prompt's details.

**What we'll do:**
- Create `components/PromptView.tsx` component
- Display: title, description, updated date, and the code block
- Style it to look clean and readable
- Add a placeholder "Copy" button (won't work yet)

**Files to create:**
- `components/PromptView.tsx` - Prompt display component

**Test:** Update homepage to show one prompt using this component

---

## Step 9: Add Copy Button Functionality

**Goal:** Make the "Copy" button actually copy the prompt to clipboard.

**What we'll do:**
- Create `components/CopyButton.tsx` component
- Use `navigator.clipboard.writeText()` to copy text
- Add a toast notification (brief popup) that says "Copied!"
- Install `sonner` package for toast notifications

**Files to create:**
- `components/CopyButton.tsx` - Copy button with clipboard logic

**Files to modify:**
- `components/PromptView.tsx` - Use the CopyButton
- `package.json` - Add `sonner` dependency
- `app/layout.tsx` - Add toast provider

**Test:** Click the copy button and paste into a text editor - you should see the prompt text

---

## Step 10: Build Dynamic Routing for Prompts

**Goal:** Create individual pages for each prompt at `/p/[slug]`

**What we'll do:**
- Create `app/p/[slug]/page.tsx` - Dynamic route
- Use Next.js `generateStaticParams()` to generate pages at build time
- Each prompt gets its own URL (e.g., `/p/writing-assistant`)

**Files to create:**
- `app/p/[slug]/page.tsx` - Dynamic prompt page

**Test:** Visit http://localhost:3000/p/writing-assistant to see a specific prompt

---

## Step 11: Make Sidebar Interactive

**Goal:** Make clicking a sidebar item navigate to that prompt's page.

**What we'll do:**
- Update `Sidebar.tsx` to use Next.js `Link` component
- Add active state highlighting (current prompt is highlighted)
- Add hover states for better UX

**Files to modify:**
- `components/Sidebar.tsx` - Add navigation and active states

**Test:** Click different prompts in sidebar - URL changes and content updates

---

## Step 12: Update Homepage

**Goal:** Make the homepage show the first prompt (or empty state if no prompts).

**What we'll do:**
- Update `app/page.tsx` to redirect to first prompt
- If no prompts exist, show helpful message

**Files to modify:**
- `app/page.tsx` - Smart homepage logic

**Test:** Visit http://localhost:3000 and you should see the first prompt automatically

---

## Step 13: Add Mobile Navigation

**Goal:** Make the sidebar work on mobile devices.

**What we'll do:**
- Install Sheet component from shadcn/ui (drawer/modal)
- Create `components/MobileNav.tsx` - Mobile menu button + drawer
- Hide desktop sidebar on mobile, show menu button instead
- Sidebar slides in from left when button is clicked

**Files to create:**
- `components/MobileNav.tsx` - Mobile navigation

**Files to modify:**
- `app/layout.tsx` - Conditionally show mobile vs desktop nav

**Test:** Resize browser to mobile size - should see hamburger menu instead of sidebar

---

## Step 14: Add Error Handling

**Goal:** Handle edge cases gracefully.

**What we'll do:**
- Create `app/p/[slug]/not-found.tsx` - Custom 404 page
- Add duplicate slug detection in content parser (fail build if duplicates)
- Add empty state handling (no prompts found)
- Add error boundary for unexpected errors

**Files to create:**
- `app/p/[slug]/not-found.tsx` - 404 page

**Files to modify:**
- `lib/content.ts` - Add duplicate detection

**Test:** Visit http://localhost:3000/p/fake-slug - should see 404 page

---

## Step 15: Accessibility & Keyboard Navigation

**Goal:** Make the site usable with keyboard only (important for accessibility).

**What we'll do:**
- Ensure sidebar items are keyboard navigable (Tab key)
- Add visible focus rings (you can see which item is focused)
- Add proper `aria-label` attributes to buttons
- Test with keyboard only (no mouse)

**Files to modify:**
- `components/Sidebar.tsx` - Add focus styles
- `components/CopyButton.tsx` - Add aria-label
- `components/MobileNav.tsx` - Keyboard accessible

**Test:** Use only Tab and Enter keys to navigate and copy prompts

---

## Step 16: Final Polish & Testing

**Goal:** Ensure everything works perfectly before deployment.

**What we'll do:**
- Run `npm run build` to create production build
- Test the production build locally with `npm run start`
- Check Lighthouse scores (Performance, Accessibility, Best Practices)
- Fix any warnings or errors
- Test on mobile device
- Test copy functionality on different browsers

**Test:** Everything should work smoothly with no errors

---

## Step 17: Deployment Setup (Optional)

**Goal:** Get ready to deploy to Vercel.

**What we'll do:**
- Ensure `.gitignore` is correct
- Create a git repository (if not done)
- Push to GitHub
- Connect to Vercel
- Set up auto-deployment

**Test:** Push a change and see it auto-deploy

---

## Summary

**Total Steps:** 17 steps (2 completed, 15 remaining)

**Estimated Time:**
- Steps 3-6: ~2 hours (basic structure)
- Steps 7-10: ~2 hours (content display)
- Steps 11-13: ~1.5 hours (navigation)
- Steps 14-17: ~1.5 hours (polish & deploy)

**Current Status:**
- ✅ Step 1: Next.js initialized
- ✅ Step 2: shadcn/ui installed
- 📍 Next: Step 3 - Create basic layout

---

## Key Concepts You'll Learn

- **Components:** Reusable pieces of UI (like Button, Sidebar)
- **Props:** Data passed from parent to child components
- **Server Components:** Components that run on the server (faster, more efficient)
- **Static Generation:** Pre-building pages at build time (super fast for users)
- **File-based routing:** URL structure matches your file structure
- **Frontmatter:** Metadata at the top of Markdown files
- **State:** Data that changes (like which prompt is selected)
- **Responsive design:** Making it work on all screen sizes

---

*Last updated: After completing Step 2*
