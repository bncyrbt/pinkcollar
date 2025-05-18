import { PageContentLayout } from "../layout/PageContentLayout";
import { ProfileCollectionBlock } from "./ProfileCollectionBlock";
import { ProfileContentAside } from "./ProfileContentAside";

export const ProfileContent = () => {
  return (
    <PageContentLayout
      main={<ProfileCollectionBlock />}
      aside={<ProfileContentAside />}
    />
  );
};
