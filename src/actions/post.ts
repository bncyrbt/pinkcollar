import * as postService from "@/lib/pinkcollar/post";
import {
  createContributionGroupMetadata,
  createPostMetadata,
} from "@/lib/storage/metadata";
import { ResultAsync } from "neverthrow";
import { WalletClient } from "viem";

type HandleCreateContributionGroupParams = {
  walletClient: WalletClient;
  owner: string;
  contributors: postService.ContributorDraft[];
};
export function handleCreateContributionGroup(
  params: HandleCreateContributionGroupParams
) {
  return ResultAsync.fromPromise(
    // Contribution Group Creation Handling
    createContributionGroupMetadata({
      owner: params.owner,
      contributors: params.contributors,
    }),
    (e) => e as Error
  ).andThen((metadataUri) => {
    return postService.createContributionGroup(params.walletClient, {
      owner: params.owner,
      metadataUri,
    });
  });
}

type HandlePostPublishParams = {
  walletClient: WalletClient;
  post: postService.PostDraft;
};
export function handlePostPublish(params: HandlePostPublishParams) {
  return ResultAsync.fromPromise(
    // Post Publishing Handling
    createPostMetadata({
      post: params.post,
    }),
    (e) => e as Error
  ).andThen((metadataUri) => {
    return postService.createPost(params.walletClient, {
      contentUri: metadataUri,
    });
  });
}
