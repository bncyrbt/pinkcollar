import { Account, Profession } from "../auth";

export enum PostMetadataAttributesKeys {
  ContributorsGroup = "contributors-group",
  OriginalMembers = "original-members",
}

export type PostDraft = Pick<
  Post,
  "title" | "text" | "tags" | "contributors"
> & {
  contributionGroupId: string;
};

export type Post = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  creator: Account;
  contributors: Contributor[];
  contributionGroup?: ContributionGroup;
};

export type ContributorDraft = Pick<Contributor, "contributor" | "role">;

export type Contributor = {
  id: string; // Unique identifier of the relation
  contributor: Account;
  role: Profession;
  addedAt: number;
};

export type ContributionGroup = {
  id: string;
  name: string;
  members: Contributor[];
};
