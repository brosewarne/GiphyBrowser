import { useContext } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import { GiphyResponse, PagedQueryResult } from "@app/models";
import { ConfigContext } from "@app/providers";

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

  const qs = queryString.stringify({
    limit,
    offset,
    api_key: apiKey,
    q: searchTerm,
    rating: "g",
    bundle: "messaging_non_clips",
  });

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(
    `${baseUrl}/search?${qs}`,
  );
  return response.data;
};

export function useSearchGifs({
  searchTerm,
}: {
  searchTerm: string;
}): UseInfiniteQueryResult<PagedQueryResult> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);

  return useInfiniteQuery({
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
