import { useState, useEffect } from "react";
import { GiphyResponse } from "../models/index.js";

export interface APIResponse {
  data: GiphyResponse;
  error: any;
  loading: boolean;
}

/**
 * Generic hook for making fetch calls and handling errors, loading etc
 */
export const useNetwork = ({ url }: { url: string }): APIResponse => {
  let [state, setState] = useState<APIResponse>({
    data: { data: [], pagination: { count: 0, total_count: 0, offset: 0 } },
    error: null,
    loading: false,
  });

  // escape hatch to avoid blowing through the Gliphy API limit when just making simple changes
  const disable = false;
  useEffect(() => {
    setState({ ...state, loading: true });
    // Setup an Abort controller so we can abort the first fetch in strict dev mode if one is fired
    // from the component that is then unmounted before the response completes
    const abortController = new AbortController();
    const signal = abortController.signal;
    const makeRequest = async () => {
      if (url) {
        try {
          if (!disable) {
            let response = await fetch(url, { signal });
            const { status } = response;
            let data = await response.json();
            if (status >= 400) {
              // very basic error handling for fetch as it will only throw an error if the request itself fails
              throw new Error(data.message);
            }

            setState({ ...state, data, loading: false });
          }
        } catch (error: any) {
          if (error.message === "signal is aborted without reason") {
            // we don't want to throw the abort signal error - at least on dev - to avoid a flash of the error
            // message on the aborted fetch
            setState({ ...state, error: null, loading: false });
          } else {
            setState({ ...state, error, loading: false });
          }
        }
      } else {
        setState({ ...state, loading: false });
      }
    };
    makeRequest();
    // cleanup any in prgoress fetch calls if the calling component is unmounted
    return () => abortController.abort();
  }, [url]);
  return state;
};
