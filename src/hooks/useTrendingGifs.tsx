import { useContext, useEffect } from "react";

import { apiKey } from "../config/index.js";
import { APIResponse, useNetwork } from "./useNetwork.js";
import { TrendingGifParams } from "../models/index.js";
import { TrendingItemsContext, TrendingPaginationContext } from "../App.js";

/**
 * Hook for requesting the trending gifs.
 *
 * if resetItems is true, then the returned items will be set as the only items in the context - new search
 * if resetItems is false, then the returned items will be appended to the set of items in the constext - eg pagination
 *
 * The returned data and pagination are set on context, the loading and error object are returned
 */

export function useTrendingGifs({
  resetItems,
  limit,
  offset,
  rating = "g",
  bundle = "messaging_non_clips",
}: TrendingGifParams) {
  const { setTrendingPagination } = useContext(TrendingPaginationContext);
  const { trendingItems, setTrendingItems } = useContext(TrendingItemsContext);

  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=${rating}&bundle=${bundle}`;
  const { data, loading, error }: APIResponse = useNetwork({
    url,
  });

  useEffect(() => {
    const newItems = data?.data ?? [];
    setTrendingPagination(data.pagination);
    const allItems = resetItems ? newItems : [...trendingItems, ...newItems];
    setTrendingItems(allItems);
  }, [setTrendingPagination, setTrendingItems, data]);

  return {
    loading,
    error,
  };
}
