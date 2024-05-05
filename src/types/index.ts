export type Data = (
  Author & { images: Image[] }
)[]

export type Image = {
  title: string
  imgSrc: string
  source: string
  createdAt?: Date
  className?: string
}

export type Author = {
  handleName: string
  pfp?: string
  link: {
    github?: string
    twitter?: string
  }
  repository?: string
  license?: {
    label?: string
    href?: string
  }
}
