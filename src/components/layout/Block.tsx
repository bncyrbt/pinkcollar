import { FC, ReactNode } from "react";
import { Divider } from "../ui/divider";
import { cn } from "@/lib/utils";

type BlockProps = {
  header: string | ReactNode;
  main: ReactNode;
  className?: string;
};

export const Block: FC<BlockProps> = ({ header, main, className }) => {
  return (
    <div className={cn("flex flex-col border-b border-black", className)}>
      <div className="px-8 flex items-center min-h-14">{header}</div>
      <Divider />
      <div className="p-8">{main}</div>
    </div>
  );
};
