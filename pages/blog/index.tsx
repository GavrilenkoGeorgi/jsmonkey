import fs from "fs";
import matter from "gray-matter";
import type { NextPage } from "next";
import Head from "next/head";
import { blogProps } from "../../types";
import HeroSection from "../../components/layout/HeroSection";
import ListOfPosts from "../../components/blog/ListOfPosts";
import heroImg from "../../assets/images/blog-hero-image.webp";

import styles from "../../styles/Main.module.scss";

const Blog: NextPage<blogProps> = ({ posts }) => {
  const title = "My Blog";
  const description = "Mostly random thoughts about things that interest me.";
  const canonicalUrl = "https://jsmonkey.netlify.app/blog";
  const ogImageUrl =
    "https://jsmonkey.netlify.app/img/og/jsmonkey-blog-og-img.png";

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
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="JSMonkey" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
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
          <ListOfPosts posts={posts} />
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
