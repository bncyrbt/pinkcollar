import { AddContributorsBlock } from "../contribution/AddContributorsBlock";
import { PageContentLayout } from "../layout/PageContentLayout";
import { Divider } from "../ui/divider";
import { PostInfoBlock } from "./PostInfoBlock";

export const CreatePostPageContent = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <CreatePostHeader />
      <Divider />
      <PageContentLayout
        main={
          <>
            <PostInfoBlock />
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
