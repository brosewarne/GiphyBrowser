import { useContext } from "react";
import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { ConfigContext } from "@app/app/providers";
import { addUniqueId } from "@app/utils";

const fetchTrendingGifs = async (
  baseUrl: string,
  apiKey: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(
    `${baseUrl}/trending`,
    {
      params: {
        limit,
        offset,
        api_key: apiKey,
        rating: "g",
        bundle: "messaging_non_clips",
      },
    },
  );
  return response.data;
};

export function useTrendingGifs(): UseSuspenseInfiniteQueryResult<PagedQueryResult> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);

  return useSuspenseInfiniteQuery({
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
    getNextPageParam: ({
      pagination: { total_count, count, offset },
    }: GiphyResponse) => {
      return count < total_count ? (count + offset) / numberOfItems : null;
    },
    select: addUniqueId,
    staleTime: 300000,
    retry: false,
  });
}
