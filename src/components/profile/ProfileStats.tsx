import { Button } from "../ui/button";

export const ProfileStats = () => {
  return (
    <div className="h-full flex-4  ">
      <div className="h-full flex flex-col justify-between ">
        {/* Stats Top */}
        <div className="flex flex-row justify-end gap-8">
          <div>24k Followers</div>
          <div>17 Following</div>
          <div>55 Contributions</div>
        </div>

        {/* Stats Bottom */}
        <div className="flex flex-row justify-end gap-4">
          <Button>+ Follow</Button>
          <Button variant="secondary" className="border-1 border-black">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};
