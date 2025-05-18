export const AppRoutes = {
  Home: "/",
  Explore: "/explore",
  Create: "/create",
  Contributions: "/contributions",
  Notifications: "/notifications",
  Profile: (username: string) => `/u/${username}`,
} as const;
