import { getLensClient } from "@/lib/lens/client";
import { NextResponse } from "next/server";

export const parseRequest = async <TBody>(req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  return {
    json: (await req.json()) as TBody,
    origin,
    lensClient: await getLensClient({
      origin,
    }),
  };
};

export const createErrorResponse = ({
  error = "Internal Server Error",
  status = 500,
}: {
  error?: string;
  status?: number;
}) => {
  return NextResponse.json({ error }, { status });
};

export const createDataResponse = <TData>({
  data,
  status = 200,
}: {
  data: TData;
  status?: number;
}) => {
  return NextResponse.json({ data }, { status });
};
