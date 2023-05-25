import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ProjectSlider from '../layout/Carousel/ProjectSlider'
import FadeIn from '../layout/Animation/FadeIn'
import { projectSectionProps } from '../../types'

import styles from './ProjectSection.module.sass'

const ProjectSection:FC<projectSectionProps> = ({ project }) => {

  const { title, description, images, logoImgs, url } = project

  return <section className={styles.container} id={title}>
    <FadeIn>
      <aside className={styles.carousel}>
        <ProjectSlider images={images}/>
      </aside>

      <div className={styles.description}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <p className={styles.projectInfo}>{description}</p>
        <Link href={url}>
          <p className={styles.projectURL}>{url}</p>
        </Link>
        <div className={styles.logos}>
          {logoImgs.map(logo =>
            <Image
              key={logo}
              src={`/img/logos/${logo}.svg`}
              className={styles.logo}
              alt={`Icon ${logo}.`}
              width={45}
              height={45}
            />)}
        </div>
      </div>
    {/* Fix this! */}
    <div className={`${styles.divider} ${styles.divTransparent} ${styles.divStopper}`}></div>
    </FadeIn>
  </section>
}

export default ProjectSection
