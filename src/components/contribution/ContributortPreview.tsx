import { useAccount } from "@/hooks/useAccount";
import Image from "next/image";
import { getProfession } from "@/constants/professions";

type ContributorPreviewProps = {
  accountId: string;
  professionId: string;
};

// We will save roles in group metadata that keeps updating to reflects relations in the group
export const ContributorPreview = ({
  accountId,
  professionId,
}: ContributorPreviewProps) => {
  const { data } = useAccount({ address: accountId });
  const profession = getProfession(professionId);

  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src="/icons/contribution-menu.svg"
        width={32}
        height={32}
        alt="contributor"
      />
      <div className="flex flex-col ">
        <span className="font-bold">{`${data?.displayName}`}</span>
        <span className="underline">{profession?.label}</span>
      </div>
    </div>
  );
};
