import { Feed } from "@/components/Feed/Feed";
import { Block } from "@/components/layout/Block";

export default function ExplorePage() {
  return (
    <Block
      header={
        <div className="w-full flex flex-row justify-around">
          <span>Explore</span>
          <span>People</span>
          <span>Tags</span>
          <span>Collections</span>
        </div>
      }
      main={<Feed />}
    />
  );
}
