import { readAllPrompts } from "@/lib/content";
import { PromptView } from "@/components/PromptView";

export default function Home() {
  // Get all prompts and show the first one as a test
  const prompts = readAllPrompts();
  const firstPrompt = prompts[0];

  if (!firstPrompt) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to PromptLib
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          No prompts found. Add .md files to content/prompts/
        </p>
      </div>
    );
  }

  return <PromptView prompt={firstPrompt} />;
}
