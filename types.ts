import { ReactNode, Dispatch, SetStateAction } from "react";

export type ContactFormMessage = {
  email: string;
  message: string;
};

export type BlogProps = {
  posts: PostCardProps[];
};

export type SliderNavArrowProps = {
  clickHandler: () => void;
  hasPrev: boolean;
  label: string;
};

export type ProjectSectionProps = {
  animate: boolean;
  project: {
    id: number;
    title: string;
    url: string;
    linkDisabled?: boolean;
    text: string[];
    imageUrl: string;
    mobileImageUrl: string;
    images: string[];
    description: string;
    logoImgs: string[];
  };
};

export type ProjectCarouselProps = {
  title: string;
  priority: boolean;
  images: string[];
};

export type LayoutProps = {
  children: ReactNode;
};

export type HeadProps = {
  title: string;
  descr: string;
  children: ReactNode;
};

export type NavLink = {
  label: string;
  url: string;
};

export type PostCardProps = {
  title: string;
  body: string;
  slug?: string;
  date: string;
  image?: string;
  author?: string;
  tags?: string[];
};

export type HeroSectionProps = {
  heading: string;
  image: MediaImage;
};

export type SocialIconProps = {
  image: MediaImage;
  altText: string;
  link: string;
};

export type Data = {
  name?: string;
  error?: string;
  result?: any; // TODO Define this later?
};

// individual post page props
export type PostProps = {
  frontmatter: any; //?
  markdown: any; //?
  slug: string;
};

export type StaticPropsParams = {
  params: {
    slug: string;
  };
};

export type BtnProps = {
  label: string;
  type?: string;
  link?: string;
  submitting?: boolean;
};

// ---------------------
// Error Message Context
// ---------------------

export enum ToastTypes {
  error = "error",
  success = "success",
}

export type ToastMsgDataType = {
  message: string;
  type: string;
};

export interface ToastMsgContextProps {
  toastMsg: ToastMsgDataType;
  setToastMsg: Dispatch<SetStateAction<ToastMsgDataType>>;
}

// Navbar
export type ToggleBtnProps = {
  open: boolean;
};
