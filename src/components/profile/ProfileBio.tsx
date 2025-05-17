import { BioLink, Profession } from "@/lib/pinkcollar/auth";

type ProfileBioProp = {
  name?: string;
  localName?: string;
  bio?: string;
  links?: BioLink[];
  professions: Profession[];
};
export const ProfileBio = ({
  name,
  localName,
  bio,
  links,
  professions,
}: ProfileBioProp) => {
  return (
    <div className="flex-6 flex-col pl-4 pt-1">
      <div className=" text-2xl w-full">{`${localName} | ${name}`}</div>
      <div className="text-gray-600 underline">
        {professions?.map((prf) => prf.label).join(", ")}
      </div>

      <div className="text-base mt-4 w-full">{bio}</div>

      <div className="mt-4 flex flex-col items-start">
        {links?.map((lnk) => (
          <a
            key={lnk.href}
            className="p-0 text-base"
            href={lnk.href}
            target="_blank"
          >
            {lnk.caption}
          </a>
        ))}
      </div>
    </div>
  );
};
