import fs from "fs";
import matter from "gray-matter";
import type { NextPage } from "next";
import type { Metadata } from "next";
import { blogProps } from "../../types";

import { buildMetadata } from "../../utils/metadata";
import HeroSection from "../../components/layout/HeroSection";
import ListOfPosts from "../../components/blog/ListOfPosts";
import FadeIn from "../../components/layout/Animation/FadeIn";
import heroImg from "../../assets/images/blog-hero-image.webp";

import styles from "../../styles/Main.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "My Blog",
    description: "Mostly random thoughts about things that interest me.",
    canonicalPath: "https://jsmonkey.netlify.app/blog",
    ogImageUrl: "https://jsmonkey.netlify.app/img/og/jsmonkey-blog-og-img.png",
    ogImageAlt: "JSMonkey blog page pattern.",
  });
}

const Blog: NextPage<blogProps> = ({ posts }) => {
  return (
    <>
      <main className={styles.main}>
        <HeroSection heading="Blog" image={heroImg} />
        <section className={styles.section}>
          <article className={styles.containerMd}>
            <p className={styles.pageParagraph}>
              Here I plan (ha-ha) to share my passion for software development,
              explore the world of technology, show you my travel adventures,
              and delve into the realms of my other beloved hobbies. As a
              software developer, I find solace in lines of code, but my
              interests extend far beyond the digital realm.
            </p>
            <p className={styles.pageParagraph}>
              Join me as I blend my technical expertise with tales of
              wanderlust, insights into the latest tech trends, and musings on
              various hobbies that bring joy and balance to my life.
            </p>
          </article>
          <FadeIn>
            <ListOfPosts posts={posts} />
          </FadeIn>
        </section>
      </main>
    </>
  );
};

export default Blog;

// Instead of fetching your `/api` route you can call the same
// function directly in `getStaticProps`
export const getStaticProps = async () => {
  const filesInBlogs = fs.readdirSync("./content/blogs").reverse();

  const posts = filesInBlogs.map((filename) => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, "utf8");
    const matterData = matter(file);

    return {
      ...matterData.data,
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
