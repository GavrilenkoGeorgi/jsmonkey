import { ReactNode } from 'react'

export type blogProps = {
  posts: [
    postCardProps
  ]
}

export type projectSectionProps = {
  project: {
    id: number,
    title: string,
    url: string
    text: string
    imageUrl: string
    images: string[],
    description: string,
    logoImgs: string[]
  }
}

export type projectCarouselProps = {
  images: string[]
}

export type layoutProps = {
  children: ReactNode
}

export type headProps = {
  title: string,
  descr: string,
  children: ReactNode
}

export type navLink = {
  id: string,
  label: string,
  url: string
}

export type postCardProps = {
  title: string,
  body: string,
  slug?: string,
  date: string,
  image?: string,
  author?: string
}

export type heroSectionProps = {
  heading: string,
  image: MediaImage
}

export type socialIconProps = {
  image: MediaImage,
  altText: string,
  link: string
}

export type Data = {
  name?: string,
  error?: string,
  result?: any // TODO Define this later?
}

export type postProps = {
  frontmatter: any,
  markdown: any
}

export type staticPropsParams = {
  params: {
    slug: string
  }
}
