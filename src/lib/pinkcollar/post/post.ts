import { getLensSessionClient } from "@/lib/lens/client";
import { resolveContributionGroupMetadata } from "@/lib/storage/metadata";
import { err, ok } from "@lens-protocol/client";
import { createGroup, fetchGroup } from "@lens-protocol/client/actions";
import { handleOperationWith } from "@lens-protocol/client/viem";
import { WalletClient } from "viem";

export function createPost() {}

export type CreateContributionGroupParams = {
  owner: string;
  metadataUri: string;
};

// TODO: This function does too much calling resolveContributionGroupMetadata

export function createContributionGroup(
  walletClient: WalletClient,
  { owner, metadataUri }: CreateContributionGroupParams
) {
  return getLensSessionClient().andThen((session) =>
    createGroup(session, {
      owner,
      metadataUri,
      rules: {
        required: [
          {
            membershipApprovalRule: {
              enable: true,
            },
          },
        ],
      },
    })
      .andThen(handleOperationWith(walletClient))
      .andThen(session.waitForTransaction)
      .andThen((txHash) => fetchGroup(session, { txHash }))
      .andThen((group) =>
        group?.metadata ? ok(group.metadata) : err(new Error("Group not found"))
      )
      .andThen(resolveContributionGroupMetadata)
  );
}
