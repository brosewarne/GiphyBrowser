import React, { memo } from "react";

import { useTrendingGifs } from "./hooks";

import { GifGrid, LoadingGrid, ShowMoreButton } from "@app/components";
import { BasePage } from "@app/pages";

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
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTrendingGifs();

  if (!data && isFetching && !error) {
    return <LoadingGrid></LoadingGrid>;
  }

  const pages = data?.pages ?? [];

  return (
    <BasePage apiError={error}>
      {pages.map((page) => (
        <GifGrid gifData={page.data} key={page.meta.response_id}></GifGrid>
      ))}
      {isFetchingNextPage && <LoadingGrid></LoadingGrid>}
      {hasNextPage && (
        <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
      )}
    </BasePage>
  );
});
