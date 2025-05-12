"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createPinkcollarAccount } from "@/lib/services/account";
import {
  handleOperationWith,
  signMessageWith,
} from "@lens-protocol/react/viem";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";
import { EvmAddress } from "@lens-protocol/react";

export function CreateAccountForm() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [localName, setLocalName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successHandle, setSuccessHandle] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !walletClient) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessHandle(null);

    try {
      await createPinkcollarAccount({
        address: address as EvmAddress,
        walletClient,
        username: localName,
      });
      setSuccessHandle(localName); // assumed field from service response
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="username">Choose your username</Label>
        <div className="flex items-center">
          <span className="text-muted-foreground border rounded-l px-3 py-2 bg-muted text-sm">
            lens/
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
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>

      {successHandle && (
        <p className="text-green-600">Account created: {successHandle}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
