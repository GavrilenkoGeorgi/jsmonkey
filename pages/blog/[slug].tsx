import type { NextPage, GetStaticPaths } from 'next'
import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { getFileExt } from '../../utils'
import { postProps, staticPropsParams } from '../../types'

import NextSeoHead from '../../components/layout/NextSeoHead'
import HeroSection from '../../components/layout/HeroSection'
import styles from '../../styles/Main.module.scss'
import blogStyles from '../../styles/Blog.module.sass'
import markdownStyles from '../../styles/Markdown.module.sass'

const Post: NextPage<postProps> = ({ frontmatter, markdown, slug }) => {
  return <>
    <NextSeoHead
      title={frontmatter.title}
      description='Mostly random thoughts about things that interest me.'
      canonical={`https://jsmonkey.dev/blog/${slug}`}
      openGraph={{
        url: `https://jsmonkey.dev/blog/${slug}`,
        title: frontmatter.title,
        description: 'Mostly random thoughts about things that interest me.',
        images: [
          {
            url: `https://jsmonkey.dev${frontmatter.image}`,
            width: 1200,
            height: 630,
            alt: 'JSMonkey blog page pattern.',
            type: `image/${getFileExt(frontmatter.image)}`
          }
        ],
        siteName: 'JSMonkey'
      }}
    />
    <main className={styles.main}>
      <HeroSection
        heading={frontmatter.title}
        image={{ src: frontmatter.image }}
      />
      <section className={styles.containerMd}>
        <article className={blogStyles.article}>
          <p className={blogStyles.timestamp}>{frontmatter.date}</p>
          <hr className={blogStyles.hr} />
          <ReactMarkdown
            className={markdownStyles.reactMarkDown}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </section>
    </main>
  </>
}

export default Post

export const getStaticProps = async ({ params: { slug } }: staticPropsParams) => {
  const fileContent = matter(fs.readFileSync(`./content/blogs/${slug}.md`, 'utf8'))
  let frontmatter = fileContent.data
  const markdown = fileContent.content

  return {
    props: { frontmatter, markdown, slug }
  }
}

export const getStaticPaths:GetStaticPaths = async () => {

  const filesInProject = fs.readdirSync('./content/blogs')

  const paths = filesInProject.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { slug: filename }}
  })

  return {
    paths,
    fallback: false
  }
}
