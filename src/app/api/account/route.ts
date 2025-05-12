import { cookieStorage } from "@/lib/lens/cookieStorage";
import { evmAddress, PublicClient, testnet } from "@lens-protocol/client";
import { fetchAccount } from "@lens-protocol/client/actions";
import { NextResponse } from "next/server";
import { typenameToAuthenticationRole } from "../utils";
import { fragments } from "@/lib/lens/fragments";

type AccountRequest = {
  account: string;
};
export async function POST(request: Request) {
  const { account } = await request.json();

  if (!account) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const publicClient = PublicClient.create({
    environment: testnet,
    storage: cookieStorage,
    fragments,
  });

  const fetchedAccount = await fetchAccount(publicClient, {
    address: evmAddress(account),
  });

  if (fetchedAccount.isOk()) {
    return NextResponse.json({
      success: true,
      data: {
        account: fetchedAccount.value?.address,
        username: fetchedAccount.value?.username?.value,
        role: typenameToAuthenticationRole(
          fetchedAccount.value?.__typename ?? ""
        ),
      },
    });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
