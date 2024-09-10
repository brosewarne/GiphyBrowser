import React, { useContext } from "react";
import { useSavedGifs } from "../../hooks";
import { GifGrid } from "../../components/gifGrid";
import { SavedPageContext } from "../../App";
import { ErrorState } from "../../components/errorState/errorState";

/**
 * The Saved Gifs page. Shows the saved gifs in a simple grid with no pagination.
 *  
 * If there is an error getting the gifs, a simple error state is displayed
 * 
 * If the user doen't have any saved gifs, then a simple empty state is displayed
 */
export function SavedPage() {
  const { savedItemIds } = useContext(SavedPageContext);
  if (!savedItemIds.length) {
    <ErrorState message="You have no saved Gifs"></ErrorState>
  }
  
  const { data, loading, error } = useSavedGifs({ gifIds: savedItemIds });
  if (!!error) {
    <ErrorState message="Oops Something went wrong, please try again later"></ErrorState>
  }

  return <GifGrid gifData={data.data} loading={loading}></GifGrid>;
}
