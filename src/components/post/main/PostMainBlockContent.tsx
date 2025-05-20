"use client";
import { useState } from "react";
import { ImagePreviewer } from "../../common/ImagePreviewer";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Tag } from "../tags/Tag";
import { usePostStore } from "@/lib/store/post";
import { Post } from "@/lib/pinkcollar/post";

// TODO: handle upload, connect to data

type PostMainBlockContentProps = {
  post?: Post;
};
export const PostMainBlockContent = ({ post }: PostMainBlockContentProps) => {
  const {
    title,
    text,
    tags,
    images,
    addImage,
    removeImage,
    setPostText,
    setPostTitle,
  } = usePostStore();

  const handleAddImage = (image: File) => {
    addImage({
      imageFile: image,
      previewUrl: URL.createObjectURL(image),
    });
  };

  const imagesToRender = post
    ? post.images
    : images.map((img) => img.previewUrl);

  return (
    <form>
      <div className="flex flex-row">
        <div className="px-8 flex-1 flex flex-row justify-end">
          <ImagePreviewer
            editable={!post}
            images={imagesToRender}
            onRemoveImage={removeImage}
            onAddImage={handleAddImage}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {!post ? (
            <>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label> Description</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Type your message here."
                />
              </div>
            </>
          ) : (
            <span>{post.text}</span>
          )}
          <div className="flex flex-row flex-wrap gap-2">
            {(post ? post.tags : tags).map((t) => (
              <Tag key={t} value={t} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
