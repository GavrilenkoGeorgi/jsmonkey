import type { NextPage, GetServerSideProps } from 'next'
import Header from '../components/layout/Header'
import styles from '../styles/Main.module.scss'

type BlogProps = {
  posts: [
    {
      title: string,
      body: string,
      id: string
    }
  ]
}

const Blog: NextPage<BlogProps> = ({ posts }) => {

  const listOfPosts = posts.map(post =>
    <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )

  return (
    <div className={styles.container}>
      <Header title="Blog posts" descr="Paginated list of blog posts.">
      </Header>
      <main className={styles.main}>
        <h1>Blog</h1>
        {listOfPosts}
      </main>
    </div>
  )
}

export default Blog

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {

  const response = await fetch(`http://${process.env.API_HOST}/api/posts`)
  const data = await response.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { posts: data }
  }
}
