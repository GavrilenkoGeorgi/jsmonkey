import { useEffect, useState, useRef, useMemo } from "react";
import { postCardProps } from "../types";
import { BlogFilters, defaultFilters } from "../components/blog/BlogControls";

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

// Blog page filters deserve separate hook
export function useBlogFilters(posts: postCardProps[]) {
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
