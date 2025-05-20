import { Block } from "@/components/layout/Block";
import { UserPreview } from "@/components/profile/UserPreview";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Post } from "@/lib/pinkcollar/post";

export const PostProcessLogBlock = ({ post }: { post: Post }) => {
  return (
    <Block
      header={<div>LIKE DISLIKE COMMENTS SHARE COLLECT</div>}
      main={
        <div className="flex flex-col gap-5">
          <UserPreview
            avatar={post.creator.metadata.picture}
            main={post.creator.displayName}
            sub="So fun working on this!!"
          />
          <UserPreview
            avatar={post.creator.metadata.picture}
            main={post.creator.displayName}
            sub="So fun working on this!!"
          />
          <UserPreview
            avatar={post.creator.metadata.picture}
            main={post.creator.displayName}
            sub="So fun working on this!!"
          />
          <UserPreview
            avatar={post.creator.metadata.picture}
            main={post.creator.displayName}
            sub="So fun working on this!!"
          />
          <Divider />
          <div className="flex flex-row gap-2">
            <Input className="flex-3" />
            <Button variant="default" className="flex-1">
              Send
            </Button>
          </div>
        </div>
      }
    />
  );
};
