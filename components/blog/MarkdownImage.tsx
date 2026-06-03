import { ComponentPropsWithoutRef } from "react";

import styles from "../../styles/Markdown.module.sass";

type Props = ComponentPropsWithoutRef<"img"> & { node?: unknown };

const FLOAT_PREFIX = "float|";

const MarkdownImage = ({ src, alt, node: _node, ...props }: Props) => {
  const isFloat = typeof alt === "string" && alt.startsWith(FLOAT_PREFIX);
  const cleanAlt = isFloat ? alt.slice(FLOAT_PREFIX.length) : alt;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={cleanAlt ?? ""}
      className={isFloat ? styles.imgFloat : styles.imgWide}
      {...props}
    />
  );
};

export default MarkdownImage;
