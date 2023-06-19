import { ReactNode, Dispatch, SetStateAction } from 'react'

export type reCaptchaScore = {
  action: string,
  challenge_ts: string,
  hostname: string,
  score: number,
}

export type contactFormMessage = {
  email: string,
  message: string
}

export type blogProps = {
  posts: [
    postCardProps
  ]
}

export type sliderNavArrowProps = {
  clickHandler: void,
  hasPrev: boolean,
  label: string
}

export type projectSectionProps = {
  animate: boolean,
  project: {
    id: number,
    title: string,
    url: string,
    text: string[],
    imageUrl: string,
    images: string[],
    description: string[],
    logoImgs: string[]
  }
}

export type projectCarouselProps = {
  title: string,
  priority: boolean,
  images: string[]
}

export type layoutProps = {
  children: ReactNode
}

export type nextSeoProps = {
  title: string,
  description: string,
  canonical: string,
  openGraph: {
    url: string,
    title: string,
    description: string,
    images: [{
      url: string,
      width: number,
      height: number,
      alt: string,
      type: string
    }],
    siteName: string
  }
}

export type headProps = {
  title: string,
  descr: string,
  children: ReactNode
}

export type navLink = {
  label: string,
  url: string
}

export type postCardProps = {
  title: string,
  body: string,
  slug?: string,
  date: string,
  image?: string,
  author?: string
}

export type heroSectionProps = {
  heading: string,
  image: MediaImage
}

export type socialIconProps = {
  image: MediaImage,
  altText: string,
  link: string
}

export type Data = {
  name?: string,
  error?: string,
  result?: any // TODO Define this later?
}

// individual post page props
export type postProps = {
  frontmatter: any, //?
  markdown: any, //?
  slug: string
}

export type staticPropsParams = {
  params: {
    slug: string
  }
}

export type btnProps = {
  label: string,
  type?: string,
  link?: string,
  submitting?: boolean
}

// ---------------------
// Error Message Context
// ---------------------

export enum toastTypes {
  error = 'error',
  success = 'success'
}

export type ToastMsgDataType = {
  message: string,
  type: string
}

export interface ToastMsgContextProps {
  toastMsg: ToastMsgDataType,
  setToastMsg: Dispatch<SetStateAction<ToastMsgDataType>>
}

// Navbar
export type ToggleBtnProps = {
  open: boolean
}
