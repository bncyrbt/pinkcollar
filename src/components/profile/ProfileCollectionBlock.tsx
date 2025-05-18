import { Feed } from "../Feed/Feed";
import { Block } from "../layout/Block";

export const ProfileCollectionBlock = () => {
  return (
    <Block
      title={
        <div className="flex flex-row gap-16 pl-16">
          <div className="ml-8">Main Collection</div>
          <div className="ml-8">Creations</div>
          <div className="ml-8">Collected</div>
        </div>
      }
    >
      <Feed />
    </Block>
  );
};
