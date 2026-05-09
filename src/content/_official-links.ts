import type { AuthorDefinition } from "../resolve-author"
import type { HttpsSite } from "../resolve-url"
import { author_definitions } from "./_authors"

export const official_links = [
  {
    label: "Haskell",
    url: "https://www.haskell.org/?uwu=true",
    authorid: "sawaratsuki"
  },
  {
    label: "Vue.js",
    url: "https://vuejs.org/?uwu",
    authorid: "icarusgk"
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/?kawaii=true",
    authorid: "sawaratsuki"
  },
  {
    label: "Angular",
    url: "https://angular.dev/?uwu=true",
    authorid: "sawaratsuki"
  },
  {
    label: "Elysia",
    url: "https://elysiajs.com/",
    authorid: "saltyaom"
  },
  {
    label: "Hono",
    url: "https://hono.dev/?kawaii=true",
    authorid: "sawaratsuki"
  },
  {
    label: "Misskey.io",
    url: "https://misskey.io",
    authorid: "sawaratsuki"
  },
  {
    label: "React",
    url: "https://react.dev/?uwu=true",
    authorid: "sawaratsuki"
  },
] satisfies {
  label: string
  url: HttpsSite
  authorid: keyof typeof author_definitions
}[]