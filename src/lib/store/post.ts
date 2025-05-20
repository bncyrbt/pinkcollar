import { create } from "zustand";
import {
  ContributionGroup,
  ContributorDraft,
  Post,
} from "../pinkcollar/post/types";
import { createTrackedSelector } from "react-tracked";

export enum PublishOption {
  MainCollection = "main_collection",
  CustomCollection = "custom_collection",
}

type PostState = {
  publishedPost?: Post;
  inProgress: boolean;
  title: string;
  text: string;
  tags: string[];
  //metadata: {};
  contributors: ContributorDraft[];
  publishOptions: {
    option: PublishOption;
  };
  contributionGroup?: ContributionGroup;
  //status: {};
  addContributor: (contributor: ContributorDraft) => void;
  removeContributor: (id: string) => void;
  setPostTitle: (title: string) => void;
  setPostText: (text: string) => void;
  setPublishOption: (option: PublishOption) => void;
  startPublish: () => void;
  setContributionGroup: (group: ContributionGroup) => void;
  setPublished: (post: Post) => void;
};

const initialState = {
  publishedPost: undefined,
  inProgress: false,
  title: "",
  text: "",
  tags: [],
  contributors: [],
  publishOptions: {
    option: PublishOption.MainCollection,
  },

  contributionGroup: undefined,
};

const store = create<PostState>((set) => ({
  ...initialState,
  addContributor: (contributor: ContributorDraft) => {
    set((state) => ({ contributors: [...state.contributors, contributor] }));
  },
  removeContributor: (id: string) => {
    set((state) => ({
      contributors: state.contributors.filter((c) => c.contributor.id !== id),
    }));
  },
  setPostTitle: (title: string) => {
    set({
      title,
    });
  },
  setPostText: (text: string) => {
    set({
      tags: text.match(/#[\w-]+/g) || [],
      text,
    });
  },
  startPublish: () => set({ inProgress: true }),
  setPublishOption: (option: PublishOption) => {
    set({
      publishOptions: {
        option,
      },
    });
  },
  setContributionGroup: (group) => set({ contributionGroup: group }),
  setPublished: (post) => set({ ...initialState, publishedPost: post }),
}));

export const setContributionGroup = (group: ContributionGroup) =>
  store.getState().setContributionGroup(group);
export const usePostStore = createTrackedSelector(store);
