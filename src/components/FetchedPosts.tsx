import { PageSize, usePosts } from "@lens-protocol/react";
import { useState } from "react";

export const FetchedPosts = () => {
  const [page, setPage] = useState<string | null>();
  const { data, loading } = usePosts({
    cursor: page,
    pageSize: PageSize.Fifty,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.items.length) {
    return <div>No Posts</div>;
  }

  return (
    <div>
      {data.pageInfo.next && (
        <div onClick={() => setPage(data.pageInfo.next)}>Next</div>
      )}
      {data.pageInfo.prev && (
        <div onClick={() => setPage(data.pageInfo.prev)}>Prev</div>
      )}
      {data.items.map((post) => (
        <div key={post.id} className="p-2 m-3 border-2">
          {post.__typename === "Post" &&
            post.metadata.__typename === "TextOnlyMetadata" &&
            post.metadata.content}
        </div>
      ))}
    </div>
  );
};
