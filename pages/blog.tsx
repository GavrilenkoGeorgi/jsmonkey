import type { NextPage } from 'next'
import Header from '../components/layout/Header'
import styles from '../styles/Main.module.scss'

const Blog: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header title="Blog posts" descr="Paginated list of blog posts.">
      </Header>

      <main className={styles.main}>
      <h1>Blog</h1>
      </main>
    </div>
  )
}

export default Blog
