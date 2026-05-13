# kawaii-logos-data'

JSON Data for kawaii logos made by several artists that are scraped every few hours and stored as a JSON static file that you can access via a link. 

## How do I use it?

- If you want to check the scraped data in Github, head over to the `data` branch.
- If you want to see the generated types, head over to the `types` branch.

To consume the data as an API, simply fetch to the following link:
```
https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/data/data.json
```

### Fetch API

Modern fetch api can be used to fetch the data and parse it as JSON


You can get the type from this page:

- https://github.com/alfonsusac/kawaii-logos-data/blob/data/types.ts

And copy paste the types into your project.

```tsx
import KawaiiLogosData from "kawaii-types"

const result = await fetch(`https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/data/data.json`)
  .then(res => res.json()) as KawaiiLogosData.Response

```

### Examples

If you want to see how the data is consumed, check out [alfonsusac/service-title-logo](https://github.com/alfonsusac/service-title-logo).

### Contributions

Contributions are welcome. If you have any question feel free to ask in our [Discord server](https://discord.gg/hb9TapzhQe)


## Related Projects

Also check out these other cool projects

- [irfanhakim-as/vtuber-icons](https://github.com/irfanhakim-as/vtuber-icons)
- [Ender-Wiggin2019/VTuber-Logos-Collection](https://github.com/Ender-Wiggin2019/VTuber-Logos-Collection)


## Todo

- [ ] Add more pictures from twitter, soruced from irfanhakim's repo.
- [ ] Add more pictures from other artists, soruced from ender-wiggin's repos.