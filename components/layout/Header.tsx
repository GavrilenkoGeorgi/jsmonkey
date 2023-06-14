import { FC } from 'react'
import Head from 'next/head'

import { headProps } from '../../types'

const Header:FC<headProps> = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.descr} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default Header
