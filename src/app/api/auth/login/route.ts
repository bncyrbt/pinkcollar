import {
  createDataResponse,
  createErrorResponse,
  parseRequest,
} from "../../utils";
import { getAuthenticatedUser, login } from "@/lib/pinkcollar/auth";

type LoginRequest = Partial<{
  id: string; // UUID of the challenge
  signature: string;
}>;

export async function POST(request: Request) {
  const {
    json: { id, signature },
    lensClient,
  } = await parseRequest<LoginRequest>(request);

  const isAuthentication = id && signature;

  if (isAuthentication) {
    const user = await login(lensClient.public, { id, signature });
    if (user) {
      return createDataResponse({
        data: user,
      });
    }

    return createErrorResponse({
      error: "Authentication Failed",
      status: 401,
    });
  }

  if (lensClient.session) {
    const user = getAuthenticatedUser(lensClient.session);
    return createDataResponse({
      data: user,
    });
  }

  return createErrorResponse({
    error: "use /auth/challenge to sign a challenge first",
    status: 401,
  });
}
