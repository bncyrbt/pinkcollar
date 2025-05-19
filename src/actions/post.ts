import * as postService from "@/lib/pinkcollar/post";
import { createContributionGroupMetadata } from "@/lib/storage/metadata";
import { ResultAsync } from "neverthrow";
import { WalletClient } from "viem";

type HandlePostPublishParams = {
  walletClient: WalletClient;
  owner: string;
  contributors: postService.ContributorDraft[];
};
export function handlePostPublish(params: HandlePostPublishParams) {
  return ResultAsync.fromPromise(
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
