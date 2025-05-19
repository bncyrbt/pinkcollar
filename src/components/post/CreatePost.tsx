import { AddContributorsBlock } from "../contribution/AddContributorsBlock";
import { PageContentLayout } from "../layout/PageContentLayout";
import { Divider } from "../ui/divider";
import { PostMainBlock } from "./main/PostMainBlock";

export const CreatePost = () => {
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
