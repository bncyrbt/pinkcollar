"use client";
import { usePostStore } from "@/lib/store/post";
import { Block } from "../../layout/Block";
import { ProfileAvatar } from "../../profile/ProfileAvatar";
import { PostMainBlockContent } from "./PostMainBlockContent";

export const PostMainBlock = () => {
  const { post } = usePostStore();
  return (
    <Block
      className="border-b border-black"
      header={
        <div className="pl-16 py-4 flex flex-row items-center gap-4">
          <ProfileAvatar variant="small" />
          <div className="text-xl">
            <span className="font-bold">Tomer Even Ari</span>
            <span>{` / ${post.title}`}</span>
          </div>
        </div>
      }
      main={<PostMainBlockContent />}
    />
  );
};
