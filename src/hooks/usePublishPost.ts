import {
  handleCreateContributionGroup,
  handlePostPublish,
} from "@/actions/post";
import { useAuthStore } from "@/lib/store/auth";
import { usePostStore } from "@/lib/store/post";
import { useWalletClient } from "wagmi";

export const usePublishPost = () => {
  const { data: walletClient } = useWalletClient();
  const {
    publishedPost,
    tags,
    text,
    title,
    contributors,
    images,
    setContributionGroup,
    setPublished,
    startPublish,
  } = usePostStore();
  const { user } = useAuthStore();

  const publishPost = async () => {
    const owner = user?.account;
    if (!walletClient || !owner || publishedPost) {
      return;
    }
    startPublish();
    const group = await handleCreateContributionGroup({
      walletClient,
      owner,
      contributors,
    });
    if (group.isOk()) {
      setContributionGroup(group.value);
    } else {
      console.error("Error creating group", group.error);
      return;
    }

    const createdPost = await handlePostPublish({
      walletClient,
      post: {
        contributors: group.value.members,
        contributionGroupId: group.value.id,
        tags,
        text,
        title,
        images: images.map((img) => img.imageFile),
      },
    });

    if (createdPost.isOk()) {
      console.log("Post published ", createdPost.value);
      setPublished(createdPost.value);
    }
  };

  return {
    publishPost,
  };
};
