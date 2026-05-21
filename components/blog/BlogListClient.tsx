"use client";

import { FC } from "react";

import { useBlogFilters } from "../../hooks";
import { PostCardProps } from "../../types";
import BlogControls from "./BlogControls";
import ListOfPosts from "./ListOfPosts";

type BlogListClientProps = {
  posts: PostCardProps[];
};

const BlogListClient: FC<BlogListClientProps> = ({ posts }) => {
  const { filters, setFilters, allTags, displayedPosts } =
    useBlogFilters(posts);

  return (
    <>
      <BlogControls
        availableTags={allTags}
        filters={filters}
        onFiltersChange={setFilters}
      />
      <ListOfPosts posts={displayedPosts} />
    </>
  );
};

export default BlogListClient;
