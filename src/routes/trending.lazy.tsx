import { PageContainer } from "@app/components";
import { TrendingPage } from "@app/features/trending";
import { createLazyFileRoute } from "@tanstack/react-router";

function TrendingPageComponent() {
  return (
    <PageContainer>
      <TrendingPage />
    </PageContainer>
  );
}
export const Route = createLazyFileRoute("/trending")({
  component: TrendingPageComponent,
});
