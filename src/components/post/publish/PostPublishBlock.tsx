import { Block } from "@/components/layout/Block";
import { PostPublishBlockContent } from "./PostPublishBlockContent";

export const PostPublishBlock = () => {
  return (
    <Block
      header={<div className="font-bold">Publish Options </div>}
      main={<PostPublishBlockContent />}
    />
  );
};
