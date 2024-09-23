import React, { memo, useMemo } from "react";

import { useTrendingGifs } from "../../hooks";

import { GifGrid, LoadingGrid, ShowMoreButton } from "../../components";
import { BasePage } from "../basePage";

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


  const pages = useMemo(() => data?.pages || [], [data]);

  const hasItems = (pages ?? []).length;
  const showInitialLoading = isFetching && !hasItems;

  return (
    <BasePage showInitialLoading={showInitialLoading} apiError={error}>
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
