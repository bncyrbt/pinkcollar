import { FC, ReactNode } from "react";
import { Divider } from "../ui/divider";

type BlockProps = {
  header: string | ReactNode;
  main: ReactNode;
};
export const Block: FC<BlockProps> = ({ header, main }) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">{header}</div>
      <Divider />
      <div className="p-4">{main}</div>
    </div>
  );
};
