import { ReactNode } from "react";
import { Block } from "./Block";

type PageContentLayoutProps = {
  main?: ReactNode;
  aside?: ReactNode;
};

export const PageContentLayout = ({ main, aside }: PageContentLayoutProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="flex-2">
          <Block header="" main="" />
        </div>
        <div className="flex-7">{main}</div>
        <div className="w-1/3 flex-3">{aside}</div>
      </div>
    </>
  );
};
