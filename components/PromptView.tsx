import { Prompt } from "@/lib/content";
import { extractFirstCodeBlock, extractIntro } from "@/lib/markdown";
import { CopyButton } from "@/components/CopyButton";

interface PromptViewProps {
  prompt: Prompt;
}

export function PromptView({ prompt }: PromptViewProps) {
  // Extract the actual prompt text from the code block
  const promptText = extractFirstCodeBlock(prompt.content);

  // Extract the intro paragraph (before code block)
  const intro = extractIntro(prompt.content);

  return (
    <div className="max-w-4xl">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {prompt.title}
        </h1>

        {prompt.description && (
          <p className="text-xl text-gray-600 mb-2">{prompt.description}</p>
        )}

        {prompt.updated && (
          <p className="text-sm text-gray-500">
            Last updated: {prompt.updated}
          </p>
        )}
      </div>

      {/* Intro paragraph */}
      {intro && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{intro}</p>
        </div>
      )}

      {/* The actual prompt in a code block */}
      {promptText ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Prompt</h2>
            <CopyButton text={promptText} />
          </div>

          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
            {promptText}
          </pre>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <p className="text-yellow-800">
            ⚠️ Warning: No code block found in this prompt file. Add a code
            block with your prompt text.
          </p>
        </div>
      )}
    </div>
  );
}
