import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

import { getRandomColor } from '../../utils'
import styles from './MainPageCTA.module.sass'

const MainPageCTA: FC = () => {

  const [iconColor, setIconColor] = useState('#000')
  const [isHovering, setIsHovered] = useState(false)

  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  useEffect(() => {
    setIconColor(getRandomColor())
  }, [isHovering])

  return <div className={styles.downloadResumeCTA}>
    <Link href="/pdf/GavrilenkoResume.pdf">
      Resume in pdf
      {/* SVG Current color fill from css hover state */}
      <svg className={styles.svgIcon} width="35" height="35" viewBox="0 0 20 20">
        <path fill="currentColor" d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z"/>
        <path fill="currentColor" d="M10 15l5-6h-4V1H9v8H5l5 6z"/>
      </svg>
    </Link>
    <Link href="https://github.com/GavrilenkoGeorgi"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      My Github
      {/* SVG current color fill from component hover state, we can set arbitrary color on the fly */}
      <svg className={styles.svgIcon} width="35" height="35" viewBox="0 0 512 512">
        <path // inline to be able to control fill color of the path in next.js
          className={styles.path}
          fill={iconColor}
          d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1 c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14 c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5 c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7 c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3 c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7 C480,134.8,379.7,32,256,32z"
        />
      </svg>
    </Link>
  </div>
}

export default MainPageCTA
