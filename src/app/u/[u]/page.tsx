import { Profile } from "@/components/profile/Profile";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ u: string }>;
}) {
  const { u } = await params;
  return u ? <Profile localName={u} /> : null;
}
