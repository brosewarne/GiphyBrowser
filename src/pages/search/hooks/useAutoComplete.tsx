import { useContext } from "react";
import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { AutoCompleteResponse } from "@app/models";
import { ConfigContext } from "@app/providers";


const fetchAutoCompleteResults = async (
  baseUrl: string,
  apiKey: string,
  searchTerm: string,
  limit: number,
): Promise<AutoCompleteResponse> => {
  if (!searchTerm) {
    return {
      data: [],
      pagination: { count: 0, total_count: 0, offset: 0 },
      meta: { response_id: "-1" },
    };
  }

  // Let react-query do the error handling if this throws, no need for extra error handling here
  const response: AxiosResponse<AutoCompleteResponse> = await axios.get(
    `${baseUrl}/search/tags`,
    {
      params: {
        limit,
        offset: 0,
        api_key: apiKey,
        q: searchTerm,
      },
    },
  );
  return response.data;
};

export function useAutoComplete({
  searchTerm,
}: {
  searchTerm: string;
}): UseQueryResult<string[], Error> {
  const { apiKey, baseUrl, numberOfItems } = useContext(ConfigContext);

  return useQuery({
    queryKey: ["autoComplete", searchTerm],
    queryFn: async (): Promise<AutoCompleteResponse> =>
      fetchAutoCompleteResults(
        baseUrl,
        apiKey,
        searchTerm,
        numberOfItems,
      ),
    select: (data) => data.data.map((d) => d.name),
    retry: false,
    staleTime: 300000,
  });
}
