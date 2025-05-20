"use client";
import { usePostStore } from "@/lib/store/post";
import { Block } from "../../layout/Block";
import { ProfileAvatar } from "../../profile/ProfileAvatar";
import { PostMainBlockContent } from "./PostMainBlockContent";
import { useAuthStore } from "@/lib/store/auth";
import { Post } from "@/lib/pinkcollar/post";

export const PostMainBlock = ({ post }: { post?: Post }) => {
  const { title } = usePostStore();
  const { user } = useAuthStore();
  return (
    <Block
      className="border-b border-black"
      header={
        <div className="pl-16 py-4 flex flex-row items-center gap-4">
          <ProfileAvatar
            src={post ? post.creator?.metadata.picture : user?.metadata.picture}
            variant="small"
          />
          <div className="text-xl">
            <span className="font-bold">
              {post ? post?.creator.displayName : user?.displayName}
            </span>
            <span>{` / ${post ? post.title : title}`}</span>
          </div>
        </div>
      }
      main={<PostMainBlockContent post={post} />}
    />
  );
};
