import React from "react";
import { Outlet } from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Container, CssBaseline, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Header } from "@app/components";
import { PageTabs } from "./pageTabs";
import {
  ConfigProvider,
  SearchTermProvider,
  SavedGifsProvider,
} from "./providers";

import styles from "./main.module.scss";

const theme = createTheme({
  spacing: 8,
  cssVariables: true,
});

const queryClient = new QueryClient();

export function App() {
  return (
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
  );
}
