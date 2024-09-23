import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Container,
  createTheme,
} from "@mui/material";

import { Header } from "./components/header";
import { TrendingPage, SavedPage, SearchPage, PageTabs } from "./pages";
import { ConfigProvider, SearchTermProvider } from "./providers";

import styles from "./App.module.css";

const theme = createTheme({
  spacing: 8,
  cssVariables: true,
});

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchTermProvider>
          <ConfigProvider>
            <CssBaseline />
            <BrowserRouter>
              <Container
                maxWidth="lg"
                disableGutters={true}
                className={styles["app-container"]}
              >
                <Box>
                  <Header />
                  <PageTabs></PageTabs>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate replace to="/trending" />}
                      key="landingPage"
                    />
                    <Route
                      path="/trending"
                      element={<TrendingPage />}
                      key="trendingPage"
                    />
                    <Route
                      path="/search"
                      element={<SearchPage />}
                      key="savedPage"
                    />

                    <Route
                      path="/saved"
                      element={<SavedPage />}
                      key="savedRoute"
                    />
                  </Routes>
                </Box>
              </Container>
            </BrowserRouter>
          </ConfigProvider>
        </SearchTermProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
