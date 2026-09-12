# kawaii-logos-data'

JSON Data for kawaii logos made by several artists that are scraped every few hours and stored as a JSON static file that you can access via a link. 

## How do I use it?

- If you want to check the scraped data in Github, head over to the `data` branch.
- If you want to see the generated types, head over to the `types` branch.

To consume the data as an API, simply fetch to the following link:
```
https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json
```

### Fetch API

Modern fetch api can be used to fetch the data and parse it as JSON

```tsx
const res = await fetch(`https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json`)
const data = await res.json() as KawaiiLogosData // Copy paste from output-types.ts
const authors = data.authors
```

### Types

Types can be retrieved from [/src/output-types.ts](https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/output-types.ts)


### Examples

If you want to see how the data is consumed, check out [alfonsusac/service-title-logo](https://github.com/alfonsusac/service-title-logo).

### Contributions

Contributions are welcome!

Fields You might need to submit your own logos:
- Author:
  - (Required) Your url-safe name - should be similar to your displayname.
  - Your display name
  - Your profile picture  - Will fallback to github, then bsky if not provided.
  - Your socials - Will retrieve extra socials linked in github if provided.
  - Your funding links - Might retrieve from github if provided.
- Do you have a github repo that we can scrape the entries off of?
  - If yes, what is the link? Any modifications? Any social post made about it?
    - Example: [src/content/aikoyori.ts](https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/content/aikoyori.ts), [src/content/andregans.ts](https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/content/andregans.ts)
  - If no, then provide
    - (Required) Your url-safe image name
    - (Required) The name of the entry
    - The license of your entry - if no license = All Rights Reserved.
    - The the entry is created
    - The image links, valid links: Github Blob URL, Gist Image URL, or local images (uploaded to this repo)
    - Any social post you made about this entry?
    - Is your logo used in any official website?
    - Example: [src/content/alfonsusac.ts](https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/content/alfonsusac.ts)

- Your url-safe names can't contain spaces or special characters since it will be used in the link i.e kawaiilogos.alfon.dev/alfonsusac
- Valid Image links are either only in github or self-hosted in this repo to prevent having broken links. If you need any logos removed feel free to make a PR. 

## Related Projects

Also check out these other cool projects

- [irfanhakim-as/vtuber-icons](https://github.com/irfanhakim-as/vtuber-icons)
- [Ender-Wiggin2019/VTuber-Logos-Collection](https://github.com/Ender-Wiggin2019/VTuber-Logos-Collection)