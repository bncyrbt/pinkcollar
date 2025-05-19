import { withWalletClient } from "./helpers";
import {
  createContributionGroup,
  CreateContributionGroupParams,
} from "@/lib/pinkcollar/post/post";

export const useCreateContributionGroup = withWalletClient(
  "createAccount",
  (walletClient) => (params: CreateContributionGroupParams) => {
    return createContributionGroup(walletClient, params);
  }
);
