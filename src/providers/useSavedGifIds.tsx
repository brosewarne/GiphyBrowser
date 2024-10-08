import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getSavedGifs } from "@app/utils";

const fetchSavedGifIds = async (): Promise<string[]> => {
  const savedGifs = await getSavedGifs();
  // reverse to show most recently saved first
  return savedGifs.map((item) => item.giphyId).reverse();
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifIds(version: number): UseQueryResult<string[]> {
  return useQuery({
    queryKey: ["savedGifIds", [version]],
    queryFn: fetchSavedGifIds,
    retry: false,
    staleTime: 300000,
  });
}
