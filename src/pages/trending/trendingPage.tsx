import React from "react";
import { useContext, useState } from "react";
import { Box } from "@mui/material";

import { TrendingItemsContext, TrendingPaginationContext } from "../../App";
import { useTrendingGifs } from "../../hooks";
import { GifGrid } from "../../components/gifGrid";

import { NUMBER_OF_ITEMS } from "../../config";
import { ShowMoreButton } from "../../components/showMoreButton";
import { ErrorState } from "../../components/errorState/errorState";

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
  const { trendingPagination, setTrendingPagination } = useContext(
    TrendingPaginationContext,
  );
  const { trendingItems } = useContext(TrendingItemsContext);
  const [resetItems, setResetItems] = useState(true);

  const getNextPage = () => {
    setResetItems(false);
    setTrendingPagination({
      ...trendingPagination,
      offset: trendingPagination?.offset + NUMBER_OF_ITEMS,
    });
  };

  const { loading, error } = useTrendingGifs({
    resetItems,
    limit: trendingPagination?.limit || NUMBER_OF_ITEMS,
    offset: trendingPagination?.offset || 0,
    rating: "g",
  });

  if (!!error) {
    return (
      <ErrorState message="Oops Something went wrong, please try again later"></ErrorState>
    );
  }

  if (!trendingItems) {
    return <ErrorState message="No Trending Gifs"></ErrorState>;
  }

  return (
    <Box sx={{ marginTop: "16x" }}>
      <GifGrid gifData={trendingItems} loading={loading}></GifGrid>
      <ShowMoreButton getNextPage={getNextPage}></ShowMoreButton>
    </Box>
  );
}
