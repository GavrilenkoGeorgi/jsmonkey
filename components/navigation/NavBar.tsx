import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { navLink } from "../../types";
import { useScrollDirection, useComponentVisible } from "../../hooks";
import { useTheme } from "../../context/ThemeContext";

import Logo from "../layout/Logo";
import { MenuToggleBtn } from "./MenuToggleBtn";
import styles from "./NavBar.module.sass";

const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const NavBar: FC = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // mobile menu
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const cycleTheme = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
  };

  const themeIcon = !mounted ? (
    <SystemIcon />
  ) : theme === "light" ? (
    <SunIcon />
  ) : theme === "dark" ? (
    <MoonIcon />
  ) : (
    <SystemIcon />
  );
  const themeLabel = !mounted
    ? "System"
    : theme === "light"
      ? "Light"
      : theme === "dark"
        ? "Dark"
        : "System";

  // hide on route change
  useEffect(() => {
    router.events.on("routeChangeStart", () => setOpen(false));
    return () => router.events.off("routeChangeStart", setOpen);
  }, [router.events]);

  // hide on outside click
  useEffect(() => {
    if (!isComponentVisible) setOpen(false);
  }, [isComponentVisible]);

  // close mobile menu and hide overlay on scroll
  useEffect(() => {
    setOpen((prevState) => {
      return prevState && false;
    });
  }, [scrollDirection]);

  const navigation: Array<navLink> = [
    {
      label: "Blog",
      url: "/blog",
    },
    {
      label: "Projects",
      url: "/projects",
    },
  ];

  const navLinks = navigation.map((link) => (
    <Link href={link.url} key={link.url} scroll={false}>
      <button
        className={
          router.pathname === link.url
            ? `${styles.navLink} ${styles.current}`
            : styles.navLink
        }
      >
        {link.label}
      </button>
    </Link>
  ));

  const navbarStyle = `${styles.nav} ${scrollDirection === "down" ? styles.hiddenNav : styles.visibleNav}`;

  return (
    <>
      <nav className={navbarStyle} ref={ref}>
        <div className={styles.navigationContainer}>
          <Logo />
          <div className={styles.toggleBtnContainer} onClick={toggleMenu}>
            <MenuToggleBtn open={open} />
          </div>
          <div className={`${styles.linksContainer} ${open && styles.open}`}>
            {navLinks}
            <button
              className={styles.themeToggle}
              onClick={cycleTheme}
              aria-label={`Theme: ${themeLabel}. Click to change.`}
              title={`Theme: ${themeLabel}`}
            >
              {themeIcon}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`${styles.overlay} ${open ? styles.openOverlay : ""}`}
      ></div>
    </>
  );
};

export default NavBar;
