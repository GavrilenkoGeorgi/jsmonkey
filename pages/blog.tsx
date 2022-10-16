import fs from 'fs'
import matter from 'gray-matter'
import type { NextPage } from 'next'
import { formatRelative, subDays } from 'date-fns'

import Header from '../components/layout/Header'
import BlogHeroSection from '../components/pages/BlogHeroSection'
import PostCTA from '../components/blog/PostCTA'
import styles from '../styles/Main.module.scss'

type BlogProps = {
  posts: [
    {
      title: string,
      body: string,
      slug: string
    }
  ]
}

const Blog: NextPage<BlogProps> = ({ posts }) => {

  // console.log(posts)

  const date = () => {
    const humanReadableDate = formatRelative(subDays(new Date(), 3), new Date())
    return humanReadableDate
  }

  const listOfPosts = posts.map(post =>
      <div className={styles.postContainer}
        key={post.slug}
      >
        <PostCTA
          id={post.slug}
          date={date()}
          title={post.title}
          body={post.body}
        />
      </div>
  )

  return (
    <div className={styles.container}>
      <Header
        title="Blog posts"
        descr="Paginated list of blog posts."
      >
      </Header>
      <main className={styles.main}>
        <BlogHeroSection />
        <aside>
          {listOfPosts}
        </aside>
      </main>
    </div>
  )
}

export default Blog

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {

  const filesInBlogs = fs.readdirSync('./content/blogs')

  const posts = filesInBlogs.map(filename => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8')
    const matterData = matter(file)
    console.log(matterData.data)

    return {
      ...matterData.data,
      slug: filename.slice(0, filename.indexOf('.'))
    }
  })

  return {
    props: {
      posts
    }
  }

}
