import { useQuery } from "@tanstack/react-query";
import { GiphyBrowerConfig } from "../config";
import { GiphyResponse } from "../models";

const fetchSavedGifs = async (gifIds: string): Promise<GiphyResponse> => {
  if (!gifIds) {
    return { data: [], pagination: { offset: 0, count: 0, total_count: 0 } };
  }
  const response = await fetch(
    `https://api.giphy.com/v1/gifs?api_key=${GiphyBrowerConfig.apiKey}&ids=${gifIds}&rating=g`,
  );
  if (!response.ok) {
    throw new Error("There was an error fetching the saved gifs");
  }
  return await response.json();
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifs({ gifIds }: { gifIds: string }) {
  return useQuery({
    queryKey: ["savedGifs", gifIds],
    queryFn: (): Promise<GiphyResponse> => fetchSavedGifs(gifIds),
    retry: false,
  });
}
