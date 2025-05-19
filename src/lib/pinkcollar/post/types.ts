import { Account, Profession } from "../auth";

export type Post = {
  id: string;
  title: string;
  text: string;
  contributors: Contributor[];
  contributionGroup: ContributionGroup;
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
