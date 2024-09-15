import { useInfiniteQuery } from "@tanstack/react-query";
import { GiphyBrowerConfig } from "../config";
import { GiphyResponse } from "../models";

const fetchSearchGifs = async (
  searchTerm: string,
  limit: number,
  offset: number,
): Promise<GiphyResponse> => {
  if (!searchTerm) {
    return { data: [], pagination: { count: 0, total_count: 0, offset: 0 } };
  }
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GiphyBrowerConfig.apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );

  if (!response.ok) {
    throw new Error("There was an error fetching search results");
  }
  return await response.json();
};

export function useSearchGifs({ searchTerm }: { searchTerm: string }) {
  const { numberOfItems } = GiphyBrowerConfig;
  return useInfiniteQuery({
    queryKey: ["searchPage", searchTerm],
    queryFn: async ({ pageParam }): Promise<GiphyResponse> =>
      fetchSearchGifs(searchTerm, numberOfItems, pageParam * numberOfItems),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.offset > 0 ? firstPage.pagination.offset - 1 : null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination.offset + 1
        : null,
    retry: false,
    staleTime: 300000,
  });
}
