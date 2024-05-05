# kawaii-logos-data
JSON Data for kawaii logos made by several artists that are scraped every few hours

## How do I use it?

If you just want to look around, check out the `data` branch for more information

To consume the data as an API, simply fetch to the following link:

```
https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json
```

Fetch API
```tsx
const images = await fetch(`https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json`)
  .then(res => res.json())
```

If you want to see how the data is consumed, check out [alfonsusac/service-title-logo](https://github.com/alfonsusac/service-title-logo) !!

## Related Projects

- [irfanhakim-as/vtuber-icons](https://github.com/irfanhakim-as/vtuber-icons)