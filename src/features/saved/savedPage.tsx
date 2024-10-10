import React, { memo, useContext } from "react";
import { useSavedGifs } from "./hooks";

import {
  GifGrid,
  LoadingGrid,
  ShowMoreButton,
} from "@app/components";
import { SavedContext } from "@app/app/providers";
import Typography from "@mui/material/Typography";

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
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useSavedGifs(
    {
      gifIds: savedGifs ?? [],
    },
  );

  if (!savedGifs && savedGifsLoaded) {
    return (
      <Typography variant="h4" data-testid="error-state">
        You have no saved Gifs
      </Typography>
    );
  }

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
