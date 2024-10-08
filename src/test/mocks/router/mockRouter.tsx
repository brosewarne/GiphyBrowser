import React from "react";
import {
  createRootRoute,
  createRouter,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";

export const getMockRouterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const rootRoute = createRootRoute({
    component: () => <>{children}</>,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    loader: () => {
      throw redirect({ to: "/trending" });
    },
  });

  const trendingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/trending",
    component: () => <div />,
  });

  const routeTree = rootRoute.addChildren([indexRoute, trendingRoute]);
  // @todo: fix any
  const router: any = createRouter({
    routeTree,
  });

  return <RouterProvider router={router}></RouterProvider>;
};
