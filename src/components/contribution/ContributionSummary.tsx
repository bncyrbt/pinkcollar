import { Block } from "../layout/Block";

export const ContributionSummary = () => {
  return (
    <Block title={<div className="font-bold">Contributions</div>}>
      <div className="flex items-start gap-3 border-b">
        {/* Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-sm border-1 border-black">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V6a2 2 0 012-2h2m12 0a2 2 0 012 2v2m0 12v-2a2 2 0 00-2-2h-2m-8 4H6a2 2 0 01-2-2v-2m12 0h2a2 2 0 012 2v2m0-12h-2a2 2 0 00-2 2v2a2 2 0 01-2 2h-2a2 2 0 00-2 2v2a2 2 0 01-2 2H6m0-12h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 012 2v2"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          {/* Text */}
          <div className="flex flex-col gap-1 text-sm leading-tight">
            <div className="font-semibold">
              Pattern Maker |{" "}
              <a href="#" className="underline">
                Shani Malol
              </a>
            </div>
            <div className="italic text-gray-600">
              “i based my pattern on this original WW2 Blazer pattern that i
              found”
            </div>
          </div>

          {/* Media */}
          <div className="flex flex-row gap-2">
            <div className="h-24 w-24 border-1 bg-gray-600"></div>
            <div className="h-24 w-24 border-1 bg-gray-600"></div>
            <div className="h-24 w-24 border-1 bg-gray-600"></div>
          </div>
        </div>
      </div>
    </Block>
  );
};
