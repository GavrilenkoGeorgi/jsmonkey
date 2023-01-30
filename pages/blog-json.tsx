import type { NextPage, GetServerSideProps } from 'next'
import { formatRelative, subDays } from 'date-fns'

import Header from '../components/layout/Header'
import PostCard from '../components/blog/PostCard'

import { blogProps } from '../types'
import styles from '../styles/Main.module.scss'
import posts from '../data/posts.json'

const BlogJson: NextPage<blogProps> = ({ posts }) => {

  const date = () => {
    const humanReadableDate = formatRelative(subDays(new Date(), 3), new Date())
    return humanReadableDate
  }

  const listOfPosts = posts.map(post =>
      <div className={styles.postContainer}
        key={post.slug}
      >
        <PostCard
          slug={post.slug}
          date={date()}
          title={post.title}
          body={post.body}
          image={post.image}
          author={post.author}
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
        <h1>Blog</h1>
        <p>Blog intro</p>
        <aside>
          {listOfPosts}
        </aside>
      </main>
    </div>
  )
}

export default BlogJson

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {

  // const response = await fetch(`http://${process.env.API_HOST}/api/posts`)
  // const data = await response.json()

  const data = posts

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { posts: data }
  }
}
