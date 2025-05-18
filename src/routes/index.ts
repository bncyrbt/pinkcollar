export const AppRoutes = {
  Home: "/",
  Explore: "/explore",
  Create: "/create",
  Contributions: "/contribution",
  Profile: (username: string) => `/u/${username}`,
} as const;
