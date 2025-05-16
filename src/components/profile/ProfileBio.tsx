import { Button } from "../ui/button";

export const ProfileBio = () => {
  return (
    <div className="flex-6 flex-col pl-4 pt-1">
      <div className=" text-2xl w-full">Tomer even ari</div>
      <div className="text-base w-full">Fashion Designer</div>

      <div className="text-base mt-4 w-full">Enjoy it while you can</div>

      <div className="mt-4 flex flex-col items-start">
        <Button variant="link" className="p-0 text-base">
          theboss.io
        </Button>
        <Button variant="link" className="p-0 text-base">
          instagram/tomerea
        </Button>
      </div>
    </div>
  );
};
