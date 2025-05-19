"use client";
import { usePostStore } from "@/lib/store/post";
import { Block } from "../../layout/Block";
import { ProfileAvatar } from "../../profile/ProfileAvatar";
import { PostMainBlockContent } from "./PostMainBlockContent";
import { useAuthStore } from "@/lib/store/auth";

export const PostMainBlock = () => {
  const { post } = usePostStore();
  const { user } = useAuthStore();
  return (
    <Block
      className="border-b border-black"
      header={
        <div className="pl-16 py-4 flex flex-row items-center gap-4">
          <ProfileAvatar src={user?.metadata.picture} variant="small" />
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
