import { NextResponse } from "next/server";

export type ApiErrorResponse = {
  error: string;
};
export type ApiResponse<TData> =
  | NextResponse<ApiErrorResponse>
  | NextResponse<{
      data: TData;
    }>;
