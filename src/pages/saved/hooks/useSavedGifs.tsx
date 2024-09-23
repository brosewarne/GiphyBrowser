import { useContext } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { ConfigContext } from "@app/providers";

const fetchSavedGifs = async (
  baseUrl: string,
  apiKey: string,
  gifIds: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  if (!gifIds) {
    return {
      data: [],
      pagination: { offset: 0, count: 0, total_count: 0 },
      meta: { response_id: "-1" },
    };
  }

  // simple pagination functionality as the `gifs` EP doesn't support pagination
  const allGifIds = gifIds.split(",");
  const pagedGifIds = allGifIds.slice(offset, offset + limit);
  const url: string = `${baseUrl}?api_key=${apiKey}&ids=${pagedGifIds}&rating=g`;

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(url);
  return {
    data: response.data.data,
    meta: response.data.meta,
    pagination: { total_count: allGifIds.length, offset, count: limit },
  };
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifs({
  gifIds,
}: {
  gifIds: string;
}): UseInfiniteQueryResult<PagedQueryResult> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);
  return useInfiniteQuery({
    queryKey: ["savedGifs", gifIds],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<GiphyResponse> =>
      fetchSavedGifs(
        baseUrl,
        apiKey,
        gifIds,
        numberOfItems,
        pageParam * numberOfItems,
      ),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage: GiphyResponse) =>
      firstPage.pagination.offset > 0 ? firstPage.pagination.offset - 1 : null,
    getNextPageParam: (lastPage: GiphyResponse) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination?.offset + 1
        : null,
    retry: false,
    staleTime: 300000,
  });
}
