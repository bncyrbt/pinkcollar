import { ReactNode } from "react";

type PageContentLayoutProps = {
  main?: ReactNode;
  aside?: ReactNode;
};

export const PageContentLayout = ({ main, aside }: PageContentLayoutProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="flex-1">{main}</div>
        <div className="w-1/3">{aside}</div>
      </div>
    </>
  );
};
