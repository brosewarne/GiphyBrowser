import React, { memo } from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import { GiphyGif } from "@app/models";
import { GifTile } from "../gifTile";

import styles from "./gifGrid.module.scss";

/**
 *  Simple presentational component for showing the loaded Gifs in a grid
 */
export const GifGrid = memo(function GifGrid({
  gifData,
}: {
  gifData: GiphyGif[];
}) {
  return (
    <Box className={styles["grid-container"]} data-testid="gif-grid">
      <Grid container rowSpacing={3} columnSpacing={2}>
        {gifData.map((gif: GiphyGif) => {
          return (
            // sometimes trending and search can bring back the same gif multiple times, use the added uniqueId instead of the giphy provided id
            <Grid size={4} columnGap={2} key={`grid-${gif.uniqueId}`}>
              <GifTile gifData={gif} key={`tile-${gif.uniqueId}`}></GifTile>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
});
