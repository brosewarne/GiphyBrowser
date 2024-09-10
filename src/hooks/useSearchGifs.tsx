import { useContext, useEffect } from "react";
import { apiKey } from "../config/index.js";
import { useNetwork } from "./useNetwork.js";
import { SearchGifParams } from "../models/index.js";

import { SearchItemsContext, SearchPaginationContext } from "../App.js";

/**
 * Hook for requesting the gifs based on a search term.
 *
 * if resetItems is true, then the returned items will be set as the only items in the context - new search
 * if resetItems is false, then the returned items will be appended to the set of items in the constext - eg pagination
 *
 * The returned data and pagination are set on context, the loading and error object are returned
 */
export function useSearchGifs({
  searchTerm,
  resetItems,
  limit,
  offset,
  rating = "g",
  bundle = "messaging_non_clips",
}: SearchGifParams) {
  const { setSearchPagination } = useContext(SearchPaginationContext);
  const { searchItems, setSearchItems } = useContext(SearchItemsContext);

  const url = searchTerm
    ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=${rating}&bundle=${bundle}`
    : "";

  const { data, loading, error }: { data: any; loading: boolean; error: any } =
    useNetwork({ url });

  useEffect(() => {
    const newItems = data?.data ?? [];
    setSearchPagination(data.pagination);
    const allItems = resetItems ? newItems : [...searchItems, ...newItems];
    setSearchItems(allItems);
  }, [setSearchPagination, setSearchItems, data, searchItems]);

  return {
    loading,
    error,
  };
}
