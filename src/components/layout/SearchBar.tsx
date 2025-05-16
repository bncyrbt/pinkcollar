export const SearchBar = () => {
  return (
    <div className="flex items-center border border-black rounded-xl py-2 w-full max-w-md bg-white">
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        className="outline-none w-full bg-transparent text-sm"
      />
    </div>
  );
};
