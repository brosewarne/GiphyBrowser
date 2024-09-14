import { createContext, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Container } from "@mui/material";

import { Header } from "./components/header";

import { TrendingPage } from "./pages/trending";
import { SearchPage } from "./pages/search";
import { SavedPage } from "./pages/saved";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ISearchContext, IAppStateContext } from "./models";

export const SearchContext = createContext<ISearchContext>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const AppStateContext = createContext<IAppStateContext>({
  appState: { apiKey: "GKCJQf9sECbUwQBYlOo2kFZSmnzff8fY", numberOfItems: 9 },
  setAppState: () => {},
});

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appState, setAppState] = useState({
    apiKey: "GKCJQf9sECbUwQBYlOo2kFZSmnzff8fY",
    numberOfItems: 9,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <AppStateContext.Provider value={{ appState, setAppState }}>
          <CssBaseline />
          <BrowserRouter>
            <Container maxWidth="lg">
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={<TrendingPage />}
                  key="trendingRoute"
                />
                <Route
                  path="/trending"
                  element={<TrendingPage />}
                  key="searchRoute"
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
        </AppStateContext.Provider>
      </SearchContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
