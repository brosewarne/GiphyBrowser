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
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { ThemeProvider, createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Header } from "@app/components";
import { PageTabs } from "./pageTabs";
import {
  ConfigProvider,
  SearchTermProvider,
  SavedGifsProvider,
} from "./providers";
import { searchRoutes } from "@app/features/search";
import { trendingRoutes } from "@app/features/trending";
import { savedRoutes } from "@app/features/saved";

import styles from "./main.module.scss";

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
                <Header />

                <Box className={styles["main-content"]}>
                  <PageTabs></PageTabs>
                  <Outlet></Outlet>
                </Box>

                <Box className={styles.footer}>
                  <Typography variant="body1">Giphy Browser 2024</Typography>
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
