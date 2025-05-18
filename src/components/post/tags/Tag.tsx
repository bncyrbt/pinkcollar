export const Tag = ({ value }: { value: string }) => {
  return (
    <div className="text-xs px-2 py-1 rounded-md border border-black bg-gray-300 text-black font-bold">
      {value}
    </div>
  );
};
