import Image from "next/image";
import { Post } from "@/lib/pinkcollar/post";

export const FeedViewPost = ({ post }: { post: Post }) => {
  return (
    <div className="relative h-64 w-64 border border-gray-600 bg-gray-200 overflow-hidden">
      {!!post.images.length && (
        <Image
          src={post.images[0]}
          alt={post.title || "Post image"}
          fill
          className="object-cover"
        />
      )}
    </div>
  );
};
