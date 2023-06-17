import { FC } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Noto_Sans } from '@next/font/google'
import { ToastMsgContextProvider } from '../../context/toastMsgStore'
import { layoutProps } from '../../types'

import Transition from './Transition'
import Navbar from '../navigation/NavBar'
import Footer from '../layout/Footer'
import Toast from './Toast'
import styles from './Layout.module.sass'

const font = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap'
})

const Layout:FC<layoutProps> = ({ children }) => {

  // form on the main page uses context to set error messages
  // toast is a global component positioned on top of everything

  return <div className={`${styles.layout} ${font.className}`}>
    <Navbar />
      <ToastMsgContextProvider>
        <ParallaxProvider>
          <Transition>
            {children}
          </Transition>
        </ParallaxProvider>
        <Toast />
      </ToastMsgContextProvider>
    <Footer />
  </div>
}

export default Layout
