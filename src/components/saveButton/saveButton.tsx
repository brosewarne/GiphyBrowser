import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { IconButton, Snackbar } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

import { db } from "../../savedItemsDB";

/**
 *  Save button for saving Gifs to local storage if they are not already saved, or removing them if they are.
 */
export function SaveButton({ gifId }: { gifId: string }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const savedItems = useLiveQuery(() => db.savedGifs?.toArray() || [])?.map(
    (item) => item.giphyId,
  );
  const isSaved = savedItems?.includes(gifId);

  const savedItem = useLiveQuery(async () => {
    const item = await db.savedGifs.where("giphyId").equals(gifId).toArray();
    return item ? item[0] : null;
  }, [gifId]);

  const updateSavedGifs = async () => {
    try {
      if (savedItem) {
        await db.savedGifs.delete(savedItem.id);
      } else {
        await db.savedGifs.add({
          giphyId: gifId,
        });
      }
      setSnackbarMessage(!isSaved ? "Gif Saved" : "Gif Removed");
      setShowSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton onClick={updateSavedGifs} data-testid="save-button">
        <ThumbUp color={isSaved ? "primary" : "inherit"}></ThumbUp>
      </IconButton>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        message={snackbarMessage}
        onClose={() => setShowSnackbar(false)}
        data-testid="save-button-snackbar"
      />
    </>
  );
}
