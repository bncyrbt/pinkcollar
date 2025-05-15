export const AppRoutes = {
  Home: "/",
  Explore: "/explore",
  Dashboard: "/dashboard",
  Profile: (username: string) => `profile/${username}`,
} as const;
