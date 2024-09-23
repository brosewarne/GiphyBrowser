import React, { memo } from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

import { GiphyGif } from "@app/models";
import { SaveButton } from "../saveButton";

import sharedStyles from "../shared.module.css";
import styles from "./gifTile.module.css";

/**
 *  Simple presentational component for showing a loaded Gif in a Card with the title,
 *  Gif image and a Save button
 */
export const GifTile = memo(function GifTile({
  gifData,
}: {
  gifData: GiphyGif;
}) {
  const gifUrl =
    gifData.images?.fixed_height?.url ?? gifData.images?.fixed_width?.url;

  return (
    <Card variant="outlined" data-testid="gif-tile">
      <CardContent key={gifData.id}>
        <Box className={sharedStyles['centered-column-content']}>
          <Box className={styles['gif-title-container']}>
            <Typography
              gutterBottom
              variant="subtitle1"
              data-testid="gif-tile-title"
            >
              {gifData.title}
            </Typography>
          </Box>
          <img src={gifUrl} alt={gifData.title} className={styles['gif-image']} />
        </Box>
      </CardContent>
      <Box className={sharedStyles['centered-content']}>
        <CardActions>
          <SaveButton gifId={gifData.id}></SaveButton>
        </CardActions>
      </Box>
    </Card>
  );
});
