import { apiKey } from "../config/index.js";
import { useNetwork } from "./useNetwork.js";

/**
 * Simple hook for requesting the set of aved gifs from Giphy
 *
 * Note: This probably isn't needed, I wasn't too sure if it would end up with more logic and ran out
 * time to refactor
 */
export function useSavedGifs({ gifIds }: { gifIds: string[] }) {
  const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${gifIds}&rating=g`;
  return useNetwork({
    url,
  });
}
