import {
  createDataResponse,
  createErrorResponse,
  parseRequest,
} from "../../utils";
import { AvailableAccount } from "@/lib/pinkcollar/auth/types";
import { ApiResponse } from "../../types";
import { getAvailableAccounts } from "@/lib/pinkcollar/auth";

type AuthListRequestBody = {
  wallet: string;
};

type AuthListResponseBody = ApiResponse<AvailableAccount[]>;

export async function POST(request: Request): Promise<AuthListResponseBody> {
  const {
    json: { wallet },
    lensClient,
  } = await parseRequest<AuthListRequestBody>(request);

  if (!wallet) {
    return createErrorResponse({ error: "Invalid request", status: 400 });
  }

  try {
    const accounts = await getAvailableAccounts(lensClient.public, wallet);
    return createDataResponse({
      data: accounts,
    });
  } catch {
    return createErrorResponse({ error: "Internal Server Error", status: 500 });
  }
}
