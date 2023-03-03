import { FC, useEffect } from 'react'
import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { layoutProps } from '../../../types'

const slideIn = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: "+25%" }
}

const FadeIn: FC<layoutProps> = ({ children }) => {

  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return <motion.div
    ref={ref}
    animate={controls}
    initial="hidden"
    variants={slideIn}
  >
    {children}
  </motion.div>
}

export default FadeIn
