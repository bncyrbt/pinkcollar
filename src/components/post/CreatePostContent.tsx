import { PageContentLayout } from "../layout/PageContentLayout";
import { PostInfoBlock } from "./PostInfoBlock";

export const CreatePostContent = () => {
  return (
    <PageContentLayout
      main={<PostInfoBlock />}
      aside={<div className="text-bold">Contributors </div>}
    />
  );
};
