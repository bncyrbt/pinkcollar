import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ProfileAvatar = ({
  initials,
  src,
  variant,
}: {
  initials?: string;
  src?: string;
  variant: "large" | "medium" | "small";
}) => {
  const size = variant === "large" ? 28 : variant === "medium" ? 24 : 12;
  return (
    <Avatar className={`w-${size} h-${size} border border-black`}>
      <AvatarImage src={src} />
      <AvatarFallback className={`bg-gray-200 text-3xl`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
