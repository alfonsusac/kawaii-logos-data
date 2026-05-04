import type { AuthorDefinition } from "../resolve-author"

export const hcho3: AuthorDefinition = {
  displayName: "hcho3",
  pfp: "https://avatars.githubusercontent.com/hcho3",
  socials: {
    github: "hcho3",
    x: "hcho3_ml",
  },
  license: {
    type: "CC BY-NC-SA 4.0",
    // has_trademark: false,
  },
  entries: {
    xgboost: {
      label: "XGBoost",
      images: [
        { src: { type: "github-blob", url: "https://github.com/hcho3/XGBoostVTuberLogo/blob/main/XGBoostVTuberLogo-Path.svg" } },
        { src: { type: "github-blob", url: "https://github.com/hcho3/XGBoostVTuberLogo/blob/main/XGBoostVTuberLogo.png" } },
        { src: { type: "github-blob", url: "https://github.com/hcho3/XGBoostVTuberLogo/blob/main/XGBoostVTuberLogo.svg" } },
      ]
    }
  }
}