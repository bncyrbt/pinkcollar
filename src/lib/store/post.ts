import { create } from "zustand";
import { ContributionGroup, ContributorDraft } from "../pinkcollar/post/types";
import { createTrackedSelector } from "react-tracked";

export enum PublishOption {
  MainCollection = "main_collection",
  CustomCollection = "custom_collection",
}

type PostState = {
  post: {
    title: string;
    text: string;
    tags: string[];
  };
  //metadata: {};
  contributors: ContributorDraft[];
  publishOptions: {
    option: PublishOption;
  };
  isEditMode: boolean;
  contributionGroup?: ContributionGroup;
  //status: {};
  addContributor: (contributor: ContributorDraft) => void;
  removeContributor: (id: string) => void;
  setPostTitle: (title: string) => void;
  setPostText: (text: string) => void;
  setPublishOption: (option: PublishOption) => void;
  toggleEditMode: () => void;
  setContributionGroup: (group: ContributionGroup) => void;
};

const initialState = {
  post: {
    title: "",
    text: "",
    tags: [],
  },
  contributors: [],
  publishOptions: {
    option: PublishOption.MainCollection,
  },
  //  status: {},
  isEditMode: true,
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
    set((state) => ({
      post: {
        ...state.post,
        title,
      },
    }));
  },
  setPostText: (text: string) => {
    set((state) => ({
      post: {
        ...state.post,
        text,
      },
    }));
  },
  setPublishOption: (option: PublishOption) => {
    set({
      publishOptions: {
        option,
      },
    });
  },
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setContributionGroup: (group) => set({ contributionGroup: group }),
}));

export const setContributionGroup = (group: ContributionGroup) =>
  store.getState().setContributionGroup(group);
export const usePostStore = createTrackedSelector(store);
