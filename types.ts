export type BlogProps = {
  posts: [
    postCardProps
  ]
}

export type postCardProps = {
  title: string,
  body: string,
  slug?: string,
  date: string,
  image: string,
  author: string
}
