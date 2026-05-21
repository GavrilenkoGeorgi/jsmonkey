import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { BlogFilters, defaultFilters } from "../components/blog/BlogControls";
import { PostCardProps } from "../types";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}

export function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as HTMLInputElement)
    ) {
      setIsComponentVisible(false);
    } else {
      setIsComponentVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

export const useNextImageImageFade = (_className: string) => {
  const [className, setClassName] = useState(`${_className} opacity-0`);
  return {
    className,
    onLoad: () => {
      setClassName(`${_className} opacity-1`);
    },
  };
};

export function useEmblaSelectedIndex() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return { emblaRef, emblaApi, selectedIndex };
}

// Blog page filters deserve separate hook
export function useBlogFilters(posts: PostCardProps[]) {
  const [filters, setFilters] = useState<BlogFilters>(defaultFilters);
  const { sortKey, tagFilter, searchQuery } = filters;

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort(),
    [posts],
  );

  const displayedPosts = useMemo(() => {
    let result = posts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (tagFilter) {
      result = result.filter((p) => p.tags?.includes(tagFilter));
    }

    result = [...result].sort((a, b) => {
      switch (sortKey) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "date-desc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [posts, searchQuery, tagFilter, sortKey]);

  return { filters, setFilters, allTags, displayedPosts };
}

// Hash scrolling

const HASH_SCROLL_RETRY_LIMIT = 12;
const HASH_SCROLL_RETRY_DELAY = 100;

let hashScrollTimeouts: number[] = [];

const clearHashScrollTimeouts = () => {
  hashScrollTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  hashScrollTimeouts = [];
};

const getHashId = (hash: string): string => {
  const encodedId = hash.slice(1).split("#").pop() ?? "";

  try {
    return decodeURIComponent(encodedId);
  } catch {
    return encodedId;
  }
};

const normalizeHash = (hash: string): string => {
  const encodedId = hash.slice(1).split("#").pop() ?? "";
  const normalizedHash = `#${encodedId}`;

  if (encodedId && hash !== normalizedHash) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${normalizedHash}`,
    );
  }

  return normalizedHash;
};

const getHashTarget = (hash: string): HTMLElement | null => {
  return document.getElementById(getHashId(hash));
};

const scrollToHashTarget = (hash: string): boolean => {
  const element = getHashTarget(hash);
  if (!element) {
    return false;
  }

  const navbarHeight = document.querySelector("nav")?.clientHeight ?? 0;
  const top =
    element.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "auto",
  });

  return true;
};

const scheduleHashScroll = (attempt = 0) => {
  if (attempt === 0) {
    clearHashScrollTimeouts();
  }

  if (!window.location.hash) {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const currentHash = normalizeHash(window.location.hash);
      if (!currentHash) {
        return;
      }

      if (scrollToHashTarget(currentHash)) {
        return;
      }

      if (attempt < HASH_SCROLL_RETRY_LIMIT) {
        const timeout = window.setTimeout(
          () => scheduleHashScroll(attempt + 1),
          HASH_SCROLL_RETRY_DELAY,
        );
        hashScrollTimeouts.push(timeout);
      }
    });
  });
};

export const useHashScroll = (pathname: string) => {
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const pathnameChanged =
      previousPathname.current !== null &&
      previousPathname.current !== pathname;

    previousPathname.current = pathname;

    if (window.location.hash) {
      scheduleHashScroll();
    } else if (pathnameChanged) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    const handleHashChange = () => {
      if (window.location.hash) {
        scheduleHashScroll();
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      clearHashScrollTimeouts();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);
};
