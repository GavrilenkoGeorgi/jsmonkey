import fs from 'fs'
import matter from 'gray-matter'
import type { NextPage } from 'next'
import { BlogProps } from '../../types'

import Header from '../../components/layout/Header'
import HeroSection from '../../components/pages/HeroSection'
import ListOfPosts from '../../components/blog/ListOfPosts'
import heroImg from '../../assets/images/blog-hero-image.webp'

import styles from '../../styles/Main.module.scss'

const Blog: NextPage<BlogProps> = ({ posts }) => {

  return <div className={styles.container}>
    <Header
      title="Blog posts"
      descr="Paginated list of blog posts."
    >
    </Header>
    <main className={styles.main}>
      <HeroSection heading="Blog" image={heroImg}/>
      <ListOfPosts posts={posts} />
    </main>
  </div>
}

export default Blog

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {

  const filesInBlogs = fs.readdirSync('./content/blogs')

  const posts = filesInBlogs.map(filename => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8')
    const matterData = matter(file)

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
