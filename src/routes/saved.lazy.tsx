import { ErrorState, LoadingGrid } from "@app/components";
import { SavedPage } from "@app/features/saved/savedPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/saved")({
  component: SavedPage,
  errorComponent: ({ error, reset }) => <ErrorState error={error}></ErrorState>,
  pendingComponent: LoadingGrid,
});
