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

import { SearchTermProvider } from "./providers/searchTermProvider";

const theme = createTheme({
  spacing: 8,
});

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchTermProvider>
          <CssBaseline />
          <BrowserRouter>
            <Container maxWidth="lg">
              <Box bgcolor="rgba(246, 247, 248, 0.5)">
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
        </SearchTermProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
