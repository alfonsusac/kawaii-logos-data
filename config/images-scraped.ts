import { type Author } from "../types";
import { authors } from "./authors";

type ScrapedImages = {
  repoPath: `${string}/${string}`;
  author: Author;
  path?: string;
  className?: string;
};

export const scrapedImages: ScrapedImages[] = [
  // {
  //   repoPath: "Crysta1221/tech_logos",
  //   author: authors.cr1sta_dev,
  //   className: "object-contain",
  // },
  // {
  //   repoPath: "Aikoyori/ProgrammingVTuberLogos",
  //   author: authors.aikoyori,
  //   className: "object-contain",
  // },
  // {
  //   ownerRepoPath: 'SAWARATSUKI/ServiceLogos',
  //   author: authors.sawaratsuki,
  //   className: 'object-contain'
  // },
  // {
  //   repoPath: "G2-Games/fun-logos",
  //   author: authors["g2-games"],
  //   className: "object-contain",
  // },
  {
    repoPath: "mkpoli/VTuber-Styled-Logos",
    path: "logos",
    author: authors["mkpoli"],
    className: "",
  },
];
