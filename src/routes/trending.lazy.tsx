import { ErrorState, LoadingGrid } from "@app/components";
import { TrendingPage } from "@app/features/trending";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/trending")({
  component: TrendingPage,
  errorComponent: ({ error }) => <ErrorState error={error}></ErrorState>,
  pendingComponent: LoadingGrid,
});
