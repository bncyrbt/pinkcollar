import { FeedViewPost } from "../post/FeedViewPost";

export const Feed = ({ items = 9 }: { items?: number }) => {
  return (
    <div className="flex-2 flex flex-row flex-wrap gap-y-4 gap-x-4 py-8">
      {Array.from({ length: items }).map((_, i) => (
        <FeedViewPost key={i} />
      ))}
    </div>
  );
};
