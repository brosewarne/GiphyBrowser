import React, { useEffect, useContext, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./gifModal.module.css";

import { SaveButton } from "@app/components";
import { GifModalContext } from "@app/providers";

export function GifModal() {
  const [showGifModal, setShowGifModal] = useState(false);
  const { gifData, setGifData } = useContext(GifModalContext);

  useEffect(() => {
    if (gifData?.title) {
      setShowGifModal(true);
    }
  }, [gifData]);

  if (!gifData) {
    // gifData is null by default
    return;
  }

  const handleClose = () => {
    setShowGifModal(false);
    setGifData(null);
  };

  const { title, id } = gifData;
  const { url, width, height } = gifData.images.original;
  return (
    <Dialog open={showGifModal} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        className={styles["close-button"]}
        data-testid="close-button"
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <img
          src={url}
          width={width}
          height={height}
          alt={title}
          data-testid="gif-modal-img"
        ></img>
      </DialogContent>
      <Box className={styles["save-button"]}>
        <SaveButton gifId={id}></SaveButton>
      </Box>
    </Dialog>
  );
}
