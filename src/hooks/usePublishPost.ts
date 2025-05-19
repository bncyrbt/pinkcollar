import { handlePostPublish } from "@/actions/post";
import { useAuthStore } from "@/lib/store/auth";
import { usePostStore } from "@/lib/store/post";
import { useWalletClient } from "wagmi";

export const usePublishPost = () => {
  /*
        1. handle contributors:
            - create group 
            - add members
            - 
    */

  const { data: walletClient } = useWalletClient();
  const { contributors, setContributionGroup } = usePostStore();
  const { user } = useAuthStore();

  const publishPost = async () => {
    const owner = user?.account;
    if (!walletClient || !owner) {
      console.log("Revert publish no owner or wallet client");
      return;
    }

    // create metadata
    const group = await handlePostPublish({
      walletClient,
      owner,
      contributors,
    });
    if (group.isOk()) {
      console.log("Group Created ", group.value);
      // TODO: this logic should be in mapper
      setContributionGroup(group.value);
    } else {
      console.log("Error creating group", group.error);
    }
  };

  return {
    publishPost,
  };
};
