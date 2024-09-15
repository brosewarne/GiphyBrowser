import React, { memo, useMemo } from "react";
import { Box, useTheme } from "@mui/material";

import { GifGrid } from "../../components/gifGrid";
import { LoadingGrid } from "../../components/loadingGrid";

import { ShowMoreButton } from "../../components/showMoreButton";
import { ErrorState } from "../../components/errorState/errorState";
import { useTrendingGifs } from "../../hooks";
import { GiphyGif, GiphyResponse } from "../../models";

/**
 * The Trending Gifs page. Shows the current trending gifs in a Gif Grid
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If there are no results for a search term, then a simple empty state is displayed
 *
 * There is basic pagination using a 'Show More' button.
 */

export const TrendingPage = memo(function TrendingPage() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTrendingGifs();
  const theme = useTheme();

  const response = useMemo(() => data, [data]);
  const items = useMemo(
    () =>
      (response?.pages || []).reduce(
        (allPages: GiphyGif[], currentPage: GiphyResponse) => {
          allPages.push(...currentPage.data);
          return allPages;
        },
        [],
      ),
    [response],
  );

  if (status === "error") {
    return <ErrorState message={error.message}></ErrorState>;
  }

  const isLoading = status === "pending" || isFetchingNextPage || isFetching;

  const hasItems = (response?.pages ?? []).length;
  const showInitialLoading = isLoading && !hasItems;
  const showPagingLoading = isLoading && hasItems;

  if (showInitialLoading) {
    return <LoadingGrid></LoadingGrid>;
  }

  return (
    <>
      <Box marginTop={theme.spacing(2)}>
        <GifGrid gifData={items}></GifGrid>
        {showPagingLoading && <LoadingGrid></LoadingGrid>}
        <Box marginTop={theme.spacing(2)}>
          {hasNextPage && (
            <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
          )}
        </Box>
      </Box>
    </>
  );
});
