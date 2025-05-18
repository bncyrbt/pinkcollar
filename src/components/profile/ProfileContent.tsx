import { ContributionSummary } from "../contribution/ContributionSummary";
import { Feed } from "../Feed/Feed";
import { Block } from "../layout/Block";
import { PageContentLayout } from "../layout/PageContentLayout";

export const ProfileContent = () => {
  return (
    <PageContentLayout
      navBlock={
        <div className="flex flex-row gap-16 pl-16">
          <div className="ml-8">Main Collection</div>
          <div className="ml-8">Creations</div>
          <div className="ml-8">Collected</div>
        </div>
      }
    >
      <div className="flex flex-row pl-16">
        <Feed />

        <div className="flex-1 flex-col  border-l-1 border-black">
          <Block title={<div className="font-bold px-8">Contributions</div>}>
            <div className=" flex flex-col gap-6 p-8">
              <ContributionSummary />
            </div>
          </Block>
        </div>
      </div>
    </PageContentLayout>
  );
};
