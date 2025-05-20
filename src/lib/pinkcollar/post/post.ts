/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { getLensSessionClient } from "@/lib/lens/client";
import { resolveContributionGroupMetadata } from "@/lib/storage/metadata";
import {
  AnyPost,
  err,
  errAsync,
  evmAddress,
  never,
  postId,
  ResultAsync,
} from "@lens-protocol/client";
import {
  createGroup,
  fetchGroup,
  fetchPost as lensFetchPost,
  fetchPosts,
  post,
  requestGroupMembership,
} from "@lens-protocol/client/actions";
import { handleOperationWith } from "@lens-protocol/client/viem";
import { WalletClient } from "viem";
import { AppConfig } from "../config";
import { Post, PostMetadataAttributesKeys } from "./types";
import { toAccount } from "../auth";

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
      .andThen((group) => {
        if (!group?.metadata) {
          return errAsync(new Error("Group not found"));
        }

        return resolveContributionGroupMetadata({
          groupId: group.address,
          metadata: group.metadata,
        });
      })
  );
}

type JoinContributionGroupParams = {
  groupId: string;
};

export function joinContributionGroup(
  walletClient: WalletClient,
  { groupId }: JoinContributionGroupParams
) {
  return getLensSessionClient().andThen((session) =>
    requestGroupMembership(session, {
      group: groupId,
    }).andThen(handleOperationWith(walletClient))
  );
}

/* Post */
type CreatePostParams = {
  contentUri: string;
};
export function createPost(
  walletClient: WalletClient,
  { contentUri }: CreatePostParams
) {
  return getLensSessionClient().andThen((session) =>
    post(session, {
      contentUri,
      actions: [{ simpleCollect: {} }],
      feed: evmAddress(AppConfig.APP_MAIN_FEED_CONTRACT!!),
    })
      .andThen(handleOperationWith(walletClient))
      .andThen(session.waitForTransaction)
      .andThen((txHash) => lensFetchPost(session, { txHash }))
      .andTee((p) => {
        console.log("created post", p);
      })
      .andThen((p) => (p ? toPost(p) : never("Could not fetch post")))
  );
}

function toPost(post: AnyPost): ResultAsync<Post, Error> {
  return ResultAsync.fromPromise(
    (async () => {
      if (post.__typename === "Post") {
        if (post.metadata.__typename === "ArticleMetadata") {
          const contributionGroupId = post.metadata.attributes.find(
            (attr) => attr.key === PostMetadataAttributesKeys.ContributorsGroup
          )?.value;
          let contributionGroup;
          if (contributionGroupId) {
            const result = await fetchContributionGroup(contributionGroupId);
            if (result.isOk()) {
              contributionGroup = result.value;
            }
          }

          return {
            id: post.id as string,
            creator: toAccount(post.author),
            title: post.metadata.title ?? "",
            tags: post.metadata.tags ?? [],
            text: post.metadata.content,
            contributionGroup,
            contributors: contributionGroup?.members ?? [],
          } satisfies Post;
        }
      }
      throw Error("Unsupported post type");
    })(),
    (e) => e as Error
  );
}

function fetchContributionGroup(groupId: string) {
  return getLensSessionClient()
    .andThen((session) =>
      fetchGroup(session, {
        group: groupId,
      })
    )
    .andThen((group) =>
      group?.metadata
        ? resolveContributionGroupMetadata({
            groupId: group.address,
            metadata: group.metadata,
          })
        : err(new Error("Group not found"))
    );
}

export function fetchExploreFeedPosts() {
  return getLensSessionClient()
    .andThen((session) =>
      fetchPosts(session, {
        filter: {
          feeds: [{ feed: AppConfig.APP_MAIN_FEED_CONTRACT }],
        },
      })
    )
    .andThen((res) =>
      ResultAsync.combine(res.items.map((item) => toPost(item)))
    );
}

export function fetchPost({ id }: { id: string }) {
  return getLensSessionClient().andThen((session) =>
    lensFetchPost(session, { post: postId(id) }).andThen((p) =>
      p ? toPost(p) : errAsync(new Error("Post not found"))
    )
  );
}
/* 
function getPostCollectActionRule() {
  return {
    simpleCollect: {
      payToCollect: {
        amount: {
          value: 0.0001,
          currency: AppConfig.COLLECT_CURRENCY_CONTRACT_ADDRESS,
        },
        recipients: [
          // Figures are just for the purpose of the demo
          // Contributors Split Contract  80%
          {
            percent: 80,
            address: "",
          },

          // Curators Split Contract  10%
          {
            percent: 10,
            address: AppConfig.APP_SPONSORSHIP_CONTRACT,
          },

          // App Treasury   10%
          {
            percent: 10,
            address: AppConfig.APP_TREASURY_CONTRACT,
          },
        ],

        referralShare: 20, // 20%
      },
    },
  };
}
 */

/* 

GET CURATED POSTS

fetchPosts(session, {
  filter: {
    postTypes: [PostType.Repost],
    authors: ["autor"],
    feeds: [
      {
        app: AppConfig.APP_CONTRACT_ADDRESS,
      },
    ],
  },
}); */
