import { storageClient } from "@/lib/storage/client";
import {
  immutable,
  lensAccountOnly,
  walletOnly,
} from "@lens-chain/storage-client";
import { evmAddress, GroupMetadata, ResultAsync } from "@lens-protocol/client";
import {
  account,
  article,
  group,
  image,
  MediaImageMimeType,
  MetadataAttributeType,
} from "@lens-protocol/metadata";
import { AppConfig } from "../pinkcollar/config";
import { AccountMetadataAttributesKeys, Profession } from "../pinkcollar/auth";
import {
  ContributionGroup,
  Contributor,
  ContributorDraft,
  PostDraft,
  PostMetadataAttributesKeys,
} from "../pinkcollar/post/types";
import { generateEntityId } from "../pinkcollar/utils";
import { fetchAccount } from "../pinkcollar/account";
import { getProfession } from "@/constants/professions";

type CreateAccountMetadataPrams = {
  wallet: string;
  name?: string;
  professions: Profession[];
  bio?: string;
  imageFile?: File;
};

export async function createAccountMetadata({
  wallet,
  name,
  professions,
  bio,
  imageFile,
}: CreateAccountMetadataPrams) {
  let imageUri;
  if (imageFile) {
    const { uri } = await storageClient.uploadFile(imageFile, {
      acl: walletOnly(evmAddress(wallet), AppConfig.APP_CHAIN.id),
    });
    imageUri = uri;
  }

  const metadata = account({
    ...(name && { name }),
    ...(bio && { bio }),
    ...(imageUri && { picture: imageUri }),
    attributes: professions.map((prf) => ({
      key: AccountMetadataAttributesKeys.Profession,
      type: MetadataAttributeType.JSON,
      value: JSON.stringify(prf),
    })),
  });
  const { uri } = await storageClient.uploadAsJson(metadata, {
    acl: walletOnly(evmAddress(wallet), AppConfig.APP_CHAIN.id),
  });

  return uri;
}

type CreateContributionGroupMetadataPrams = {
  owner: string;
  contributors: ContributorDraft[];
};
export async function createContributionGroupMetadata({
  owner,
  contributors,
}: CreateContributionGroupMetadataPrams) {
  // We use the 'description' property as a way to store
  // the information of the N:1 relation - (contributor + role aka PostContributor)/Group
  const metadata = group({
    name: `pinkcollar-contribution-group`,
    description: JSON.stringify(
      contributors.map((c) => ({
        id: generateEntityId(c.contributor.account, c.role.id),
        contributor: c.contributor.account,
        role: c.role.id,
        addedAt: Date.now(),
      }))
    ),
  });

  const uploadMetadataResponse = await storageClient.uploadAsJson(metadata, {
    acl: lensAccountOnly(evmAddress(owner), AppConfig.APP_CHAIN.id),
  });
  console.log("Uploaded metadata", uploadMetadataResponse);
  return uploadMetadataResponse.uri;
}

export function resolveContributionGroupMetadata({
  metadata,
  groupId,
}: {
  groupId: string;
  metadata: GroupMetadata;
}): ResultAsync<ContributionGroup, Error> {
  return ResultAsync.fromPromise(
    (async () => {
      const { name, description } = metadata;
      let members: Contributor[] = [];

      if (description) {
        try {
          const parsedMembers: {
            id: string;
            contributor: string;
            role: string;
            addedAt: number;
          }[] = JSON.parse(description);

          const results = await Promise.all(
            parsedMembers.map(async (member) => {
              const account = await fetchAccount({
                address: member.contributor,
              });

              if (account.isOk()) {
                return {
                  id: member.id,
                  contributor: account.value,
                  role: getProfession(member.role),
                  addedAt: member.addedAt,
                } as Contributor;
              } else {
                console.error("resolving group member error", account.error);
                return null;
              }
            })
          );

          members = results.filter(Boolean) as Contributor[];
        } catch (e) {
          return Promise.reject(
            new Error(
              `Invalid member JSON in description: ${(e as Error).message}`
            )
          );
        }
      }

      return {
        id: groupId,
        name,
        members,
      } satisfies ContributionGroup;
    })(),
    (e) => e as Error
  );
}

type CreatePostMetadataParams = {
  post: PostDraft;
};
export async function createPostMetadata({ post }: CreatePostMetadataParams) {
  const imagesUris: string[] = [];
  for (const imageFile of post.images) {
    const { uri } = await storageClient.uploadFile(imageFile, {
      acl: immutable(AppConfig.APP_CHAIN.id),
    });
    imagesUris.push(uri);
  }

  const metadata = article({
    content: post.text,
    title: post.title,
    tags: post.tags,
    attachments: [
      ...imagesUris.map((uri) => ({
        item: uri,
        type: MediaImageMimeType.JPEG,
      })),
    ],
    attributes: [
      {
        key: PostMetadataAttributesKeys.ContributorsGroup,
        type: MetadataAttributeType.STRING,
        value: post.contributionGroupId,
      },
      {
        key: PostMetadataAttributesKeys.OriginalMembers,
        type: MetadataAttributeType.JSON,
        value: JSON.stringify(
          post.contributors.map((c) => ({
            contributor: c.contributor.account,
            role: c.role.id,
          }))
        ),
      },
    ],
  });

  const uploadMetadataResponse = await storageClient.uploadAsJson(metadata, {
    // Once a post is created with a specific contribution group, its done.
    acl: immutable(AppConfig.APP_CHAIN.id),
  });
  console.log("Uploaded post metadata", uploadMetadataResponse);
  return uploadMetadataResponse.uri;
}
