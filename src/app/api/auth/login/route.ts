// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { PublicClient, testnet } from "@lens-protocol/client";
import { signatureFrom } from "@lens-protocol/types";
import { cookieStorage } from "@/lib/lens/cookieStorage";

type LoginRequest = Request &
  Partial<{
    id: string; // UUID of the challenge
    signature: string;
  }>;

// if the user submits a signature we authenticate with it
// if the user submits without (but with cookies) - we try to resume
// if resume fails the user needs to sign a challenge and we return a list of available accounts
export async function POST(request: Request) {
  const { id, signature } = (await request.json()) as LoginRequest;

  const isResume = !id || !signature;

  const publicClient = PublicClient.create({
    environment: testnet,
    storage: cookieStorage,
  });

  if (isResume) {
    const session = await publicClient.resumeSession();
    if (session.isOk()) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "use /auth/challenge to sign a challenge first" },
      { status: 401 }
    );
  }

  const authResult = await publicClient.authenticate({
    id,
    signature: signatureFrom(signature),
  });

  if (authResult.isErr()) {
    return NextResponse.json(
      { error: authResult.error.message },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
