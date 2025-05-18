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
    <div className={cn("flex flex-col", className)}>
      <div className="p-4">{header}</div>
      <Divider />
      <div className="p-4">{main}</div>
    </div>
  );
};
