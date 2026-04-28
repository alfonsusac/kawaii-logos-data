import type { AuthorDef } from "../resolve/author"

export const sawaratsuki: AuthorDef = {
  source: {
    from: "github",
    repo: "SAWARATSUKI/KawaiiLogos",
  }
}



// preprocess: [ (filepath) => filepath.includes('ResponseCode') ? `${ filepath.split('/')[ 2 ].split('.')[ 0 ] }/${ filepath.split('/')[ 2 ].split('.')[ 1 ] }/${ filepath.split('/')[ 2 ] }` : filepath ]
