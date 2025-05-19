"use client";
import { UsernameFragment, graphql } from "@lens-protocol/client";

export const AccountMetadataFragment = graphql(
  `
    fragment AccountMetadata on AccountMetadata {
      name
      bio
      picture
      attributes {
        key
        value
      }
    }
  `
);

export const AccountFragment = graphql(
  `
    fragment Account on Account {
      __typename
      username(request: { namespace: "${process.env.NEXT_PUBLIC_PINKCOLLAR_NAMESPACE_CONTRACT}" }) {
        ...Username
      }
      address
      metadata {
        ...AccountMetadata
      }
    }
  `,
  [UsernameFragment, AccountMetadataFragment]
);
