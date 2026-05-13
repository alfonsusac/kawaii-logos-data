import type { AuthorDefinition } from "../resolve-author"

export const aikoyori: AuthorDefinition = {
  socials: {
    x: 'https://x.com/Aikoyori',
    bsky: 'https://bsky.app/profile/aikoyori.xyz',
  },
  source: {
    from: "github",
    repo: "https://github.com/Aikoyori/ProgrammingVTuberLogos",
    transform: { type: "filter", include: "preview" },
    postProcess: [
      { type: "add entry reference", entryKey: "vscode", reference: "https://x.com/Aikoyori/status/1780709418189078954/photo/1" },
      { type: "add entry reference", entryKey: "vscode", reference: "https://x.com/Aikoyori/status/1782346141390229884/photo/1" },
      { type: "add entry createdAt", entryKey: "vscode", createdAt: "Apr 18, 2024" },

      { type: "add entry reference", entryKey: "intellijidea", reference: "https://x.com/Aikoyori/status/1780910028737896821/photo/1" },
      { type: "add entry createdAt", entryKey: "intellijidea", createdAt: "Apr 18, 2024" },

      { type: "add entry reference", entryKey: "kubernetes", reference: "https://x.com/Aikoyori/status/1780940981199888615/photo/1" },
      { type: "add entry createdAt", entryKey: "kubernetes", createdAt: "Apr 18, 2024" },

      { type: "add entry reference", entryKey: "godotengine", reference: "https://x.com/Aikoyori/status/1781057884606095837/photo/1" },
      { type: "add entry createdAt", entryKey: "godotengine", createdAt: "Apr 19, 2024" },

      { type: "add entry reference", entryKey: "neovim", reference: "https://x.com/Aikoyori/status/1781259928533180611/photo/1" },
      { type: "add entry createdAt", entryKey: "neovim", createdAt: "Apr 19, 2024" },

      { type: "add entry reference", entryKey: "bun", reference: "https://x.com/Aikoyori/status/1781289390960254997/photo/1" },
      { type: "add entry createdAt", entryKey: "bun", createdAt: "Apr 19, 2024" },

      { type: "add entry reference", entryKey: "papermc", reference: "https://x.com/Aikoyori/status/1781358588537290966/photo/1" },
      { type: "add entry createdAt", entryKey: "papermc", createdAt: "Apr 19, 2024" },

      { type: "add entry reference", entryKey: "elysiajs", reference: "https://x.com/Aikoyori/status/1781736339148587262/photo/1" },
      { type: "add entry reference", entryKey: "elysiajs", reference: "https://x.com/Aikoyori/status/1781737037567340690/photo/1" },
      { type: "add entry createdAt", entryKey: "elysiajs", createdAt: "Apr 21, 2024" },

      { type: "add entry reference", entryKey: "docker", reference: "https://x.com/Aikoyori/status/1782619951419077071/photo/1" },
      { type: "add entry reference", entryKey: "docker", reference: "https://x.com/Aikoyori/status/1782622539463934233/photo/1" },
      { type: "add entry reference", entryKey: "docker", reference: "https://x.com/Aikoyori/status/1782629797522444752/photo/1" },
      { type: "add entry createdAt", entryKey: "docker", createdAt: "Apr 23, 2024" },

      { type: "add entry reference", entryKey: "gamechanger", reference: "https://x.com/Aikoyori/status/1783175183798501461/photo/1" },
      { type: "add entry createdAt", entryKey: "gamechanger", createdAt: "Apr 24, 2024" },

      { type: "add entry reference", entryKey: "osu", reference: "https://x.com/Aikoyori/status/1785392162831794317/photo/1" },
      { type: "add entry reference", entryKey: "osu", reference: "https://x.com/Aikoyori/status/1785394556508508182/photo/1" },
      { type: "add entry reference", entryKey: "osu", reference: "https://x.com/Aikoyori/status/1785396647536812161/photo/1" },
      { type: "add entry reference", entryKey: "osu", reference: "https://x.com/Aikoyori/status/1785661915156603054/photo/1" },
      { type: "add entry createdAt", entryKey: "osu", createdAt: "May 1, 2024" },

      { type: "add entry reference", entryKey: "imhex", reference: "https://x.com/WerWolv/status/1806807278416281861?s=20" },

      // From Commit History
      { type: "add entry createdAt", entryKey: "imhex", createdAt: "Apr 22, 2024" },
      { type: "add entry createdAt", entryKey: "mirin-template-for-notitg", createdAt: "Apr 24, 2024" },
    ]
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/aikoyori" }
  ],

  // logVerbose: true
}

// From aikoyori's x timeline
// Hoishiane Aikoyori 
// https://x.com/Aikoyori/status/1690655914737704960 (aug 13 2023)

// 


// From aikoyori's thread:

// Salesforce by Nous4g1
// https://x.com/Nous4g1/status/1782863935307473127

// IWI by Feudal_ism
// https://x.com/Feudal_ism/status/1780897967303770407

// Republic Pictures by EpicbP
// https://x.com/EpicbP/status/1781493240241566000

// JigsawCh by EarthSeraphEdna
// https://x.com/EarthSeraphEdna/status/1783982286775484695

// Ikea by necronival
// https://x.com/necronival/status/1780867702334402672

// Chess.com by chess.com
// https://x.com/chesscom/status/1781372066555367628

// Sneed feed n seed by jojohand_dev
// https://x.com/Jojohand_dev/status/1781348526481453420

