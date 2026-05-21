"use client";

import { usePathname } from "next/navigation";

import { useHashScroll } from "../../hooks";

const HashScroll = () => {
  const pathname = usePathname();
  useHashScroll(pathname);

  return null;
};

export default HashScroll;
