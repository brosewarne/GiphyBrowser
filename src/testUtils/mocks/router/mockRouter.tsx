import React from "react";
import { createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";

export const getMockRouterProvider = ({ children }: { children: React.ReactNode }) => {
    const rootRoute = createRootRoute({
      component: () => <>{children}</>,
    });
  
    // @todo: fix any
    const router: any = createRouter({
      routeTree: rootRoute,
    });

    return <RouterProvider router={router}></RouterProvider>
}
