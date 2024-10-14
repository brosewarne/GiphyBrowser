import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

function IndexComponent() {
  const navigate = useNavigate();
  navigate({ to: "/trending" });
  return null;
}
export const Route = createLazyFileRoute("/")({
  component: IndexComponent,
});
