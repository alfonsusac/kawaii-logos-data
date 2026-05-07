import type { AuthorDefinition } from "../resolve-author"

export const sawaratsuki: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/SAWARATSUKI/KawaiiLogos",
    transform: [
      { type: "replace", from: "/png", to: "" },
      { type: "replace", from: "/jpg", to: "" },
      { type: "replace", from: "/webp", to: "" },
      { type: "replace", from: "ResponseCode/", to: "" },
      { type: "replace", from: "IamSeries/", to: "" },
      { type: "replace", from: "type1/技術者倫理", to: "技術者倫理-type1" },
      { type: "replace", from: "type2/技術者倫理", to: "技術者倫理-type2" },
    ],
    licenseFallback: {
      type: "custom",
      href: "https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/README_EN.md#license",
    }
  },
  entries: {
    "akari-bot": {
      label: "Akari Bot",
      license: {
        type: "All Rights Reserved",
        // reference: "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/LICENSE"
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
      },
      images: [
        { src: { type: "github-blob", url: "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/akaribot_logo.png" } }
      ],
      references: [
        "https://github.com/Teahouse-Studios/akari-bot/blob/master/assets/akaribot_logo.png",
        "https://skeb.jp/@sawaratsuki/works/27",
      ]
    },
    "astral": {
      label: "Astral",
      license: {
        type: "All Rights Reserved",
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
        // reference: "https://github.com/lino-levan/astral/blob/main/LICENSE"
      },
      images: [
        { src: { type: "github-blob", url: "https://github.com/lino-levan/astral/blob/main/docs/static/astral.png" } }
      ],
      references: [
        "https://github.com/lino-levan/astral/blob/main/docs/static/astral.png",
        "https://skeb.jp/@sawaratsuki/works/21",
      ]
    },
    "hinoshiba": {
      label: "Hinoshiba",
      license: {
        type: "All Rights Reserved",
        reference: "https://lp.skeb.jp/creator?locale=en#:~:text=Creators%20have%20the%20right%20to%20freely%20post,work%20of%20each%20creation"
      },
      images: [
        { src: { type: "github-blob", url: "https://github.com/hinoshiba/hinoshiba.github.io/blob/master/img/hinoshiba_kawaii.png"}}
      ],
      references: [
        "https://github.com/hinoshiba/hinoshiba.github.io/blob/master/img/hinoshiba_kawaii.png",
        "https://skeb.jp/@sawaratsuki/works/10",
      ]
    }

  }
}

// No source file: (from skeb) 
// https://skeb.jp/@sawaratsuki/works/26
// https://skeb.jp/@sawaratsuki/works/25
// https://skeb.jp/@sawaratsuki/works/24
// https://skeb.jp/@sawaratsuki/works/20
// https://skeb.jp/@sawaratsuki/works/18
// https://skeb.jp/@sawaratsuki/works/16
// https://skeb.jp/@sawaratsuki/works/13
// https://skeb.jp/@sawaratsuki/works/12
// https://skeb.jp/@sawaratsuki/works/9
// https://skeb.jp/@sawaratsuki/works/8
// https://skeb.jp/@sawaratsuki/works/5
// https://skeb.jp/@sawaratsuki/works/4
// https://skeb.jp/@sawaratsuki/works/3
// https://skeb.jp/@sawaratsuki/works/2
// https://skeb.jp/@sawaratsuki/works/1