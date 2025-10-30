"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Prompt } from "@/lib/content";

interface SidebarProps {
  prompts: Prompt[];
}

export function Sidebar({ prompts }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-6">
      <div className="mb-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900 hover:text-gray-700 cursor-pointer transition-colors">
            PromptLib
          </h1>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Your prompt collection</p>
      </div>

      <nav className="space-y-1">
        {prompts.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            No prompts found. Add .md files to content/prompts/
          </p>
        ) : (
          prompts.map((prompt) => {
            const href = `/p/${prompt.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={prompt.slug}
                href={href}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {prompt.title}
              </Link>
            );
          })
        )}
      </nav>
    </aside>
  );
}
