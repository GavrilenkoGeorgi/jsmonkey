import fs from 'fs'
import matter from 'gray-matter'
import type { NextPage } from 'next'
import { blogProps } from '../../types'

import NextSeoHead from '../../components/layout/NextSeoHead'
import HeroSection from '../../components/layout/HeroSection'
import ListOfPosts from '../../components/blog/ListOfPosts'
import heroImg from '../../assets/images/blog-hero-image.webp'

import styles from '../../styles/Main.module.scss'

const Blog: NextPage<blogProps> = ({ posts }) => {

  return <>
    <NextSeoHead
      title='My Blog'
      description='Mostly random thoughts about things that interest me.'
      canonical='https://jsmonkey.dev'
      openGraph={{
        url: 'https://jsmonkey.dev/blog',
        title: 'My Blog',
        description: 'Mostly random thoughts about things that interest me.',
        images: [
          {
            url: 'https://jsmonkey.dev/img/og/jsmonkey-blog-og-img.png',
            width: 1200,
            height: 630,
            alt: 'JSMonkey blog page pattern.',
            type: 'image/png'
          }
        ],
        siteName: 'JSMonkey'
      }}
    />
    <main className={styles.main}>
      <HeroSection heading="Blog" image={heroImg}/>
      <ListOfPosts posts={posts} />
    </main>
  </>
}

export default Blog

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {

  const filesInBlogs = fs.readdirSync('./content/blogs').reverse()

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
