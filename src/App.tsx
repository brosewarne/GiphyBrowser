import { createContext, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Container } from "@mui/material";
import { Header } from "./components/header";

import { TrendingPage } from "./pages/trending";
import { SearchPage } from "./pages/search";
import { SavedPage } from "./pages/saved";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import {
  GiphyPagination,
  ISavedPageContext,
  ISearchContext,
  ISearchItemsContext,
  ISearchPaginationContext,
  ITrendingPageContext,
  ITrendingPaginationContext,
} from "./models";

export const TrendingItemsContext = createContext<ITrendingPageContext>({
  trendingItems: [],
  setTrendingItems: () => {},
});

export const TrendingPaginationContext =
  createContext<ITrendingPaginationContext>({
    trendingPagination: { total_count: 0, count: 0, offset: 0 },
    setTrendingPagination: () => {},
  });

export const SearchContext = createContext<ISearchContext>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const SearchItemsContext = createContext<ISearchItemsContext>({
  searchItems: [],
  setSearchItems: () => {},
});

export const SearchPaginationContext = createContext<ISearchPaginationContext>({
  searchPagination: { total_count: 0, count: 0, offset: 0 },
  setSearchPagination: () => {},
});

export const SavedPageContext = createContext<ISavedPageContext>({
  savedItemIds: "",
  setSavedItemIds: () => {},
});

function App() {
  const [trendingPagination, setTrendingPagination] = useState(
    {} as GiphyPagination,
  );
  const [trendingItems, setTrendingItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchPagination, setSearchPagination] = useState(
    {} as GiphyPagination,
  );
  const [savedItemIds, setSavedItemIds] = useState(
    localStorage.getItem("savedItemIds") ?? "",
  );

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <TrendingPaginationContext.Provider
        value={{ trendingPagination, setTrendingPagination }}
      >
        <TrendingItemsContext.Provider
          value={{ trendingItems, setTrendingItems }}
        >
          <SearchItemsContext.Provider value={{ searchItems, setSearchItems }}>
            <SearchPaginationContext.Provider
              value={{ searchPagination, setSearchPagination }}
            >
              <SavedPageContext.Provider
                value={{ savedItemIds, setSavedItemIds }}
              >
                <CssBaseline />
                <BrowserRouter>
                  <Container maxWidth="lg">
                    <Header />
                    <Routes>
                      <Route path="/" element={<TrendingPage />} />
                      <Route path="/trending" element={<TrendingPage />} />
                      <Route path="/search" element={<SearchPage />} />

                      <Route path="/saved" element={<SavedPage />} />
                    </Routes>
                  </Container>
                </BrowserRouter>
              </SavedPageContext.Provider>
            </SearchPaginationContext.Provider>
          </SearchItemsContext.Provider>
        </TrendingItemsContext.Provider>
      </TrendingPaginationContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
