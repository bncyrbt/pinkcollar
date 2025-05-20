import { fetchExploreFeedPosts } from "@/lib/pinkcollar/post";
import { useQuery } from "@tanstack/react-query";

export const useExploreFeedPosts = () => {
  return useQuery({
    queryKey: ["explore-feed-posts"],
    queryFn: async () => {
      const result = await fetchExploreFeedPosts();
      return result.match(
        (ok) => ok,
        (err) => {
          throw err;
        }
      );
    },
  });
};
