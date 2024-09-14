import { useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppStateContext } from "../App.js";

const fetchTrendingGifs = async (
  limit: number,
  offset: number,
  apiKey: string,
) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle="messaging_non_clips"`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export function useTrendingGifs() {
  const { appState } = useContext(AppStateContext);
  const { apiKey, numberOfItems } = appState;

  return useInfiniteQuery({
    queryKey: ["trendingPage"],
    queryFn: async ({ pageParam }) =>
      fetchTrendingGifs(numberOfItems, pageParam * numberOfItems, apiKey),

    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.offset > 0 ? firstPage.offset - 1 : null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.count < lastPage.pagination.total_count
        ? lastPage.pagination.offset + 1
        : null,
  });
}
