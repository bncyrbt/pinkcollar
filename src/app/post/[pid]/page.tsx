import { ViewPost } from "@/components/post/ViewPost";

export default async function PostPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;
  return pid ? <ViewPost postId={pid} /> : null;
}
