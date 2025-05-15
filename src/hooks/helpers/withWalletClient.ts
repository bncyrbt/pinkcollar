import { useWalletClient } from "wagmi";
import type { WalletClient } from "viem";
import { ResultAsync, errAsync } from "neverthrow";
import { useWalletStore, WalletActionType } from "../../lib/store/wallet";

export function withWalletClient<Args extends unknown[], Return>(
  actionType: WalletActionType,
  factory: (
    walletClient: WalletClient
  ) => (...args: Args) => ResultAsync<Return, Error>
): () => (...args: Args) => ResultAsync<Return, Error> {
  return () => {
    const { data: walletClient } = useWalletClient();
    const setPendingAction = useWalletStore((s) => s.setPendingAction);

    if (!walletClient) {
      return () =>
        errAsync(
          new Error("Wallet client not available. Connect wallet first.")
        );
    }

    const wrappedFn = factory(walletClient);

    return (...args: Args): ResultAsync<Return, Error> => {
      setPendingAction(actionType);

      // Wrap the original ResultAsync to handle pending state cleanup
      return wrappedFn(...args)
        .map((res) => {
          setPendingAction(null);
          return res;
        })
        .mapErr((err) => {
          setPendingAction(null);
          return err;
        });
    };
  };
}
