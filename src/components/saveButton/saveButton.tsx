import React, { useContext, useState } from "react";

import { IconButton, Snackbar } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

import { useGifLocalStorage } from "../../hooks";
import { SavedPageContext } from "../../App";

/**
 *  Save button for saving Gifs to local storage if they are not already saved, or removing them if they are.
 */
export function SaveButton({ gifId }: { gifId: string }) {
  const { savedItemIds, setSavedItemIds } = useContext(SavedPageContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isSaved = savedItemIds.includes(gifId);

  const updateSavedGifs = () => {
    const newGifIds = useGifLocalStorage({
      gifId,
      save: !isSaved,
      savedItemIds,
    });
    setSavedItemIds(newGifIds);
    setSnackbarMessage(!isSaved ? "Gif Saved" : "Gif Removed");
    setShowSnackbar(true);
  };

  return (
    <>
      <IconButton onClick={updateSavedGifs} data-testid="save-button">
        <ThumbUp color={isSaved ? "primary" : "inherit"}></ThumbUp>
      </IconButton>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={200000}
        message={snackbarMessage}
        onClose={() => setShowSnackbar(false)}
        data-testid="save-button-snackbar"
      />
    </>
  );
}
