import { AddContributorsBlock } from "../contribution/AddContributorsBlock";
import { PageContentLayout } from "../layout/PageContentLayout";
import { PostInfoBlock } from "./PostInfoBlock";

export const CreatePostPageContent = () => {
  return (
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
  );
};
