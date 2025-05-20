import { fetchPost } from "@/lib/pinkcollar/post";
import { useQuery } from "@tanstack/react-query";

export const usePost = ({ postId }: { postId?: string }) => {
  return useQuery({
    queryKey: ["post", { postId }],
    queryFn: async () => {
      const result = await fetchPost({ id: postId!! });
      return result.match(
        (ok) => ok,
        (err) => {
          throw err;
        }
      );
    },
    enabled: Boolean(postId),
  });
};
