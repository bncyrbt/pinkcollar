import { cookieStorage } from "@/lib/lens/cookieStorage";
import { evmAddress, PublicClient, Role, testnet } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { wallet } = await request.json();

  if (!wallet) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const publicClient = PublicClient.create({
    environment: testnet,
    storage: cookieStorage,
  });

  const availableAccounts = await fetchAccountsAvailable(publicClient, {
    managedBy: evmAddress(wallet),
    includeOwned: true,
  });
  if (availableAccounts.isOk()) {
    return NextResponse.json({
      success: true,
      data: availableAccounts.value.items.map((item) => ({
        account: item.account.address,
        username: item.account.username?.value,
        role: typenameToAuthenticationRole(item.__typename),
      })),
    });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

const typenameToAuthenticationRole = (typename: string) => {
  switch (typename) {
    case "AccountOwned":
      return Role.AccountOwner;
    case "AccountManaged":
      return Role.AccountManager;
  }
};
