import { PublicClient, testnet } from "@lens-protocol/client";
import { cookieStorage } from "./cookieStorage";
import { fragments } from "./fragments";

export const lensClient = PublicClient.create({
  environment: testnet,
  storage: cookieStorage,
  fragments,
});

export const getLensClient = async ({ origin = "" }: { origin?: string }) => {
  const publicClient = PublicClient.create({
    environment: testnet,
    storage: cookieStorage,
    fragments,
    origin,
  });
  // try to get SessionClient for authenticated requests
  const sessionClient = await publicClient.resumeSession();

  return {
    public: publicClient,
    session: sessionClient.isOk() ? sessionClient.value : null,
  };
};
