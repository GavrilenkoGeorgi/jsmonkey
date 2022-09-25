import { FC, ReactNode } from 'react'
import Head from 'next/head'

type headProps = {
  title: string,
  descr: string,
  children: ReactNode
}

const Header:FC<headProps> = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.descr} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default Header
