import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GiphyGif, GiphyResponse } from "../models";
import { useContext } from "react";
import { ConfigContext } from "../providers";

const fetchSavedGifs = async (
  baseUrl: string,
  apiKey: string,
  gifIds: string,
): Promise<GiphyResponse> => {
  if (!gifIds) {
    return {
      data: [],
      pagination: { offset: 0, count: 0, total_count: 0 },
      meta: {},
    };
  }
  const url: string = `${baseUrl}?api_key=${apiKey}&ids=${gifIds}&rating=g`;
  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<GiphyResponse> = await axios.get(url);
  return response.data;
};

/**
 * Simple hook for requesting the set of saved gifs from Giphy
 *
 */
export function useSavedGifs({
  gifIds,
}: {
  gifIds: string;
}): UseQueryResult<GiphyGif[]> {
  const { apiKey, baseUrl } = useContext(ConfigContext);
  return useQuery({
    queryKey: ["savedGifs", gifIds],
    queryFn: (): Promise<GiphyResponse> =>
      fetchSavedGifs(baseUrl, apiKey, gifIds),
    retry: false,
    select: (data) => data?.data ?? [],
  });
}
