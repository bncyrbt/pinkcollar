"use client";
import { useState } from "react";
import { ImagePreviewer } from "../../common/ImagePreviewer";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Tag } from "../tags/Tag";
import { usePostStore } from "@/lib/store/post";

// TODO: handle upload, connect to data

export const PostMainBlockContent = () => {
  const [images, setImages] = useState<string[]>([]);
  const { post, setPostText, setPostTitle } = usePostStore();

  const tags = post.text.match(/#[\w-]+/g) || [];

  return (
    <form>
      <div className="flex flex-row">
        <div className="px-8 flex-1 flex flex-row justify-end">
          <ImagePreviewer images={images} onAddImage={() => setImages([])} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={post.title}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label> Description</Label>
            <Textarea
              value={post.text}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Type your message here."
            />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t} value={t} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
