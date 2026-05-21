import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import FadeIn from "../../../components/layout/Animation/FadeIn";
import HeroSection from "../../../components/layout/HeroSection";
import blogStyles from "../../../styles/Blog.module.sass";
import styles from "../../../styles/Main.module.sass";
import markdownStyles from "../../../styles/Markdown.module.sass";
import { PostFrontmatter } from "../../../types";
import { getFileExt } from "../../../utils";
import { buildMetadata } from "../../../utils/metadata";

type Params = Promise<{ slug: string }>;

function extractExcerpt(markdown: string, maxLength = 160): string {
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

export async function generateStaticParams() {
  const files = fs.readdirSync("./content/blogs");
  return files.map((file) => ({
    slug: file.slice(0, file.indexOf(".")),
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const fileContent = matter(
    fs.readFileSync(`./content/blogs/${slug}.md`, "utf8"),
  );
  const frontmatter = fileContent.data as PostFrontmatter;
  const markdown = fileContent.content;
  const description = extractExcerpt(markdown);

  return buildMetadata({
    title: frontmatter.title,
    description,
    siteUrl: "https://jsmonkey.netlify.app",
    canonicalPath: `https://jsmonkey.netlify.app/blog/${slug}`,
    ogImageUrl: `https://jsmonkey.netlify.app${frontmatter.image}`,
    ogImageAlt: "JSMonkey blog page pattern.",
    ogImageType: `image/${getFileExt(frontmatter.image) ?? "png"}`,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const fileContent = matter(
    fs.readFileSync(`./content/blogs/${slug}.md`, "utf8"),
  );
  const frontmatter = fileContent.data as PostFrontmatter;
  const markdown = fileContent.content;

  return (
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
            <div className={markdownStyles.reactMarkDown}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </FadeIn>
        </article>
      </section>
    </main>
  );
}
