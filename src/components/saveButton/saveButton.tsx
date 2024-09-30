import React, { useState, memo, useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { motion } from "framer-motion";

import { IconButton, Snackbar } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

import { db } from "@app/utils";
import { SavedContext } from "@app/providers";

/**
 *  Save button for saving Gifs to local storage if they are not already saved, or removing them if they are.
 */
export const SaveButton = memo(function SaveButton({
  gifId,
}: {
  gifId: string;
}) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { gifs: savedItems } = useContext(SavedContext);

  const isSaved = savedItems?.includes(gifId);

  const savedItem = useLiveQuery(async () => {
    if (!isSaved) {
      return null;
    }
    return (await db.savedGifs.where("giphyId").equals(gifId).toArray())[0];
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
      <IconButton
        onClick={updateSavedGifs}
        data-testid="save-button"
        component={motion.div}
        whileTap={{ scale: 1.1, rotate: 360 }}
      >
        <ThumbUp color={isSaved ? "primary" : "action"}></ThumbUp>
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
});
