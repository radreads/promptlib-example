import { notFound } from "next/navigation";
import { readPrompt, getAllPromptSlugs } from "@/lib/content";
import { PromptView } from "@/components/PromptView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static pages for all prompts at build time
export async function generateStaticParams() {
  const slugs = getAllPromptSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = readPrompt(slug);

  // If prompt not found, show 404
  if (!prompt) {
    notFound();
  }

  return <PromptView prompt={prompt} />;
}
