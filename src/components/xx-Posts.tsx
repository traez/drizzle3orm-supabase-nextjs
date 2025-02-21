"use client";

import { Post } from "@/db/schema";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [areMorePosts, setAreMorePosts] = useState(true);

  const getPosts = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const limit = 5;
    const { posts: newPosts } = await fetch(
      `/api/posts?page=${page}&limit=${limit}`
    ).then((res) => res.json());

    if (newPosts.length < limit) {
      setAreMorePosts(false);
    }

    if (page === 1) {
      setPosts(newPosts);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (areMorePosts) {
      getPosts();
    }
  }, [page, areMorePosts]);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 100;
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = pageHeight - currentPosition;

      if (distanceFromBottom <= buffer && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="mt-10 w-full max-w-lg flex flex-col gap-6">
      {posts.map((post) => {
        const imageSrc = post.imageUrl + `?random=${post.id}`;

        return (
          <div
            key={post.id}
            className="bg-white/10 rounded-lg overflow-hidden p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p>{post.text}</p>
              <p>{post.id}</p>
            </div>

            <img
              src={imageSrc}
              alt="post"
              className="w-full object-cover h-60 rounded-md"
            />
          </div>
        );
      })}
      {loading && <p className="text-center">Loading more posts...</p>}
    </div>
  );
}

export default Posts;
