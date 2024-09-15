import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppStateContext } from "../App.js";

const fetchSavedGifs = async (gifIds: string, apiKey: string) => {
  if (!gifIds) {
    return { data: [] };
  }
  const response = await fetch(
    `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${gifIds}&rating=g`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifs({ gifIds }: { gifIds: string }) {
  const { appState } = useContext(AppStateContext);
  const { apiKey } = appState;

  return useQuery({
    queryKey: ["savedGifs", gifIds],
    queryFn: () => fetchSavedGifs(gifIds, apiKey),
  });
}
