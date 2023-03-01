import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { postProps, staticPropsParams } from '../../types'

import Header from '../../components/layout/Header'
import HeroSection from '../../components/layout/HeroSection'
import styles from '../../styles/Main.module.scss'
import blogStyles from '../../styles/Blog.module.sass'
import markdownStyles from '../../styles/Markdown.module.sass'

const Post: NextPage<postProps> = ({ frontmatter, markdown }) => {

  const heroImage = {
    src: frontmatter.image
  }

  return <>
    <Header
      title="Blog posts"
      descr="Paginated list of blog posts."
    >
    </Header>
    <main className={styles.main}>
      <HeroSection
        heading={frontmatter.title}
        image={heroImage}
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
    props: { frontmatter, markdown }
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
