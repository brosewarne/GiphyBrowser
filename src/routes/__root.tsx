import { createRootRoute } from "@tanstack/react-router";
import { App } from "@app/app/app";

export const Route = createRootRoute({
  component: () => <App></App>,
});
