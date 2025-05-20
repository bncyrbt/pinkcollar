import { ContributorPreview } from "@/components/contribution/ContributortPreview";
import { Block } from "@/components/layout/Block";
import { Contributor, Post } from "@/lib/pinkcollar/post";

export const PostContributorsBlock = ({ post }: { post: Post }) => {
  return (
    <Block
      header={<div className="font-bold">Contributors </div>}
      main={<Content contributors={post.contributors} />}
    />
  );
};

const Content = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {contributors.map((c) => (
          <div
            key={`${c.contributor.id}-${c.role.id}`}
            className="flex flex-row justify-between"
          >
            <ContributorPreview
              accountId={c.contributor.id}
              professionId={c.role.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
