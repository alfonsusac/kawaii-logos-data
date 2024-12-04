import { GitHub } from "../../lib/url-github"
import type { Entries } from "../../../types"
import { blueskyPost } from "../../lib/url"

export const thatonecalculator: Entries[number] = {
    handleName: "thatonecalculator",
    link: {
        bluesky: "t1c.dev",
        github: "thatonecalculator",
    },
    images: [
        {
            title: "surrealdb",
            imgSrc: GitHub.camoUrl("f31c33f2e40d78c54ca8de8c761763bed0c98cbb481582c32311ddb26af769ac/68747470733a2f2f63646e2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f5375727265616c44422e706e67"),
            source: blueskyPost("t1c.dev", "3lc42nknqrc2d"),
            objectFit: "contain",
        },
        {
            title: "vyper",
            imgSrc: GitHub.camoUrl("be1d9d90f545740cad8b8c4835d6b8a6338c10500190c522ce305af465396735/68747470733a2f2f63646e2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f56797065725f6e65772e706e67"),
            source: blueskyPost("t1c.dev", "3lc6ug7omck2t"),
            objectFit: "contain",
        },
    ],
}
