import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

type PostProps = {
  frontmatter: any,
  markdown: any
}

const Post: NextPage<PostProps> = ({ frontmatter, markdown }) => {

  return <section>
    <h1>{frontmatter.title}</h1>
    <span>{frontmatter.date}</span>

    <hr />
    <ReactMarkdown>
      {markdown}
    </ReactMarkdown>
  </section>
}

export default Post

type staticPropsParams = {
  params: {
    slug: string
  }
}

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
