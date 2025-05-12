import { Role } from "@lens-protocol/client";
import {
  createDataResponse,
  createErrorResponse,
  parseRequest,
} from "../../utils";
import { generateChallenge } from "@/lib/pinkcollar/auth";

type PostChallengeRequest = {
  account: string;
  wallet: string;
  role: Role;
};

export async function POST(request: Request) {
  const { json, lensClient } = await parseRequest<PostChallengeRequest>(
    request
  );

  const result = await generateChallenge(lensClient.public, json);
  return result
    ? createDataResponse({ data: result })
    : createErrorResponse({});
}
