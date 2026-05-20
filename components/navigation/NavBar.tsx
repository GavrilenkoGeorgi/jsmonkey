import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "react-aria-components";

import { useTheme } from "../../context/ThemeContext";
import { useComponentVisible, useScrollDirection } from "../../hooks";
import { NavLink } from "../../types";
import * as gtag from "../../utils/gtag";
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
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18A9 9 0 0 1 12 3z" fill="currentColor" stroke="none" />
  </svg>
);

const NavBar: FC = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const { theme, resolvedTheme, setTheme } = useTheme();
  // useSyncExternalStore gives false on the server and true on the client
  // without any setState call, avoiding the set-state-in-effect violation
  // that the mounted+useEffect pattern would produce.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // mobile menu
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [open, setOpen] = useState(false);
  // Derived: menu is only visually open when both the open flag is set
  // AND the click-outside hook confirms focus is still inside the nav.
  // This replaces the useEffect that synced isComponentVisible → open.
  const isMenuOpen = open && isComponentVisible;

  const toggleMenu = () => {
    const willOpen = !isMenuOpen;
    setOpen(willOpen);
    gtag.event({
      action: "mobile_menu_toggle",
      category: "engagement",
      label: willOpen ? "open" : "close",
    });
  };

  const cycleTheme = () => {
    let newTheme: string;
    if (theme === "system") {
      newTheme = resolvedTheme === "light" ? "dark" : "light";
    } else if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "system";
    }
    setTheme(newTheme as "system" | "light" | "dark");
    gtag.event({
      action: "theme_change",
      category: "engagement",
      label: newTheme,
    });
  };

  const themeIcon = !mounted ? (
    <SystemIcon />
  ) : theme === "system" ? (
    <SystemIcon />
  ) : resolvedTheme === "light" ? (
    <SunIcon />
  ) : (
    <MoonIcon />
  );
  const themeLabel = !mounted
    ? "System"
    : theme === "system"
      ? "System"
      : resolvedTheme === "light"
        ? "Light"
        : "Dark";

  // hide on route change
  useEffect(() => {
    router.events.on("routeChangeStart", () => setOpen(false));
    return () => router.events.off("routeChangeStart", setOpen);
  }, [router.events]);

  // close mobile menu on scroll (setState inside a callback — not in the
  // effect body directly, so this does not trigger cascading renders)
  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("scroll", closeMenu, { passive: true });
    return () => window.removeEventListener("scroll", closeMenu);
  }, []);

  const navigation: Array<NavLink> = [
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
          <Button className={styles.toggleBtn} onClick={toggleMenu}>
            <MenuToggleBtn open={isMenuOpen} />
          </Button>
          <div
            className={`${styles.linksContainer} ${isMenuOpen && styles.open}`}
          >
            <Button
              className={styles.themeToggle}
              onClick={cycleTheme}
              aria-label={`Theme: ${themeLabel}. Click to change.`}
            >
              {themeIcon}
            </Button>
            {navLinks}
          </div>
        </div>
      </nav>
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.openOverlay : ""}`}
      ></div>
    </>
  );
};

export default NavBar;
