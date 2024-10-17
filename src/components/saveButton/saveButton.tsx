import React, { useState, memo, useContext, useCallback } from "react";
import { motion } from "framer-motion";

import { IconButton, Snackbar } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { SavedContext } from "@app/app/providers";

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

  const {
    savedGifsState: { savedGifs, addSavedGif, removeSavedGif },
  } = useContext(SavedContext);

  const savedItem = savedGifs?.find((savedGif) => savedGif.giphyId === gifId);

  const updateSavedGifs = async () => {
    try {
      if (savedItem) {
        // need to sort out default values for the mutations that aren't null
        removeSavedGif?.mutate(savedItem.id);
      } else {
        // need to sort out default values for the mutations that aren't null
        addSavedGif?.mutate(gifId);
      }

      setSnackbarMessage(!savedItem ? "Gif Saved" : "Gif Removed");
      setShowSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = useCallback(() => setShowSnackbar(false), []);
  return (
    <>
      <IconButton
        onAnimationEnd={updateSavedGifs}
        data-testid="save-button"
        component={motion.div}
        whileTap={{ scale: 1.1, rotate: 360 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
      >
        <ThumbUp color={savedItem ? "primary" : "action"}></ThumbUp>
      </IconButton>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        message={snackbarMessage}
        onClose={onClose}
        data-testid="save-button-snackbar"
      />
    </>
  );
});
