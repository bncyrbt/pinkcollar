import { graphql } from "@lens-protocol/client";

export const GroupMetadataFragment = graphql(
  `
    fragment GroupMetadata on GroupMetadata {
      name
      description
      icon
      originalIcon: icon(request: { useOriginal: true })
    }
  `
);

export const GroupFragment = graphql(
  `
    fragment Group on Group {
      __typename
      address
      metadata {
        ...GroupMetadata
      }
    }
  `,
  [GroupMetadataFragment]
);
