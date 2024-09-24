import React, { memo } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { useSavedGifs } from "./hooks";
import { db } from "@app/utils";

import {
  ErrorState,
  GifGrid,
  LoadingGrid,
  ShowMoreButton,
} from "@app/components";
import { BasePage } from "@app/pages";

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
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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

  if (!data && isFetching) {
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
