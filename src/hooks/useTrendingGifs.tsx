import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyBrowerConfig } from "../config";
import { GiphyResponse } from "../models";

const fetchTrendingGifs = async (
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  const url: string = `https://api.giphy.com/v1/gifs/trending?api_key=${GiphyBrowerConfig.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle="messaging_non_clips"`;
  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(url);
  return response.data;
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
