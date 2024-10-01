import React, { useState, memo, useContext, useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { motion } from "framer-motion";

import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import ThumbUp from "@mui/icons-material/ThumbUp";

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

  const {
    savedGifsState: { savedGifs, addSavedGif, removeSavedGif },
  } = useContext(SavedContext);

  const isSaved = savedGifs?.includes(gifId);

  const savedItem = useLiveQuery(async () => {
    if (!isSaved) {
      return null;
    }
    return (await db.savedGifs.where("giphyId").equals(gifId).toArray())[0];
  }, [gifId]);

  const updateSavedGifs = async () => {
    try {
      if (savedItem) {
        // need to sort out default values for these that aren't null
        removeSavedGif?.mutate(savedItem.id);
      } else {
        // need to sort out default values for these that aren't null
        addSavedGif?.mutate(gifId);
      }

      setSnackbarMessage(!isSaved ? "Gif Saved" : "Gif Removed");
      setShowSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = useCallback(() => setShowSnackbar(false), []);
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
        onClose={onClose}
        data-testid="save-button-snackbar"
      />
    </>
  );
});
