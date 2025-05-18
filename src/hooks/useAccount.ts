import { fetchAccount } from "@/lib/pinkcollar/account";
import { useQuery } from "@tanstack/react-query";

export const useAccount = (params: { localName?: string }) => {
  return useQuery({
    queryKey: ["account", params],
    queryFn: async () => {
      const result = await fetchAccount({ localName: params.localName });
      return result.match(
        (ok) => ok,
        (err) => {
          throw err;
        }
      );
    },
  });
};
