import { PageContainer } from "@app/components";
import { SavedPage } from "@app/features/saved/savedPage";
import { createLazyFileRoute } from "@tanstack/react-router";

function SavedPageComponent() {
  return (
    <PageContainer>
      <SavedPage />
    </PageContainer>
  );
}
export const Route = createLazyFileRoute("/saved")({
  component: SavedPageComponent,
});
