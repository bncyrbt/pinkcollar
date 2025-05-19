import { create } from "zustand";
import { Contributor } from "../pinkcollar/post/types";
import { createTrackedSelector } from "react-tracked";

export enum PublishOption {
  MainCollection = "main_collection",
  CustomCollection = "custom_collection",
}
type PostContributor = Pick<Contributor, "contributor" | "role">;

type PostState = {
  post: {
    title: string;
    text: string;
    tags: string[];
  };
  //metadata: {};
  contributors: PostContributor[];
  publishOptions: {
    option: PublishOption;
  };
  isEditMode: boolean;
  //status: {};
  addContributor: (contributor: PostContributor) => void;
  removeContributor: (id: string) => void;
  setPostTitle: (title: string) => void;
  setPostText: (text: string) => void;
  setPublishOption: (option: PublishOption) => void;
  toggleEditMode: () => void;
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
};

const store = create<PostState>((set) => ({
  ...initialState,
  addContributor: (contributor: PostContributor) => {
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
}));

export const usePostStore = createTrackedSelector(store);
