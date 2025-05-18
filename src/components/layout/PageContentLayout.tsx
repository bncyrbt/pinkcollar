import { PropsWithChildren, ReactNode } from "react";
import { Block } from "../layout/Block";

type PageContentLayoutProps = PropsWithChildren<{
  navBlock: ReactNode;
}>;

export const PageContentLayout = ({
  navBlock,
  children,
}: PageContentLayoutProps) => {
  return (
    <Block title={navBlock}>
      <div className="flex flex-row pl-16">
        <div>{children}</div>
      </div>
    </Block>
  );
};
