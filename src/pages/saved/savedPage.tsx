import React, { memo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useSavedGifs } from "../../hooks";
import { GifGrid } from "../../components/gifGrid";
import { ErrorState } from "../../components/errorState/errorState";
import { db } from "../../savedItemsDB";
import { LoadingGrid } from "../../components/loadingGrid";

/**
 * The Saved Gifs page. Shows the saved gifs in a simple grid with no pagination.
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If the user doen't have any saved gifs, then a simple empty state is displayed
 */
export const SavedPage = memo(function SavedPage() {
  const savedItems =
    useLiveQuery(() => db.savedGifs?.toArray())?.map((item) => item.giphyId) ||
    [];

  const {
    isPending,
    isError,
    error,
    data: response,
  } = useSavedGifs({
    gifIds: savedItems.join(","),
  });

  if (!savedItems.length) {
    return <ErrorState message="You have no saved Gifs"></ErrorState>;
  }

  if (isError) {
    return <ErrorState message={error.message}></ErrorState>;
  }

  const items = response?.data ?? [];
  return (
    <>
      <GifGrid gifData={items}></GifGrid>;
      {isPending && <LoadingGrid></LoadingGrid>}
    </>
  );
});
