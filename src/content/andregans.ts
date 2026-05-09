import type { AuthorDefinition } from "../resolve-author"

export const andregans: AuthorDefinition = {
  socials: {
    behance: "https://www.behance.net/andrerio",
    figma: "https://www.figma.com/@hanzo",
  },
  source: {
    from: "github",
    repo: "https://github.com/andregans/code_logotype",
    licenseFallback: {
      type: "custom",
      href: "https://github.com/andregans/code_logotype#-programming-logotype--sticker",
    },
    postProcess: [
      // from commit history
      { type: "add entry createdAt", createdAt: "Apr 24, 2024", entryKey: "neovim-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 24, 2024", entryKey: "netlify-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 24, 2024", entryKey: "next-js-logotype", },

      { type: "add entry createdAt", createdAt: "Apr 25, 2024", entryKey: "npm-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 25, 2024", entryKey: "node-js-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 25, 2024", entryKey: "nuxt-js-logotype", },

      { type: "add entry createdAt", createdAt: "Apr 27, 2024", entryKey: "bootstrap-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 27, 2024", entryKey: "materializecss-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 27, 2024", entryKey: "tailwindcss-logotype", },

      { type: "add entry createdAt", createdAt: "Apr 28, 2024", entryKey: "django-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 28, 2024", entryKey: "prisma-logotype", },
      { type: "add entry createdAt", createdAt: "Apr 28, 2024", entryKey: "remix-logotype", },

      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "cloudflare-logotype", },
      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "github-logotype", },
      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "notepad++-logotype", },
      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "sublime-text-logotype", },
      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "vercel-logotype", },
      { type: "add entry createdAt", createdAt: "May 6, 2024", entryKey: "vscode-logotype", },

      { type: "add entry createdAt", createdAt: "Jun 9, 2024", entryKey: "laravel-logotype", },
      { type: "add entry createdAt", createdAt: "Jun 9, 2024", entryKey: "python-logotype", },

      { type: "add entry createdAt", createdAt: "Jun 26, 2024", entryKey: "c++-logotype", },
      { type: "add entry createdAt", createdAt: "Jun 26, 2024", entryKey: "css-logotype", },
      { type: "add entry createdAt", createdAt: "Jun 26, 2024", entryKey: "html-logotype", },
      { type: "add entry createdAt", createdAt: "Jun 26, 2024", entryKey: "javascript-logotype", },
      { type: "add entry createdAt", createdAt: "Jun 26, 2024", entryKey: "ruby-logotype", },
      
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "android-studio", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "angular-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "flutter-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "gitlab-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "golang", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "hono-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "hugo", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "java", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "php-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "react-js-logotype", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "vim", },
      { type: "add entry createdAt", createdAt: "Dec 16, 2024", entryKey: "vite", },

    ]
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/andrerio" },
    { type: "saweria", url: "https://saweria.co/andrerio" },
  ],
  references: [
    "https://www.figma.com/community/file/1392100849031958853"
  ],

  // logVerbose: true
}