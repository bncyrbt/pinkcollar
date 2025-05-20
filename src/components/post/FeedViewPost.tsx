export const FeedViewPost = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center h-64 w-64 border-1 bg-gray-200 border-gray-600">
      {title}
    </div>
  );
};
