import type { AuthorDefinition } from "../resolve-author"

export const thatonecalculator: AuthorDefinition = {
  displayName: "thatonecalculator",
  socials: {
    x: "https://x.com/thatonecalculator",
    bsky: "https://bsky.app/profile/t1c.dev",
    site: "https://t1c.dev",
  },
  license: {
    type: "CC BY-SA 4.0",
    // has_trademark: true,
  },
  entries: {
    surrealdb: {
      label: 'surrealdb',
      references: "https://bsky.app/profile/t1c.dev/post/3lc42nknqrc2d",
      images: {
        src: "./assets/t1c/surrealdb.png",
      },
      createdAt: "Dec 1, 2025"
    },
    vyper: {
      label: "vyper",
      references: [
        "https://bsky.app/profile/t1c.dev/post/3lc6ug7omck2t",
        "https://bsky.app/profile/t1c.dev/post/3lc6soxakhs2h",
      ],
      images: {
        src: "./assets/t1c/vyper.png",
      },
      createdAt: "Dec 1, 2025"
    },
    avalanche: {
      label: "avalanche",
      references: "https://bsky.app/profile/t1c.dev/post/3lcjhomzcsk2f",
      images: {
        src: "./assets/t1c/avalanche.png",
      },
      createdAt: "Dec 5, 2025"
    },
    capacitor: {
      label: "capacitor",
      images: {
        src: "./assets/t1c/capacitor.png",
        references: "https://bsky.app/profile/t1c.dev/post/3ljyhognmcc2s",
        style: { objectFit: "contain", }
      },
      createdAt: "Mar 10, 2025"
    },
    monad: {
      label: "monad",
      images: {
        src: "./assets/t1c/monad.png",
        references: "https://bsky.app/profile/t1c.dev/post/3mlppxkeles25",
        style: { objectFit: "contain", }
      },
      createdAt: "May 12, 2026"
    },
    overtake: {
      label: "overtake",
      images: {
        src: "./assets/t1c/overtake.png",
        style: { objectFit: "contain", }
      },
      createdAt: "May 17, 2026"
    }

  },
  // logVerbose: true,
}