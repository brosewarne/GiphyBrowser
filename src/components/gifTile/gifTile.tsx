import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { GiphyGif } from "@app/models";
import { SaveButton } from "../saveButton";

import sharedStyles from "../shared.module.css";
import styles from "./gifTile.module.css";
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <Card variant="outlined" data-testid="gif-tile">
        <CardActionArea onClick={openModal}>
          <CardContent key={gifData.id}>
            <Box className={sharedStyles["centered-column-content"]}>
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

        <Box className={sharedStyles["centered-content"]}>
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
