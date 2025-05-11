import { NextResponse } from "next/server";
import {
  ChallengeRequest,
  PublicClient,
  Role,
  testnet,
} from "@lens-protocol/client";
import { fragments } from "@/lib/lens/fragments";

type PostChallengeRequest = Request & {
  account: string;
  wallet: string;
  role: Role;
};
export async function POST(request: Request) {
  const { account, wallet, role } =
    (await request.json()) as PostChallengeRequest;

  // TODO: Add validation

  let challengeRequest: ChallengeRequest = {
    onboardingUser: {
      app: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT,
      wallet,
    },
  };

  switch (role) {
    case Role.AccountOwner:
      challengeRequest = {
        accountOwner: {
          account,
          owner: wallet,
          app: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT,
        },
      };
      break;
    case Role.AccountManager:
      challengeRequest = {
        accountManager: {
          account,
          manager: wallet,
          app: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT,
        },
      };
      break;
    default:
      return NextResponse.json(
        { error: "requested role is not supported" },
        { status: 500 }
      );
  }

  const client = PublicClient.create({
    environment: testnet,
    fragments,
    origin: request.headers.get("origin") ?? "",
  });

  const result = await client.challenge(challengeRequest);

  if (result.isErr()) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: {
      id: result.value.id,
      text: result.value.text,
    },
  });
}
