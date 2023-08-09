import { FC } from 'react'
import styles from '../../../styles/Main.module.scss'

const MainPageIntro:FC = () => {
  return <>
    <p className={styles.leadParagraph}>
      Hi, my name is Gosha, and I am a Web Developer.
    </p>
    <p className={styles.pageParagraph}>
      I&apos;m a passionate software developer with expertise in a wide
      range of modern technologies and frameworks. With a strong focus
      on front-end development, my toolkit includes TypeScript, ECMAScript 6/ES2015,
      Next.js, React, and Redux, allowing me to craft engaging and
      interactive user experiences. On the back end, I excel in working
      with Node.js, Express, and MongoDB to build robust and scalable applications.
    </p>
    <p className={styles.pageParagraph}>
      I am well-versed in optimizing performance and ensuring simplicity in my code,
      always striving to create efficient and elegant solutions.
    </p>
    <p className={styles.pageParagraph}>
      In addition to my technical skills, I&apos;m an advocate for testing,
      employing Jest and Cypress to ensure the reliability and stability
      of my applications. I believe that quality assurance is an
      integral part of the development process.
    </p>
    <p className={styles.pageParagraph}>
      When it comes to languages, I am fluent in English (Upper Intermediate, B2)
      and a native speaker of Ukrainian and Russian. Currently based in the city of Kyiv,
      I am open to relocation opportunities that align with my professional aspirations.
    </p>
  </>
}

export default MainPageIntro
