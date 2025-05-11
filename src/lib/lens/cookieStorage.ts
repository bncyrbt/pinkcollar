import { IStorageProvider } from "@lens-protocol/client";
import { cookies } from "next/headers";

export const cookieStorage: IStorageProvider = {
  async getItem(key: string) {
    return (await cookies()).get(key)?.value ?? null;
  },

  async setItem(key: string, value: string) {
    (await cookies()).set(key, value, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // 2 weeks
    });
  },

  async removeItem(key: string) {
    (await cookies()).set(key, "", {
      path: "/",
      maxAge: 0,
    });
  },
};
