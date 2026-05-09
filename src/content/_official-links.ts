import type { AuthorDefinition } from "../resolve-author"
import type { HttpsSite } from "../resolve-url"
import { author_definitions } from "./_authors"

export const official_links = [
  {
    label: "Haskell",
    url: "https://www.haskell.org/?uwu=true",
    author: author_definitions.sawaratsuki
  },
  {
    label: "Vue.js",
    url: "https://vuejs.org/?uwu",
    author: author_definitions.icarusgk
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/?kawaii=true",
    author: author_definitions.sawaratsuki
  },
  {
    label: "Angular",
    url: "https://angular.dev/?uwu=true",
    author: author_definitions.sawaratsuki
  },
  {
    label: "Elysia",
    url: "https://elysiajs.com/",
    author: author_definitions.saltyaom
  },
  {
    label: "Hono",
    url: "https://hono.dev/?kawaii=true",
    author: author_definitions.sawaratsuki
  },
  {
    label: "Misskey.io",
    url: "https://misskey.io",
    author: author_definitions.sawaratsuki
  },
  {
    label: "React",
    url: "https://react.dev/?uwu=true",
    author: author_definitions.sawaratsuki
  },
] satisfies {
  label: string
  url: HttpsSite
  author: AuthorDefinition
}[]