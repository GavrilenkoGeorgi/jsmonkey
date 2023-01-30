import { FC } from 'react'
import Image from 'next/image'

import ProjectCarousel from '../layout/Carousel/ProjectCarousel'
import { projectSectionProps } from '../../types'

import styles from './ProjectSection.module.sass'

const ProjectSection:FC<projectSectionProps> = ({ project }) => {

  const { title, description, images, logoImgs, url } = project

  return <section className={styles.container}>

    <aside className={styles.carousel}>
      <ProjectCarousel images={images}/>
    </aside>

    <div className={styles.description}>
      <h2 className={styles.projectTitle}>{title}</h2>
      <p className={styles.projectInfo}>{description}</p>
      <p className={styles.projectURL}>{url}</p>
      <div className={styles.logos}>
        {logoImgs.map(logo =>
          <Image
            key={logo}
            src={`/img/logos/${logo}.svg`}
            className={styles.logo}
            alt={`Icon ${logo}.`}
            width={30}
            height={30}
          />)}
      </div>
    </div>

  </section>
}

export default ProjectSection
