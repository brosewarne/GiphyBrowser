import React, { memo } from "react";

import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

import { GiphyGif } from "../../models";
import { GifTile } from "../gifTile";

import styles from "./gifGrid.module.css";

/**
 *  Simple presentational component for showing the loaded Gifs in a grid
 */
export const GifGrid = memo(function GifGrid({
  gifData,
}: {
  gifData: GiphyGif[];
}) {
  return (
    <Box className={styles['grid-container']} data-testid="gif-grid">
      <Grid container rowSpacing={3} columnSpacing={2}>
        {gifData.map((gif: GiphyGif) => {
          return (
            <Grid size={4} columnGap={2} key={gif.id}>
              <GifTile gifData={gif} key={gif.id}></GifTile>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
});
