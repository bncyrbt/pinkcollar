import { ReactNode } from "react";

type PageContentLayoutProps = {
  main?: ReactNode;
  aside?: ReactNode;
};

export const PageContentLayout = ({ main, aside }: PageContentLayoutProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="flex-2 border-r border-black">{main}</div>
        <div className="w-1/3 flex-1">{aside}</div>
      </div>
    </>
  );
};
