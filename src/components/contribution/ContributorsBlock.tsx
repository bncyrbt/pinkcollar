"use client";
import { Block } from "../layout/Block";
import { AddContributorsForm } from "./AddContributorsForm";

export const AddContributorsBlock = () => (
  <Block
    header={<div className="font-bold">Contributors </div>}
    main={
      <>
        <AddContributorsForm editMode />
      </>
    }
  />
);
