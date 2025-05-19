import { Account, Profession } from "../auth";

export type Post = {
  id: string;
  title: string;
  text: string;
  contributors: Contributor[];
  contributionGroup: ContributionGroup;
};

export type Contributor = {
  id: string; // Unique identifier of the relation
  contributor: Account;
  role: Profession;
  addedAt: number;
};

type ContributionGroup = {
  id: string;
  name: string;
  description: string;
  members: Contributor[];
};
