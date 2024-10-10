import { createRoute, RootRoute } from "@tanstack/react-router";
import { TrendingPage } from "./trendingPage";
import { PageContainer } from "@app/components";

export const trendingRoutes = (rootRoute: RootRoute) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: "/trending",
    component: () => (
      <PageContainer>
        <TrendingPage />
      </PageContainer>
    ),
  });
};
