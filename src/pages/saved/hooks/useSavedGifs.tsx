import { useContext } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { ConfigContext } from "@app/providers";
import { addUniqueId } from "@app/utils";

const fetchSavedGifs = async (
  baseUrl: string,
  apiKey: string,
  gifIds: string[],
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  if (!gifIds.length) {
    return {
      data: [],
      pagination: { offset: 0, count: 0, total_count: 0 },
      meta: { response_id: "-1" },
    };
  }

  // simple pagination functionality as the `gifs` EP doesn't support pagination
  const pagedGifIds = gifIds.slice(offset, offset + limit); 

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(`${baseUrl}`, {
    params: {
      api_key: apiKey,
      ids: pagedGifIds.join(","),
      rating: "g",
    },
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
    pagination: {
      total_count: gifIds.length,
      offset,
      count: response.data.data.length + offset,
    },
  };
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifs({
  gifIds,
}: {
  gifIds: string[];
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
    getNextPageParam: ({
      pagination: { total_count, count, offset },
    }: GiphyResponse) => {
      return count < total_count ? (count + offset) / numberOfItems : null;
    },
    select: addUniqueId,
    retry: false,
    staleTime: 300000,
  });
}
