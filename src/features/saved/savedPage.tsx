import React, { memo, useContext } from "react";
import { useSavedGifs } from "./hooks";

import {
  ErrorState,
  GifGrid,
  LoadingGrid,
  ShowMoreButton,
} from "@app/components";
import { BasePage } from "@app/components";
import { SavedContext } from "@app/app/providers";

/**
 * The Saved Gifs page. Shows the saved gifs in a simple grid with no pagination.
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If the user doen't have any saved gifs, then a simple empty state is displayed
 */
export const SavedPage = memo(function SavedPage() {
  const { savedGifsState } = useContext(SavedContext);

  const { savedGifs, savedGifsLoaded } = savedGifsState;
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSavedGifs({
    gifIds: savedGifs ?? [],
  });

  if (!savedGifs && savedGifsLoaded) {
    return (
      <ErrorState
        error={{ message: "You have no saved Gifs", name: "no saved gifs" }}
      ></ErrorState>
    );
  }

  if (!data && isFetching) {
    return <LoadingGrid></LoadingGrid>;
  }

  const pages = data?.pages ?? [];
  const allItems = pages.map((p) => p.data).flat();
  return (
    <BasePage apiError={error}>
      <GifGrid gifData={allItems}></GifGrid>
      {isFetchingNextPage && <LoadingGrid></LoadingGrid>}
      {hasNextPage && (
        <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
      )}
    </BasePage>
  );
});
