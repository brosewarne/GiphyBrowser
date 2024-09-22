import React, { memo } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { useSavedGifs } from "../../hooks";
import { db } from "../../savedItemsDB.js";

import { ErrorState, GifGrid, LoadingGrid } from "../../components";
import { BasePage } from "../basePage";

/**
 * The Saved Gifs page. Shows the saved gifs in a simple grid with no pagination.
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If the user doen't have any saved gifs, then a simple empty state is displayed
 */
export const SavedPage = memo(function SavedPage() {
  const [savedItems, loaded] = useLiveQuery(
    () =>
      db.savedGifs
        ?.toArray()
        .then((items) => [items.map((item) => item.giphyId), true]),
    [db],
    [],
  );

  const {
    isPending,
    error,
    data: items,
  } = useSavedGifs({
    gifIds: savedItems ? savedItems.join(",") : "",
  });

  if (!savedItems && loaded) {
    return (
      <ErrorState
        error={{ message: "You have no saved Gifs", name: "no saved gifs" }}
      ></ErrorState>
    );
  }
  return (
    <BasePage showInitialLoading={isPending} apiError={error}>
      {isPending ? (
        <LoadingGrid></LoadingGrid>
      ) : (
        !error && <GifGrid gifData={items}></GifGrid>
      )}
    </BasePage>
  );
});
