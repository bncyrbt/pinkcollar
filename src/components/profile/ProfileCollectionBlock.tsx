import { Feed } from "../Feed/Feed";
import { Block } from "../layout/Block";

export const ProfileCollectionBlock = () => {
  return (
    <Block
      header={
        <div className="flex flex-row gap-16 pl-16">
          <div className="ml-8">Curated</div>
          <div className="ml-8">Creations</div>
          <div className="ml-8">Collected</div>
        </div>
      }
      main={<Feed />}
    />
  );
};
