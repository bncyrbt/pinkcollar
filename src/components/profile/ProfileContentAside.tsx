import { ContributionSummary } from "../contribution/ContributionSummary";
import { Divider } from "../ui/divider";

export const ProfileContentAside = () => {
  return (
    <div>
      <ContributionSummary />
      <Divider />
      <ContributionSummary />
    </div>
  );
};
