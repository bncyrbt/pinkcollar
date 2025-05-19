import { Block } from "../layout/Block";
import { ProfileAvatar } from "../profile/ProfileAvatar";
import { PostInfoContent } from "./PostInfoContent";

export const PostInfoBlock = () => {
  return (
    <Block
      className="border-b border-black"
      header={
        <div className="pl-16 py-4 flex flex-row items-center gap-4">
          <ProfileAvatar variant="small" />
          <div className="text-xl">
            <span className="font-bold">Tomer Even Ari</span>
            <span>/Suzi Blazer</span>
          </div>
        </div>
      }
      main={<PostInfoContent />}
    />
  );
};
