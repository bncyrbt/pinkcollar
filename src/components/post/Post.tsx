import { AddContributorsBlock } from "../contribution/ContributorsBlock";
import { PageContentLayout } from "../layout/PageContentLayout";
import { Divider } from "../ui/divider";
import { PostMainBlock } from "./main/PostMainBlock";
import { PostPublishBlock } from "./publish/PostPublishBlock";

export const Post = () => {
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
          <div>
            <AddContributorsBlock />
            <PostPublishBlock />
          </div>
        }
      />
    </div>
  );
};

const CreatePostHeader = () => {
  return (
    <div className="pl-16 py-4 flex flex-row items-center gap-4">
      <div className="text-2xl">
        <span className="font-bold">Create Post</span>
      </div>
    </div>
  );
};
