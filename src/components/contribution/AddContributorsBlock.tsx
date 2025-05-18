import { Block } from "../layout/Block";
import { UserPreview } from "../profile/UserPreview";
import { AddContributorsForm } from "./AddContributorsForm";

export const AddContributorsBlock = () => (
  <Block
    className="border-l border-b border-black"
    header={<div className="text-bold">Contributors </div>}
    main={
      <>
        <AddContributorsForm />
        <UserPreview avatar="" main="User Name" sub="Fashion Designer" />
      </>
    }
  />
);
