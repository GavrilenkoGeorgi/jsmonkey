import { FC } from "react";
import styles from "../../../styles/Main.module.scss";

const MainPageIntro: FC = () => {
  return (
    <>
      <p className={styles.leadParagraph}>
        Hi, my name is Gosha, and I am a Web Developer.
      </p>
      <p className={styles.pageParagraph}>
        I specialize in building modern, scalable web applications with a strong
        focus on front-end architecture, performance, and user experience. My
        primary stack includes React, Next.js, TypeScript, Redux, TanStack
        Query, Zustand, and modern JavaScript standards, allowing me to develop
        maintainable and high-performing interfaces for complex products.
      </p>
      <p className={styles.pageParagraph}>
        I have extensive experience designing reusable component systems,
        optimizing application performance, and improving developer workflows
        across large codebases. I value clean architecture, simplicity, and
        long-term maintainability, and I approach development with a strong
        attention to detail and product quality.
      </p>
      <p className={styles.pageParagraph}>
        On the back end, I work with Node.js, Express, MongoDB, and Mongoose to
        build reliable APIs and scalable application infrastructure. I also work
        with authentication systems, validation layers, and modern development
        tooling to support full-stack application development.
      </p>
      <p className={styles.pageParagraph}>
        Testing and reliability are an important part of my workflow. I use Jest
        and related tooling to ensure stability and maintain confidence in
        production code, while keeping testing practical and focused on critical
        functionality.
      </p>
      <p className={styles.pageParagraph}>
        Beyond implementation, I enjoy improving engineering processes,
        exploring modern development patterns, and leveraging AI-assisted
        workflows to increase productivity and code quality.
      </p>
      <p className={styles.pageParagraph}>
        I am fluent in English and a native speaker of Ukrainian and Russian.
        Currently based in Kyiv, I am open to relocation opportunities and
        collaboration on ambitious, product-focused teams.
      </p>
    </>
  );
};

export default MainPageIntro;
