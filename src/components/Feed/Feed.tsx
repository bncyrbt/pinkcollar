"use client";
import { useExploreFeedPosts } from "@/hooks/useExploreFeedPosts";
import { FeedViewPost } from "../post/FeedViewPost";
import Link from "next/link";
import { AppRoutes } from "@/routes";

export const Feed = () => {
  const { data } = useExploreFeedPosts();
  return (
    <div className="flex-2 flex flex-row flex-wrap gap-y-4 gap-x-4 py-8">
      {data?.map((post) => (
        <Link key={post.id} href={AppRoutes.Post(post.id)}>
          <FeedViewPost title={post.title} />
        </Link>
      ))}
    </div>
  );
};
