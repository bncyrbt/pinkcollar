"use client";
import { useExploreFeedPosts } from "@/hooks/useExploreFeedPosts";
import { FeedViewPost } from "../post/FeedViewPost";
import Link from "next/link";
import { AppRoutes } from "@/routes";
import Spinner from "../ui/spinner";
import { useAuthStore } from "@/lib/store/auth";

export const Feed = () => {
  const { isAuthenticated } = useAuthStore();
  const { data, isLoading } = useExploreFeedPosts();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-row items-center p-8">
        <span className="font-bold">Please login to view this page</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-row items-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-2 flex flex-row flex-wrap gap-y-4 gap-x-4 py-8">
      {data?.map((post) => (
        <Link key={post.id} href={AppRoutes.Post(post.id)}>
          <FeedViewPost post={post} />
        </Link>
      ))}
    </div>
  );
};
