import { Block } from "../layout/Block";
import { PostInfoContent } from "./PostInfoContent";

export const PostInfoBlock = () => {
  return (
    <Block
      className="border-b border-black"
      header={<div className="font-bold">Post Info </div>}
      main={<PostInfoContent />}
    />
  );
};
