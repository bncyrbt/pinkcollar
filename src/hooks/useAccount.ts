import { fetchAccount } from "@/lib/pinkcollar/account";
import { useQuery } from "@tanstack/react-query";

type UseAccountParams = { address?: string; localName?: string };
export const useAccount = (params: UseAccountParams) => {
  return useQuery({
    queryKey: ["account", params],
    queryFn: async () => {
      const result = await fetchAccount({
        localName: params.localName,
        address: params.address,
      });
      return result.match(
        (ok) => ok,
        (err) => {
          throw err;
        }
      );
    },
  });
};
