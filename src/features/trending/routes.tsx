import { createRoute, RootRoute } from "@tanstack/react-router";
import { TrendingPage } from "./trendingPage";

export const trendingRoutes = (rootRoute: RootRoute) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: "/trending",
    component: () => <TrendingPage />,
  });
};
