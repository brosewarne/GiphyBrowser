import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Container,
  createTheme,
} from "@mui/material";

import { Header } from "./components/header";
import { PageTabs } from "./pages";
import {
  ConfigProvider,
  SearchTermProvider,
  SavedGifsProvider,
} from "./providers";
import { searchRoutes } from "./pages/search/routes";
import { trendingRoutes } from "./pages/trending/routes.js";
import { savedRoutes } from "./pages/saved/routes";

import styles from "./main.module.css";

const theme = createTheme({
  spacing: 8,
  cssVariables: true,
});

const queryClient = new QueryClient();
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchTermProvider>
          <ConfigProvider>
            <SavedGifsProvider>
              <CssBaseline />
              <Container
                maxWidth="lg"
                disableGutters={true}
                className={styles["app-container"]}
              >
                <Box>
                  <Header />
                  <PageTabs></PageTabs>
                  <Outlet></Outlet>
                </Box>
              </Container>
            </SavedGifsProvider>
          </ConfigProvider>
        </SearchTermProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: () => {
    throw redirect({ to: "/trending" });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  trendingRoutes(rootRoute),
  savedRoutes(rootRoute),
  searchRoutes(rootRoute),
]);

const router = createRouter({ routeTree });

// https://tanstack.com/router/latest/docs/framework/react/guide/type-safety#exported-hooks-components-and-utilities
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
