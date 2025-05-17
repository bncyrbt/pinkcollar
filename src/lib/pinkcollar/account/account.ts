import { getLensPublicClient } from "@/lib/lens/client";
import { fetchAccount as lensFetchAccount } from "@lens-protocol/client/actions";
import { toAccount } from "../auth";
import { never } from "@lens-protocol/client";
import { AppConfig } from "../config";

export type FetchAccountParams = {
  address?: string;
  txHash?: string;
  localName?: string;
};
export function fetchAccount(params: FetchAccountParams) {
  return lensFetchAccount(getLensPublicClient(), {
    address: params.address ?? undefined,
    txHash: params.txHash ?? undefined,
    username: params.localName
      ? {
          localName: params.localName,
          namespace: AppConfig.APP_NAMESPACE_CONTRACT,
        }
      : undefined,
  }).map((res) => (res ? toAccount(res) : never()));
}
