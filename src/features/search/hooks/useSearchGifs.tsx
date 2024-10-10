import { useContext } from "react";
import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { ConfigContext } from "@app/app/providers";
import { addUniqueId } from "@app/utils";

const fetchSearchGifs = async (
  baseUrl: string,
  apiKey: string,
  searchTerm: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  if (!searchTerm) {
    return {
      data: [],
      pagination: { count: 0, total_count: 0, offset: 0 },
      meta: { response_id: "-1" },
    };
  }

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(
    `${baseUrl}/search`,
    {
      params: {
        limit,
        offset,
        api_key: apiKey,
        q: searchTerm,
        rating: "g",
        bundle: "messaging_non_clips",
      },
    },
  );
  return response.data;
};

export function useSearchGifs({
  searchTerm,
}: {
  searchTerm: string;
}): UseSuspenseInfiniteQueryResult<PagedQueryResult> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);

  return useSuspenseInfiniteQuery({
    queryKey: ["searchPage", searchTerm],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<GiphyResponse> =>
      fetchSearchGifs(
        baseUrl,
        apiKey,
        searchTerm,
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
