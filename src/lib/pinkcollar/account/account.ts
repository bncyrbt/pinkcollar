import { getLensPublicClient } from "@/lib/lens/client";
import { fetchAccount as lensFetchAccount } from "@lens-protocol/client/actions";
import { toAvailableAccount } from "../auth";
import { never } from "@lens-protocol/client";

export type FetchAccountParams = {
  address?: string;
  txHash?: string;
};
export function fetchAccount(params: FetchAccountParams) {
  return lensFetchAccount(getLensPublicClient(), params).map((res) =>
    res
      ? toAvailableAccount({
          __typename: res?.__typename,
          account: res?.address,
          username: res?.username?.value,
        })
      : never()
  );
}
