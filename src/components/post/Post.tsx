"use client";
import { usePostStore } from "@/lib/store/post";
import { AddContributorsBlock } from "../contribution/ContributorsBlock";
import { PageContentLayout } from "../layout/PageContentLayout";
import { Divider } from "../ui/divider";
import { PostMainBlock } from "./main/PostMainBlock";
import { PostPublishBlock } from "./publish/PostPublishBlock";
import { Button } from "../ui/button";

export const Post = ({ postId }: { postId?: string }) => {
  const { isEditMode } = usePostStore();
  return (
    <div className="flex flex-col w-full h-full">
      <CreatePostHeader />
      <Divider />
      <PageContentLayout
        main={
          <>
            <PostMainBlock />
          </>
        }
        aside={
          <div className="sticky top-0">
            <AddContributorsBlock />
            {isEditMode && <PostPublishBlock />}
          </div>
        }
      />
    </div>
  );
};

const CreatePostHeader = () => {
  const { isEditMode, toggleEditMode } = usePostStore();
  return (
    <div className="pl-16 pr-4 py-4 flex flex-row items-center justify-between gap-4">
      <div className="text-2xl">
        <span className="font-bold">Create Post</span>
      </div>
      <div>
        <Button variant="outline" onClick={toggleEditMode}>
          Switch to {isEditMode ? "Preview" : "Edit"} mode
        </Button>
      </div>
    </div>
  );
};
