import type { AuthorDefinition } from "../resolve-author"

export const sawaratsuki_archived: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/theinsidersandrush/ServiceLogos",
    transform: [
      { type: "filter", include: "Forbidden" },
      { type: "filter", include: "NotFound" },
      { type: "filter", include: "418I'mateapot" },
      { type: "filter", include: "ServiceUnavailable" },
      { type: "filter", include: "Angular" },
      { type: "filter", include: "Bluesky" },
      { type: "filter", include: "Cloudflare" },
      { type: "filter", include: "Figma" },
      { type: "filter", include: "Github" },
      { type: "filter", include: "Golang" },
      { type: "filter", include: "Haskell" },
      { type: "filter", include: "IamDesigner!" },
      { type: "filter", include: "IamDesigner!English" },
      { type: "filter", include: "IamProgrammer!" },
      { type: "filter", include: "IamProgrammerEnglish" },
      { type: "filter", include: "Kotlin" },
      { type: "filter", include: "Next.js" },
      { type: "filter", include: "Node.js" },
      { type: "filter", include: "React" },
      { type: "filter", include: "Rust" },
      { type: "filter", include: "Tailwindcss" },
      { type: "filter", include: "TypeScript" },
    ],

    postProcess: [
      // TODO:
      // - add references
    ],
    licenseFallback: {
      type: "All Rights Reserved",
    },

    logTransformPaths: true
  },
  logVerbose: true,
}