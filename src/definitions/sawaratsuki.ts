import type { AuthorDefinition } from "../resolve-author"

export const sawaratsuki: AuthorDefinition = {
  source: {
    from: "github",
    repo: "SAWARATSUKI/KawaiiLogos",
    transform: [
      { type: "replace", from: "/png", to: "" },
      { type: "replace", from: "/jpg", to: "" },
      { type: "replace", from: "/webp", to: "" },
      { type: "replace", from: "ResponseCode/", to: "" },
      { type: "replace", from: "IamSeries/", to: "" },
      // { type: "replace", from: "IamDesigner", to: "IamDesigner/IamDesigner" },
      // { type: "replace", from: "IamProgrammer", to: "IamProgrammer/IamProgrammer" },
    ],
    licenseFallback: {
      type: "custom",
      href: "https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/README_EN.md#license",
    }
  }
}



// preprocess: [ (filepath) => filepath.includes('ResponseCode') ? `${ filepath.split('/')[ 2 ].split('.')[ 0 ] }/${ filepath.split('/')[ 2 ].split('.')[ 1 ] }/${ filepath.split('/')[ 2 ] }` : filepath ]
