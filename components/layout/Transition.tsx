import { FC } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { layoutProps } from '../../types'

const Transition:FC<layoutProps> = ({ children }) => {

  const { asPath } = useRouter()

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

  return <div className='transition'>
    <AnimatePresence
      initial={false}
      mode='wait'
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={asPath}
        variants={variants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{type: 'linear'}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
}

export default Transition
