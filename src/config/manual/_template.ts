import { GitHub } from "../../lib/url-github"
import type { Entries } from "../../../types"

// Please use this template to add your own logo that is not scraped automatically.
// don't forget to read the notes at the very bottom of this file before making a PR.

// For consistency, please use the same handleName, variable name, and the filename.
export const _template: Entries[number] = {
  // Your handle name, this will be shown below the image, and in the sidebar of the vtuberlogos.alfon.dev
  // For consistency, please use the same handleName, variable name, and the filename.
  handleName: "_template",
  // Link to your pfp, i recommend using GitHub's as it changes automatically
  pfp: "https://avatars.githubusercontent.com/alfonsusac",
  // Your social links. Currently only supports github and twitter (because thats what I used)
  link: {
    github: "alfonsusac", // Your github username (optional)
    twitter: "alfonsusac", // Your twitter username (optional)
  },
  // Link to the page that contains all the source of the image (optional)
  // (example, github repository/google drive link that contains your image collection)
  // .  If you want me to automatically scrape all image of a repository, 
  //     please use `/src/config/images-scraped.ts` instead.
  repository: "https://github.com/alfonsusac/kawaii-logos-data/tree/main",
  // License of the images (optional). For now, you can only set one license for all images.
  license: {
    // License label. I recommend using CC BY-NC-SA 4.0.
    // . you can also write "Custom" if you want to write your own, but make sure to include the link to the license file.
    label: "CC BY-NC-SA 4.0", 
    // Link to the license of the image. If its not in the repository, then use the link to the license provider (optional)
    href: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  },
  // List of group of images (think of it as a variant of your logo, or different logo for different occasion)
  groups: [ // <- this indicates an array of object.
    {
      // Title of the group
      name: "Skill Issue",
      files: [
        {
          // Usually its the filename. This will be shown for people to select the variant
          title: "SkillIssue.png",
          // The URL of the raw image file. This needs to be supported in the <img src="URL" /> tag
          //  usually it ends in .png, .jpg, .jpeg, .svg, etc.
          imgSrc: GitHub.selfHostedStaticAssetUrl("skillissue.svg"),
          // The source of the image where people can go to the source of the image (where I found them)
          // . example: GitHub file linke, google drive link, twitter post, etc.
          source: 'https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/skillissue.svg',
        },
        {
          title: "SkillIssueDarkened.png",
          imgSrc: GitHub.selfHostedStaticAssetUrl("skillissue.svg"),
          source: 'https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/skillissue.svg',
        },
      ]
    }
  ],
}

// After you are done, please import this variable into `src/config/images-manual.ts` and submit a Pull Request.