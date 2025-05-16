import { FC, PropsWithChildren, ReactElement } from "react";

type BlockProps = PropsWithChildren<{
  title?: string | ReactElement;
}>;
export const Block: FC<BlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <div className="text-lg py-4">
        <span>{title}</span>
      </div>
      <div className="w-full h-px bg-black" />
      <div className="text-base">
        <span>{children}</span>
      </div>
    </div>
  );
};
