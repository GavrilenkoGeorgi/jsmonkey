import { FC } from 'react'
import Navbar from '../navigation/NavBar'
import Footer from '../layout/Footer'

import { ToastMsgContextProvider } from '../../context/toastMsgStore'
import Toast from './Toast'

import { layoutProps } from '../../types'
import styles from './Layout.module.sass'

const Layout:FC<layoutProps> = ({ children }) => {

  // form on the main page uses context to set error messages
  // toast is a global component positioned on top of everything

  return <div className={styles.layout}>
    <Navbar />
    <ToastMsgContextProvider>
      {children}
      <Toast />
    </ToastMsgContextProvider>
    <Footer />
  </div>
}

export default Layout
