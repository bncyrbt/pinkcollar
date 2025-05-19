/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import { FragmentOf } from "@lens-protocol/client";
import { AccountFragment, AccountMetadataFragment } from "./accounts";
import { PostMetadataFragment } from "./posts";
import { GroupFragment, GroupMetadataFragment } from "./groups";

declare module "@lens-protocol/client" {
  export interface Account extends FragmentOf<typeof AccountFragment> {}
  export interface AccountMetadata
    extends FragmentOf<typeof AccountMetadataFragment> {}
  export interface Group extends FragmentOf<typeof GroupFragment> {}
  export interface GroupMetadata
    extends FragmentOf<typeof GroupMetadataFragment> {}
  export type PostMetadata = FragmentOf<typeof PostMetadataFragment>;
}

export const fragments = [AccountFragment, PostMetadataFragment];
