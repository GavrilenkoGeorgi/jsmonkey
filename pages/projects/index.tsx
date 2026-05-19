import type { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import Head from "next/head";
import HeroSection from "../../components/layout/HeroSection";
import ProjectSection from "../../components/projects/ProjectSection";
import heroImg from "../../assets/images/projects-pattern.webp";

import { ProjectSectionProps } from "../../types";
import projectsData from "../../data/projects.json";

import styles from "../../styles/Main.module.scss";

type ProjectItem = ProjectSectionProps["project"];

type ProjectsPageProps = {
  projects: ProjectItem[];
};

const Projects: NextPage<ProjectsPageProps> = ({ projects }) => {
  const title = "Projects list";
  const description = "List of things that I am working on.";
  const canonicalUrl = "https://jsmonkey.netlify.app/projects";
  const ogImageUrl =
    "https://jsmonkey.netlify.app/img/og/jsmonkey-projects-og-img.png";

  return (
    <div className={styles.container}>
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
        <meta
          property="og:image:alt"
          content="JSMonkey projects page pattern."
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="JSMonkey" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main className={styles.main}>
        <HeroSection heading="Projects" image={heroImg} />
        {projects.map((item, index) => (
          <ProjectSection key={item.id} project={item} animate={index > 0} />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = () => {
  const contentDir = path.join(process.cwd(), "content", "projects");

  const projects = [...projectsData]
    .sort((a, b) => a.id - b.id) // id controls display order of the projects
    .map((item) => {
      const filePath = path.join(contentDir, `${item.slug}.md`);
      const description = fs.readFileSync(filePath, "utf-8");
      return { ...item, description };
    });

  return { props: { projects } };
};

export default Projects;
