import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Box, useTheme } from "@mui/material";

import { GifGrid } from "../../components/gifGrid";
import { LoadingGrid } from "../../components/loadingGrid";

import { ShowMoreButton } from "../../components/showMoreButton";
import { ErrorState } from "../../components/errorState/errorState";
import { useTrendingGifs } from "../../hooks";

/**
 * The Trending Gifs page. Shows the current trending gifs in a Gif Grid
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If there are no results for a search term, then a simple empty state is displayed
 *
 * There is basic pagination using a 'Show More' button.
 */

export function TrendingPage() {
  const {
    status,
    data: response,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTrendingGifs();
  const theme = useTheme();

  if (status === "error") {
    return <ErrorState message={error.message}></ErrorState>;
  }

  if (status === "pending" || isFetchingNextPage || isFetching) {
    return <LoadingGrid></LoadingGrid>;
  }

  const items = response.pages.reduce((allPages, currentPage) => {
    allPages.push(...currentPage.data);
    return allPages;
  }, []);

  return (
    <>
      <Box marginTop={theme.spacing(2)}>
        <GifGrid gifData={items}></GifGrid>
        {hasNextPage && (
          <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
        )}
      </Box>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
