/* eslint-disable @next/next/no-img-element */
export default function ProfilePage() {
  const user = {
    name: "Tomer Even Ari",
    handle: "tomerea",
    avatar: "/images/tomer.jpg",
    roles: ["Designer", "Pattern Maker"],
    bio: "Story-driven designer exploring silhouettes and soft power through tailored streetwear.",
    location: "Las Terrenas, DR",
    mainCollection: "Suzie Blazer",
  };

  const contributions = [
    {
      role: "Design",
      name: "Tomer Even Ari",
      note: "Inspo from WW2 combat medic women.",
    },
    {
      role: "Pattern Maker",
      name: "Shani Malol",
      note: "Based on vintage WW2 blazer pattern.",
    },
    {
      role: "Sample Sewer",
      name: "Lilach Arbel",
      note: "One of the most challenging, loved it!",
    },
  ];

  const collections = [
    { title: "Suzie Blazer", thumb: "/images/blazer.jpg" },
    { title: "Soft Armor", thumb: "/images/soft-armor.jpg" },
    { title: "FW2025 Drop", thumb: "/images/fw2025.jpg" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-300 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full border border-neutral-400 object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-sm text-neutral-500">@{user.handle}</p>
              <p className="text-sm text-neutral-500 mt-1">
                {user.roles.join(" • ")}
              </p>
              <p className="text-sm text-neutral-500 mt-1">{user.location}</p>
            </div>
          </div>
        </div>

        {/* Bio & Main Collection */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <p className="text-sm leading-relaxed text-neutral-700">
              {user.bio}
            </p>

            <div className="mt-8">
              <h2 className="text-md font-medium text-neutral-600 mb-2">
                Main Collection
              </h2>
              <div className="border border-neutral-300 rounded-lg p-4 bg-white">
                <p className="text-lg font-semibold">{user.mainCollection}</p>
                <p className="text-sm text-neutral-500">
                  Click to view garment details and contributions
                </p>
              </div>
            </div>
          </div>

          {/* Contributions */}
          <div>
            <h2 className="text-md font-medium text-neutral-600 mb-2">
              Contributions
            </h2>
            <div className="space-y-3">
              {contributions.map((c, i) => (
                <div
                  key={i}
                  className="border border-neutral-300 rounded-md p-3 bg-white"
                >
                  <p className="text-sm font-medium text-neutral-800">
                    {c.role}{" "}
                    <span className="text-neutral-500">| {c.name}</span>
                  </p>
                  <p className="text-xs text-neutral-500 italic mt-1">
                    {c.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Collections */}
        <div className="mt-12">
          <h2 className="text-md font-medium text-neutral-600 mb-4">
            Other Collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {collections.map((col, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-300 overflow-hidden bg-white hover:shadow-sm transition"
              >
                <img
                  src={col.thumb}
                  alt={col.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-700">
                    {col.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
