import { ProfileAvatar } from "./ProfileAvatar";

type UserPreviewProps = {
  avatar?: string;
  main: string;
  sub?: string;
};

export const UserPreview = ({ avatar, main, sub }: UserPreviewProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <ProfileAvatar src={avatar} variant="small" />
      <div className="flex flex-col ">
        <span className="font-bold">{main}</span>
        <span className="text-sm">{sub}</span>
      </div>
    </div>
  );
};
