import { createRoute, RootRoute } from "@tanstack/react-router";
import { SearchPage } from "./searchPage";

export const searchRoutes = (rootRoute: RootRoute) => createRoute({
    getParentRoute: () => rootRoute,
    path: "/search",
    component: () => <SearchPage />,
  });
  