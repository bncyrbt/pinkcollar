"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateAccountForm } from "@/hooks/useCreateAccountForm";
import { SelectProfession } from "./SelectProfession";

export const CreateAccountForm = () => {
  const {
    localName,
    error,
    pendingAction,
    account,
    setLocalName,
    handleCreateAccount,
    handleSwitchAccount,
  } = useCreateAccountForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateAccount();
      }}
      className="space-y-4 max-w-sm"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">*Username</Label>
        <div className="flex items-center">
          <span className="text-muted-foreground border rounded-l px-3 py-2 bg-muted text-sm">
            pinkcollar/
          </span>
          <Input
            id="username"
            value={account?.username ?? localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="rounded-l-none"
            required
            disabled={!!account}
          />
        </div>

        <Label htmlFor="name">Name (Optional)</Label>
        <Input id="name" placeholder="Name" required disabled={!!account} />

        <Label htmlFor="profession">Profession</Label>
        <SelectProfession />

        <div className="py-6 flex flex-row items-center gap-4">
          <div className="w-18 h-18 rounded-full border border-black flex flex-row items-center justify-center text-xl">
            +
          </div>
          <div className="text-sm">Upload Profile Picture</div>
        </div>

        {error && <p className="text-sm text-red-500">{error}error message </p>}
        {account && (
          <p className="text-sm text-pink-600">Your account is now ready</p>
        )}
      </div>

      <div className="">
        {account ? (
          <Button onClick={handleSwitchAccount}>
            Switch to {account.username}
          </Button>
        ) : (
          <Button type="submit" disabled={!!pendingAction}>
            {pendingAction ? "Creating..." : "Create Account"}
          </Button>
        )}
      </div>
    </form>
  );
};
