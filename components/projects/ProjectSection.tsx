"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

import { ProjectSectionProps } from "../../types";
import FadeIn from "../layout/Animation/FadeIn";
import ProjectSlider from "../layout/Slider/ProjectSlider";
import styles from "./ProjectSection.module.sass";

const ProjectSection: FC<ProjectSectionProps> = ({ project, animate }) => {
  const { title, description, images, logoImgs, url, linkDisabled } = project;

  const section = () => (
    <section className={styles.container}>
      <aside className={styles.carousel}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <ProjectSlider
          title={title}
          images={images}
          priority={animate ? false : true}
        />
      </aside>

      <div className={styles.description}>
        <ReactMarkdown>{description}</ReactMarkdown>
        <div
          className={`${styles.divider} ${styles.divTransparent} ${styles.divStopper}`}
        ></div>
        <Link
          href={url}
          aria-disabled={linkDisabled}
          className={styles.projectURL}
          onClick={linkDisabled ? (e) => e.preventDefault() : undefined}
        >
          {url}
        </Link>
        <div className={styles.logos}>
          {logoImgs.map((logo) => (
            <Image
              key={logo}
              src={`/img/logos/${logo.toLowerCase()}.svg`}
              className={styles.logo}
              alt={`${logo} icon.`}
              width={45}
              height={45}
            />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={styles.anchor} id={title}>
      {animate ? <FadeIn>{section()}</FadeIn> : section()}
    </div>
  );
};

export default ProjectSection;
