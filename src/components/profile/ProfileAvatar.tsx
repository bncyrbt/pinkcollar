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
  const sizeClasses = {
    large: "w-28 h-28",
    medium: "w-24 h-24",
    small: "w-12 h-12",
  };

  return (
    <Avatar className={`${sizeClasses[variant]} border border-black`}>
      <AvatarImage src={src} className="w-full h-full object-cover" />
      <AvatarFallback className="bg-gray-200 text-3xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
