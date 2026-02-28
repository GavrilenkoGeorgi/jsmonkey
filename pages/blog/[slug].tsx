import type { NextPage, GetStaticPaths } from "next";
import Head from "next/head";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { getFileExt } from "../../utils";
import { postProps, staticPropsParams } from "../../types";

import HeroSection from "../../components/layout/HeroSection";
import FadeIn from "../../components/layout/Animation/FadeIn";
import styles from "../../styles/Main.module.scss";
import blogStyles from "../../styles/Blog.module.sass";
import markdownStyles from "../../styles/Markdown.module.sass";

// Helper function to extract excerpt from markdown
function extractExcerpt(markdown: string, maxLength: number = 160): string {
  const plainText =
    markdown
      .replace(/^#+\s+/gm, "") // Remove headers
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images ![alt](url)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links [text](url) with text
      .replace(/[*_`]/g, "") // Remove markdown formatting
      .split("\n")
      .find((line) => line.trim().length > 0) || "";

  return (
    plainText.substring(0, maxLength).trim() +
    (plainText.length > maxLength ? "..." : "")
  );
}

const Post: NextPage<postProps> = ({ frontmatter, markdown, slug }) => {
  const excerpt = extractExcerpt(markdown);
  const title = frontmatter.title as string;
  const description = excerpt;
  const canonicalUrl = `https://jsmonkey.netlify.app/blog/${slug}`;
  const ogImageUrl = `https://jsmonkey.netlify.app${frontmatter.image}`;
  const ogImageType = `image/${getFileExt(frontmatter.image)}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="JSMonkey blog page pattern." />
        <meta property="og:image:type" content={ogImageType} />
        <meta property="og:site_name" content="JSMonkey" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className={styles.main}>
        <HeroSection
          heading={frontmatter.title}
          image={{ src: frontmatter.image }}
        />
        <section className={styles.containerMd}>
          <article className={blogStyles.article}>
            <p className={blogStyles.timestamp}>{frontmatter.date}</p>
            <hr className={blogStyles.hr} />
            <FadeIn>
              <ReactMarkdown className={markdownStyles.reactMarkDown}>
                {markdown}
              </ReactMarkdown>
            </FadeIn>
          </article>
        </section>
      </main>
    </>
  );
};

export default Post;

export const getStaticProps = async ({
  params: { slug },
}: staticPropsParams) => {
  const fileContent = matter(
    fs.readFileSync(`./content/blogs/${slug}.md`, "utf8"),
  );
  const frontmatter = fileContent.data;
  const markdown = fileContent.content;

  return {
    props: { frontmatter, markdown, slug },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filesInProject = fs.readdirSync("./content/blogs");

  const paths = filesInProject.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false,
  };
};
