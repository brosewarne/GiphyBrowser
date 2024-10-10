import React, { memo } from "react";
import { useTrendingGifs } from "./hooks";

import { GifGrid, LoadingGrid, ShowMoreButton } from "@app/components";

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
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useTrendingGifs();

  const pages = data?.pages ?? [];
  const allItems = pages.map((p) => p.data).flat();

  return (
    <>
      <GifGrid gifData={allItems}></GifGrid>
      {isFetchingNextPage && <LoadingGrid></LoadingGrid>}
      {hasNextPage && (
        <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
      )}
    </>
  );
});
