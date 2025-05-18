"use client";
import { Block } from "../layout/Block";
import { AddContributorsForm } from "./AddContributorsForm";

export const AddContributorsBlock = () => (
  <Block
    className="border-l border-b border-black"
    header={<div className="font-bold">Contributors </div>}
    main={
      <>
        <AddContributorsForm />
      </>
    }
  />
);
