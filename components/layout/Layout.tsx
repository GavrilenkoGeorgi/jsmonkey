import { FC, ReactNode} from 'react'
import Navbar from '../navigation/NavBar'

type layoutProps = {
  children: ReactNode
}

const Layout:FC<layoutProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
)

export default Layout
