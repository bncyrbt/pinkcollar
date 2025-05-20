"use client";
import { usePostStore } from "@/lib/store/post";
import { Block } from "../../layout/Block";
import { ProfileAvatar } from "../../profile/ProfileAvatar";
import { PostMainBlockContent } from "./PostMainBlockContent";
import { useAuthStore } from "@/lib/store/auth";
import { Post } from "@/lib/pinkcollar/post";
import { AppRoutes } from "@/routes";
import Link from "next/link";

export const PostMainBlock = ({ post }: { post?: Post }) => {
  const { title } = usePostStore();
  const { user } = useAuthStore();

  const localName = post ? post?.creator.localName : user?.localName;
  const avatar = post ? post.creator?.metadata.picture : user?.metadata.picture;
  const displayName = post ? post?.creator.displayName : user?.displayName;
  const postTitle = post ? post.title : title;

  return (
    <Block
      className="border-b border-black"
      header={
        <div className="pl-16 py-4 flex flex-row items-center gap-4">
          <ProfileAvatar localName={localName} src={avatar} variant="small" />
          <div className="text-xl flex flex-row ">
            <CreatorName name={displayName} localName={localName} />
            <span>{` / ${postTitle}`}</span>
          </div>
        </div>
      }
      main={<PostMainBlockContent post={post} />}
    />
  );
};

const CreatorName = ({
  name,
  localName,
}: {
  name?: string;
  localName?: string;
}) => {
  const content = <span className="font-bold">{name}</span>;
  return localName ? (
    <Link href={AppRoutes.Profile(localName)}>{content}</Link>
  ) : (
    content
  );
};
