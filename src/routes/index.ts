export const AppRoutes = {
  Home: "/",
  Explore: "/explore",
  Dashboard: "/dashboard",
  Profile: (username: string) => `/u/${username}`,
} as const;
