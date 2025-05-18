import { FC, PropsWithChildren, ReactNode } from "react";

type BlockProps = PropsWithChildren<{
  title?: string | ReactNode;
}>;
export const Block: FC<BlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <div>
        <span>{title}</span>
      </div>
      <div className="w-full h-px bg-black" />
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
};
