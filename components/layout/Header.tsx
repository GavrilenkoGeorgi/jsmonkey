import { FC } from "react";
import Head from "next/head";

import { HeadProps } from "../../types";

const Header: FC<HeadProps> = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.descr} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Header;
