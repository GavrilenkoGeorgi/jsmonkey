import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ProjectSlider from '../layout/Slider/ProjectSlider'
import FadeIn from '../layout/Animation/FadeIn'
import { projectSectionProps } from '../../types'

import styles from './ProjectSection.module.sass'

const ProjectSection:FC<projectSectionProps> = ({ project, animate }) => {

  const { title, description, images, logoImgs, url } = project

  const section = () => <section className={styles.container} id={title}>
    <aside className={styles.carousel}>
      <h2 className={styles.projectTitle}>
        {title}
      </h2>
      <ProjectSlider
        title={title}
        images={images}
        priority={animate ? false : true}
      />
    </aside>

    <div className={styles.description}>
      {description.map((par, index) =>
      <p key={index} className={styles.projectInfo}>
        {par}
      </p>
      )}

      <div className={`${styles.divider} ${styles.divTransparent} ${styles.divStopper}`}></div>
      <Link href={url}>
        <p className={styles.projectURL}>{url}</p>
      </Link>
      <div className={styles.logos}>
        {logoImgs.map(logo =>
          <Image
            key={logo}
            src={`/img/logos/${logo.toLowerCase()}.svg`}
            className={styles.logo}
            alt={`${logo} icon.`}
            width={45}
            height={45}
          />)}
      </div>
    </div>
  </section>

  return <>
    {animate ? <FadeIn >{section()}</FadeIn> : section()}
  </>
}

export default ProjectSection
