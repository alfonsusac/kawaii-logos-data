import type { AuthorDefinition } from "../resolve/author"

export const sawaratsuki: AuthorDefinition = {
  source: {
    from: "github",
    repo: "SAWARATSUKI/KawaiiLogos",
  }
}



// preprocess: [ (filepath) => filepath.includes('ResponseCode') ? `${ filepath.split('/')[ 2 ].split('.')[ 0 ] }/${ filepath.split('/')[ 2 ].split('.')[ 1 ] }/${ filepath.split('/')[ 2 ] }` : filepath ]
