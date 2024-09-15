import { useInfiniteQuery } from "@tanstack/react-query";
import { GiphyBrowerConfig } from "../config";
import { GiphyResponse } from "../models";

const fetchTrendingGifs = async (
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${GiphyBrowerConfig.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle="messaging_non_clips"`,
  );
  if (!response.ok) {
    throw new Error("There was an error fetching the trending gifs");
  }
  return await response.json();
};

export function useTrendingGifs() {
  const { numberOfItems } = GiphyBrowerConfig;

  return useInfiniteQuery({
    queryKey: ["trendingPage"],
    queryFn: async ({ pageParam }): Promise<GiphyResponse> =>
      fetchTrendingGifs(numberOfItems, pageParam * numberOfItems),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.offset > 0 ? firstPage.pagination.offset - 1 : null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination.offset + 1
        : null,
    staleTime: 300000,
    retry: false,
  });
}
