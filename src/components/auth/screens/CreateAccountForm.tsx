"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateAccountForm } from "@/hooks/useCreateAccountForm";
import { SelectProfession } from "./SelectProfession";
import { useRef } from "react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";

export const CreateAccountForm = () => {
  const {
    localName,
    error,
    account,
    imagePreviewUrl,
    imageFile,
    isCreating,
    bio,
    name,
    setName,
    setBio,
    setLocalName,
    handleCreateAccount,
    handleSwitchAccount,
    handleImageUpload,
  } = useCreateAccountForm();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const disabled = Boolean(isCreating || account);
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
            disabled={disabled}
          />
        </div>

        <Label htmlFor="name">Name (Optional)</Label>
        <Input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
        />

        <Label htmlFor="name">Bio (Optional)</Label>
        <Input
          id="bio"
          placeholder="What's your thing?"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={disabled}
        />

        <Label htmlFor="profession">Profession</Label>
        <SelectProfession disabled={disabled} />

        {/* Upload Image */}
        <div className="py-6 flex flex-row items-center gap-4">
          <div
            className="w-18 h-18 min-w-[72px] min-h-[72px] rounded-full border border-black flex items-center justify-center text-xl cursor-pointer overflow-hidden"
            onClick={disabled ? undefined : triggerFileInput}
          >
            <ProfileAvatar
              src={imagePreviewUrl ?? undefined}
              variant="large"
              initials="+"
            />
          </div>
          <div className="text-sm">
            {imageFile ? "Image selected" : "Upload Profile Picture"}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
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
          <Button type="submit" disabled={disabled}>
            {isCreating ? "Creating..." : "Create Account"}
          </Button>
        )}
      </div>
    </form>
  );
};
