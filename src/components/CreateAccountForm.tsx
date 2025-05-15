"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateAccountForm } from "@/hooks/useCreateAccountForm";
import { useEffect } from "react";

export const CreateAccountForm = () => {
  const {
    localName,
    error,
    pendingAction,
    account,
    setLocalName,
    handleCreateAccount,
    //handleSwitchAccount,
  } = useCreateAccountForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateAccount();
      }}
      className="space-y-4 max-w-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="username">Choose your username</Label>
        <div className="flex items-center">
          <span className="text-muted-foreground border rounded-l px-3 py-2 bg-muted text-sm">
            pinkcollar/
          </span>
          <Input
            id="username"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="yourname"
            className="rounded-l-none"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <Button type="submit" disabled={!!pendingAction}>
        {pendingAction ? "Sign with your wallet" : "Create Account"}
      </Button>

      {/* {account && (
        <div>
          <p className="text-green-600">Account created: {account.username}</p>
          <Button onClick={handleSwitchAccount}>
            Switch to {account.username}
          </Button>
        </div>
      )} */}
    </form>
  );
};
