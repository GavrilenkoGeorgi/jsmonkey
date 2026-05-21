"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "react-aria-components";

import { useTheme } from "../../context/ThemeContext";
import { useComponentVisible, useScrollDirection } from "../../hooks";
import { ROUTES } from "../../routes";
import { NavLink } from "../../types";
import * as gtag from "../../utils/gtag";
import Logo from "../layout/Logo";
import { MenuToggleBtn } from "./MenuToggleBtn";
import styles from "./NavBar.module.sass";
import {
  getNavbarStyle,
  getNavLinkClass,
  nextTheme,
  themeIcon,
  themeLabel,
} from "./NavBarUtils";

const navigation: NavLink[] = [
  { label: "Blog", url: ROUTES.BLOG },
  { label: "Projects", url: ROUTES.PROJECTS },
];

const NavBar: FC = () => {
  const pathname = usePathname();
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
  const [openedOnPathname, setOpenedOnPathname] = useState<string | null>(null);
  // Derived: menu is only visually open when it was opened on the current
  // pathname AND the click-outside hook confirms focus is still inside the nav.
  // Comparing against pathname replaces the route-change effect, avoiding the
  // synchronous-setState-in-effect pattern flagged by react-hooks rules.
  const isMenuOpen = openedOnPathname === pathname && isComponentVisible;

  const toggleMenu = (): void => {
    const willOpen = !isMenuOpen;
    setOpenedOnPathname(willOpen ? pathname : null);
    gtag.event({
      action: "mobile_menu_toggle",
      category: "engagement",
      label: willOpen ? "open" : "close",
    });
  };

  const cycleTheme = (): void => {
    const newTheme = nextTheme(theme);
    setTheme(newTheme);
    gtag.event({
      action: "theme_change",
      category: "engagement",
      label: newTheme,
    });
  };

  // close mobile menu on scroll (setState inside a callback — not in the
  // effect body directly, so this does not trigger cascading renders)
  useEffect(() => {
    const closeMenu = () => setOpenedOnPathname(null);
    window.addEventListener("scroll", closeMenu, { passive: true });
    return () => window.removeEventListener("scroll", closeMenu);
  }, []);

  const navLinks = navigation.map((link) => (
    <Link href={link.url} key={link.url} scroll={false}>
      <button className={getNavLinkClass(pathname === link.url)}>
        {link.label}
      </button>
    </Link>
  ));

  return (
    <>
      <nav className={getNavbarStyle(scrollDirection)} ref={ref}>
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
              aria-label={`Theme: ${themeLabel(mounted, theme, resolvedTheme)}. Click to change.`}
            >
              {themeIcon(mounted, theme, resolvedTheme)}
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
