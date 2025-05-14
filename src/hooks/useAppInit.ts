import { useAuthStore } from "@/lib/store/auth";
import { useEffect } from "react";

export const useAppInit = () => {
  const setUserFromAuthState = useAuthStore(
    (state) => state.setUserFromAuthState
  );
  useEffect(() => {
    setUserFromAuthState();
  }, [setUserFromAuthState]);
};
