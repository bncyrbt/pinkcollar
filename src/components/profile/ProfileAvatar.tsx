import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    large: "w-28 h-28 text-4xl",
    medium: "w-24 h-24 text-3xl",
    small: "w-12 h-12 text-xl",
  };

  return (
    <Avatar
      className={`
        ${sizeClasses[variant]} 
        border border-black 
        rounded-full 
        overflow-hidden 
        flex items-center justify-center
        bg-gray-100
      `}
    >
      <AvatarImage
        src={src}
        className="w-full h-full object-cover"
        alt="Profile picture"
      />
      <AvatarFallback className="w-full h-full flex items-center justify-center">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
