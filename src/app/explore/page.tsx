// app/feed/page.tsx (Next.js 13/14/15 App Router)

export default function Feed() {
  const posts = [
    {
      title: "Layered Poetry: Autumn 2025",
      subtitle: "By Studio Nocturne",
      image: "/images/feed-autumn.jpg",
      tags: ["Layering", "Texture", "Muted Tones"],
    },
    {
      title: "Neo-Street Essentials",
      subtitle: "Shot in Tokyo by Kyo Harada",
      image: "/images/feed-street.jpg",
      tags: ["Streetwear", "Oversized", "Functional"],
    },
    {
      title: "Crafted Lightness",
      subtitle: "Sustainable by Arket",
      image: "/images/feed-lightness.jpg",
      tags: ["Eco", "Minimalism", "White-on-White"],
    },
    {
      title: "The Unfolding Suit",
      subtitle: "Design exploration by Nora Bennet",
      image: "/images/feed-suit.jpg",
      tags: ["Deconstructed", "Tailoring", "Conceptual"],
    },
    {
      title: "Soft Armor",
      subtitle: "Captured in Seoul",
      image: "/images/feed-softarmor.jpg",
      tags: ["Genderless", "Protection", "Utility"],
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-10 tracking-tight">
        Discover the Process Behind the Threads
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  title,
  subtitle,
  image,
  tags,
}: {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/70 backdrop-blur px-2 py-1 text-sm font-medium rounded-full text-pink-600">
          Featured
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-500 text-sm mb-3">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-semibold px-3 py-1 bg-pink-100 text-pink-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
