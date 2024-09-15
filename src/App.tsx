import { createContext, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Container, createTheme } from "@mui/material";

import { Header } from "./components/header";

import { TrendingPage } from "./pages/trending";
import { SearchPage } from "./pages/search";
import { SavedPage } from "./pages/saved";
import "./App.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ISearchContext } from "./models";

export const SearchContext = createContext<ISearchContext>({
  searchTerm: "",
  setSearchTerm: () => {},
});

const theme = createTheme({
  spacing: 8,
});

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <CssBaseline />
          <BrowserRouter>
            <Container maxWidth="lg">
              <Header />
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

                <Route path="/saved" element={<SavedPage />} key="savedRoute" />
              </Routes>
            </Container>
          </BrowserRouter>
        </SearchContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
