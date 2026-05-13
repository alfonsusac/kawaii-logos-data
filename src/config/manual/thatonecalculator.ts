import { GitHub } from "../../lib/url-github"
import type { Entries } from "../../../types"
import { blueskyPost } from "../../lib/url"

export const thatonecalculator: Entries[number] = {
    handleName: "thatonecalculator",
    pfp: "https://cdn.bsky.app/img/avatar/plain/did:plc:4d3footpr6lgq6hy5m74xdmm/bafkreiaa6glnvhyy4f72tbhx6bav25xeiqq2gzc4kutxn74h5vd7uyaezi@jpeg",
    link: {
        bluesky: "t1c.dev",
        github: "thatonecalculator",
    },
    license: {
        label: "CC BY-SA 4.0",
        href: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    images: [
        {
            title: "surrealdb",
            imgSrc: GitHub.selfHostedStaticAssetUrl("surrealdb.png"),
            source: blueskyPost("t1c.dev", "3lc42nknqrc2d"),
            objectFit: "contain",
        },
        {
            title: "vyper",
            imgSrc: GitHub.selfHostedStaticAssetUrl("vyper.png"),
            source: blueskyPost("t1c.dev", "3lc6ug7omck2t"),
            objectFit: "contain",
        },
        {
            title: "avalanche",
            imgSrc: GitHub.selfHostedStaticAssetUrl("avalanche.png"),
            source: blueskyPost("t1c.dev", "3lcjhomzcsk2f"),
            objectFit: "contain",
        },
        {
            title: "capacitor",
            imgSrc: GitHub.selfHostedStaticAssetUrl("capacitor.png"),
            source: blueskyPost("t1c.dev", "3lcjhomzcsk2f"),
            objectFit: "contain",
        }
    ],
}
