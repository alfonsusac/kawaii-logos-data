# kawaii-logos-data
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
const result = await fetch(`https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json`)
  .then(res => res.json())
const authors = result.data
```

### Typescript
Install types through your favorite package manager
```shell
pnpm i kawaii-logos-data@git://github.com:alfonsusac/kawaii-logos-data.git#types
```

```tsx
import { Data } from "kawaii-logos-data"

const result = await fetch(`https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json`)
  .then(res => res.json()) as Data
const authors = result.data
                     // ^? Entries
```
#### Update
Installation through github are not tracked with semantic versioning so whenever there is update you need to call the update command
```shell
pnpm update kawaii-logos-data
```

#### Uninstalling the package
Installation through github doesn't have a "fixed" name, it depends on whatever name you give it when installing it (i.e `logo-types@git...` -> `pnpm uninstall logo-types`)
```shell
pnpm uninstall kawaii-logos-data
```

### Examples

If you want to see how the data is consumed, check out [alfonsusac/service-title-logo](https://github.com/alfonsusac/service-title-logo).

### Contributions

Contributions are welcome


## Related Projects

Also check out these other cool projects

- [irfanhakim-as/vtuber-icons](https://github.com/irfanhakim-as/vtuber-icons)
- [Ender-Wiggin2019/VTuber-Logos-Collection](https://github.com/Ender-Wiggin2019/VTuber-Logos-Collection)