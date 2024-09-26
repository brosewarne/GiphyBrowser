import { createRoute, RootRoute } from "@tanstack/react-router";
import { SavedPage } from "./savedPage";

export const savedRoutes = (rootRoute: RootRoute) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/saved",
    component: () => <SavedPage />,
  });
