import React from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./gifModal.module.scss";

import { SaveButton } from "@app/components";
import { GiphyGif } from "@app/models";

export function GifModal({
  open,
  gifData,
  handleClose,
}: {
  open: boolean;
  gifData: GiphyGif;
  handleClose: () => void;
}) {
  const { title, id } = gifData;
  const { url, width, height } = gifData.images.original;
  return (
    <Dialog open={open} onClose={handleClose}>
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
