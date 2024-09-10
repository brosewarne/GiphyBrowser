import { createContext, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Container } from "@mui/material";
import { Header } from "./components/header";

import { TrendingPage } from "./pages/trending";
import { SearchPage } from "./pages/search";
import { SavedPage } from "./pages/saved";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { GiphyGif, GiphyPagination } from "./models";

export const TrendingItemsContext = createContext<{
  trendingItems: GiphyGif[];
  setTrendingItems: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const TrendingPaginationContext = createContext<{
  trendingPagination: GiphyPagination;
  setTrendingPagination: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const SearchItemsContext = createContext<{
  searchItems: GiphyGif[];
  setSearchItems: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const SearchPaginationContext = createContext<{
  searchPagination: GiphyPagination;
  setSearchPagination: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const SavedPageContext = createContext<{
  savedItemIds: string;
  setSavedItemIds: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

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
    <TrendingPaginationContext.Provider
      value={{ trendingPagination, setTrendingPagination }}
    >
      <TrendingItemsContext.Provider
        value={{ trendingItems, setTrendingItems }}
      >
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
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
        </SearchContext.Provider>
      </TrendingItemsContext.Provider>
    </TrendingPaginationContext.Provider>
  );
}

export default App;
