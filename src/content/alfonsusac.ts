import type { AuthorDefinition } from "../resolve-author"
// import { AlfonsImageDef } from "../resolve/entries"

export const alfonsusac: AuthorDefinition = {
  socials: {
    github: 'https://github.com/alfonsusac',
    x: 'https://x.com/alfonsusac',
    bsky: 'https://bsky.app/profile/alfon.dev',
    site: 'https://alfon.dev',
  },
  fundings: [
    { type: "github", url: "https://github.com/sponsors/alfonsusac" },
    { type: "paypal", url: "https://paypal.me/alfonsusac" },
  ],
  license: {
    type: "CC BY-NC-SA 4.0",
    // has_trademark: true
  },
  entries: {
    skillissue: {
      label: "Skill Issue",
      images: [ { src: './assets/alfon/skillissue.svg' } ],
      references: "https://x.com/alfonsusac/status/1784866280329101567",
      createdAt: "Apr 24, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    lgtm: {
      label: "LGTM",
      images: [ { src: './assets/alfon/lgtm.svg' } ],
      references: "https://x.com/alfonsusac/status/1791794434415452538/photo/1",
      createdAt: "May 18, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    supabase: {
      label: "Supabase",
      images: [ { src: './assets/alfon/supabase.svg' } ],
      references: "https://x.com/alfonsusac/status/1796382462404432172/photo/1",
      createdAt: "May 31, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    emailthing: {
      label: "EmailThing",
      images: [ { src: './assets/alfon/emailthing.svg' } ],
      references: "https://x.com/alfonsusac/status/1796410786153480239/photo/1",
      createdAt: "May 31, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    sharkchat: {
      label: "Sharkchat",
      images: [ { src: './assets/alfon/sharkchat.svg' } ],
      references: "https://x.com/alfonsusac/status/1797574105908347191/photo/1",
      createdAt: "Jun 3, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    devscale: {
      label: "Devscale",
      images: [
        { src: "./assets/alfon/devscale-cute.png" },
        { src: "./assets/alfon/devscale-cute.svg" },
        { src: "./assets/alfon/devscale-cute-print.png" },
        { src: "./assets/alfon/devscale-cute-print.svg" }
      ],
      references: "https://x.com/alfonsusac/status/1782380677784351210/photo/1",
      createdAt: "Apr 22, 2024",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    npmx: {
      label: "npmx.dev",
      images: [
        { src: "./assets/alfon/npmx-cute-trans.svg" },
        { src: "./assets/alfon/npmx-cute-trans.png" },
        { src: "./assets/alfon/npmx-cute.svg" },
        { src: "./assets/alfon/npmx-cute.png" },
        { src: "./assets/alfon/npmx-succubus.svg" },
        { src: "./assets/alfon/npmx-succubus.png" },
      ],
      references: [
        "https://x.com/alfonsusac/status/2037489500566540426/photo/1",
        "https://x.com/alfonsusac/status/2037531045034365371/photo/1",
        "https://x.com/alfonsusac/status/2039052035291758798/photo/1",
        "https://bsky.app/profile/alfon.dev/post/3mi2ookqupc2n",
        "https://bsky.app/profile/alfon.dev/post/3mi24cddc6k2d",
        "https://bsky.app/profile/npmx.dev/post/3miet6zoc5s2i",
      ],
      createdAt: "Mar 27, 2026",
      license: { type: "CC BY-NC-SA 4.0" }
    },
    qris: {
      label: "QRIS",
      images: [
        { src: './assets/alfon/qris-id.png' },
        { src: './assets/alfon/qris-id.svg' },
        { src: './assets/alfon/qris-jp.png' },
        { src: './assets/alfon/qris-jp.svg' }
      ],
      createdAt: "May 9, 2026",
      license: { type: "CC BY-NC-SA 4.0" }
    },
  }
}