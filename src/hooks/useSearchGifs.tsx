import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { GiphyBrowerConfig } from "../config";
import { GiphyResponse } from "../models";

const fetchSearchGifs = async (
  searchTerm: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  if (!searchTerm) {
    return {
      data: [],
      pagination: { count: 0, total_count: 0, offset: 0 },
      meta: {},
    };
  }

  const url: string = `https://api.giphy.com/v1/gifs/search?api_key=${GiphyBrowerConfig.apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`;
  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(url);
  return response.data;
};

export function useSearchGifs({ searchTerm }: { searchTerm: string }) {
  const { numberOfItems } = GiphyBrowerConfig;
  return useInfiniteQuery({
    queryKey: ["searchPage", searchTerm],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<GiphyResponse> =>
      fetchSearchGifs(searchTerm, numberOfItems, pageParam * numberOfItems),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.offset > 0
        ? firstPage.pagination.offset - 1
        : null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination?.offset + 1
        : null,
    retry: false,
    staleTime: 300000,
    // initialData: {
    //   pageParams: [],
    //   pages: [],
    // },
  });
}
