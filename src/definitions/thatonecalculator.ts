import type { AuthorDefinition } from "../resolve-author"

export const thatonecalculator: AuthorDefinition = {
  displayName: "thatonecalculator",
  socials: {
    x: "thatonecalculator",
    bsky: "t1c.dev",
    site: "t1c.dev",
  },
  license: {
    type: "CC BY-SA 4.0",
    // has_trademark: true,
  },
  entries: {
    // surrealdb: {
    //   label: 'surrealdb',
    //   images: {
    //     src: { type: "unknown", url: "https://camo.githubusercontent.com/f31c33f2e40d78c54ca8de8c761763bed0c98cbb481582c32311ddb26af769ac/68747470733a2f2f63646e2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f5375727265616c44422e706e67" },
    //     references: "https://bsky.app/profile/t1c.dev/post/3lc42nknqrc2d",
    //     style: { objectFit: "contain", }
    //   }
    // },
    // vyper: {
    //   label: "vyper",
    //   images: {
    //     src: { type: "unknown", url: "https://camo.githubusercontent.com/8d78e533c334961701ace1a592f569e09fbce18e4e8c87dd47347ea3670c0c36/68747470733a2f2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f4176616c616e6368652e706e67" },
    //     references: "https://bsky.app/profile/t1c.dev/post/3lc6ug7omck2t",
    //     style: { objectFit: "contain", }
    //   },
    // },
    // avalanche: {
    //   label: "avalanche",
    //   images: {
    //     src: { type: "unknown", url: "https://camo.githubusercontent.com/8d78e533c334961701ace1a592f569e09fbce18e4e8c87dd47347ea3670c0c36/68747470733a2f2e696e65727469612e736f6369616c2f6b61776169695f6c6f676f732f4176616c616e6368652e706e67" },
    //     references: "https://bsky.app/profile/t1c.dev/post/3lcjhomzcsk2f",
    //     style: { objectFit: "contain", }
    //   }
    // },
    capacitor: {
      label: "capacitor",
      images: {
        src: "./assets/capacitor.png",
        references: "https://bsky.app/profile/t1c.dev/post/3lcjhomzcsk2f",
        style: { objectFit: "contain", }
      }
    }
  }
}