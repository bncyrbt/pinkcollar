"use client";

import { useAccount } from "wagmi";

export const ConnectedUser = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <p>{address}</p>
      <p>Status: {isConnected ? "Connected" : "Not Connected"}</p>
    </div>
  );
};
