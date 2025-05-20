"use client";
import { usePost } from "@/hooks/usePost";
import { PageContentLayout } from "../layout/PageContentLayout";
import { Divider } from "../ui/divider";
import { PostMainBlock } from "./main/PostMainBlock";
import { PostContributorsBlock } from "./contributors/PostContributorsBlock";
import { PostInteractionBlock } from "./interactions/PostInteractionBlock";

export const ViewPost = ({ postId }: { postId: string }) => {
  const { data, isLoading } = usePost({ postId });
  if (isLoading) {
    return null;
  }

  if (!data) {
    return <div>NOT FOUND</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <PostHeader />
      <Divider />
      <PageContentLayout
        main={
          <>
            <PostMainBlock post={data} />
            <PostInteractionBlock post={data} />
          </>
        }
        aside={
          <div className="sticky top-0">
            <PostContributorsBlock post={data} />
          </div>
        }
      />
    </div>
  );
};

const PostHeader = () => {
  return (
    <div className="pl-16 pr-4 py-4 flex flex-row items-center justify-between gap-4">
      <div className="text-2xl">
        <span className="font-bold">View Post</span>
      </div>
      <div></div>
    </div>
  );
};
