import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { useContext } from "react";
import { ConfigContext } from "@app/providers";

const fetchTrendingGifs = async (
  baseUrl: string,
  apiKey: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  const qs = queryString.stringify({
    limit,
    offset,
    api_key: apiKey,
    rating: "g",
    bundle: "messaging_non_clips",
  });

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(
    `${baseUrl}/trending?${qs}`,
  );
  return response.data;
};

export function useTrendingGifs(): UseInfiniteQueryResult<PagedQueryResult> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);

  return useInfiniteQuery({
    queryKey: ["trendingPage"],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<GiphyResponse> =>
      fetchTrendingGifs(
        baseUrl,
        apiKey,
        numberOfItems,
        pageParam * numberOfItems,
      ),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage: GiphyResponse) =>
      firstPage.pagination.offset > 0 ? firstPage.pagination.offset - 1 : null,
    getNextPageParam: (lastPage: GiphyResponse) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination.offset + 1
        : null,
    staleTime: 300000,
    retry: false,
  });
}
