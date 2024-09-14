import { useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppStateContext } from "../App.js";

const fetchSearchGifs = async (
  searchTerm: string,
  limit: number,
  offset: number,
  apiKey: string
) => {
  if (!searchTerm) {
    return { data: [], pagination: { count: 0, total_count: 0, offset: 0 } };
  }
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export function useSearchGifs({ searchTerm }: { searchTerm: string }) {
  const {appState } = useContext(AppStateContext)
  const { apiKey, numberOfItems} = appState

  return useInfiniteQuery({
    queryKey: ["searchPage", searchTerm],
    queryFn: async ({ pageParam }) =>
      fetchSearchGifs(searchTerm, numberOfItems, pageParam * numberOfItems, apiKey),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.offset > 0 ? firstPage.offset - 1 : null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination.offset + 1
        : null,
  });
}
