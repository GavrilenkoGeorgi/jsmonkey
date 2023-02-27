import { FC } from 'react'
import { NextSeo } from 'next-seo'
import { nextSeoProps } from '../../types'

const NextSeoHead: FC<nextSeoProps> = (props) => {
  return <NextSeo {...props} />
}

export default NextSeoHead
