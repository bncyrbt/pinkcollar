import { checkAuthSessionState } from "@/actions/auth";
import { useEffect } from "react";

export const useAppInit = () => {
  useEffect(() => {
    checkAuthSessionState();
  }, []);
};
