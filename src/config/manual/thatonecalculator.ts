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
            objectFit: "cover",
        },
        {
            title: "vyper",
            imgSrc: GitHub.camoUrl("e3ab90845b9c976247fdb39c21821cd934d7c392c632ed7511b5e4cdd0f7b12b/68747470733a2f2f63646e2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f56797065722e706e673f763d32"),
            source: blueskyPost("t1c.dev", "3lc6soxakhs2h"),
            objectFit: "cover",
        },
    ],
}
