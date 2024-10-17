import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getSavedGifs, SavedGiphyGif } from "@app/utils";

// const fetchSavedGifIds = async (): Promise<string[]> => {
//   const savedGifs = await getSavedGifs();
//   // reverse to show most recently saved first
//   return savedGifs.map((item) => item.giphyId).reverse();
// };

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifIds(version: number): UseQueryResult<SavedGiphyGif[]> {
  return useQuery({
    queryKey: ["savedGifIds", [version]],
    queryFn: getSavedGifs,
    retry: false,
    staleTime: 300000,
  });
}
