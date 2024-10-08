import React, { memo, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { GiphyGif } from "@app/models";
import { SaveButton } from "../saveButton";

import styles from "./gifTile.module.scss";
import { GifModal } from "../gifModal";

/**
 *  Simple presentational component for showing a loaded Gif in a Card with the title,
 *  Gif image and a Save button
 */
export const GifTile = memo(function GifTile({
  gifData,
}: {
  gifData: GiphyGif;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const gifUrl =
    gifData.images?.fixed_height?.url ?? gifData.images?.fixed_width?.url;

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  return (
    <>
      <Card variant="outlined" data-testid="gif-tile">
        <CardActionArea onClick={openModal}>
          <CardContent key={gifData.id}>
            <Box className={styles["gif-tile-container"]}>
              <Box className={styles["gif-title-container"]}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  data-testid="gif-tile-title"
                >
                  {gifData.title}
                </Typography>
              </Box>
              <img
                src={gifUrl}
                alt={gifData.title}
                className={styles["gif-image"]}
              />
            </Box>
          </CardContent>
        </CardActionArea>

        <Box className={styles["save-button-container"]}>
          <CardActions>
            <SaveButton gifId={gifData.id}></SaveButton>
          </CardActions>
        </Box>
      </Card>
      <GifModal
        open={modalOpen}
        handleClose={closeModal}
        gifData={gifData}
      ></GifModal>
    </>
  );
});
