import { FC, PropsWithChildren, ReactNode } from "react";
import { Divider } from "../ui/divider";

type BlockProps = PropsWithChildren<{
  title?: string | ReactNode;
}>;
export const Block: FC<BlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">{title}</div>
      <Divider />
      <div className="p-4">{children}</div>
    </div>
  );
};
