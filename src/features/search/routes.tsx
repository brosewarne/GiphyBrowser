import { createRoute, RootRoute } from "@tanstack/react-router";
import { SearchPage } from "./searchPage";
import { PageContainer } from "@app/components";

export const searchRoutes = (rootRoute: RootRoute) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/search",
    component: () => (
      <PageContainer>
        <SearchPage />
      </PageContainer>
    ),
  });
