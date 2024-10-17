import React, { memo } from "react";

import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

import { GiphyGif } from "@app/models";
import { GifTile } from "../gifTile";

import styles from "./gifGrid.module.scss";

export const GifGrid = memo(function GifGrid({
  gifData,
}: {
  gifData: GiphyGif[];
}) {
  return (
    <Box data-testid="gif-grid">
      <Grid container spacing={3} className={styles["grid-container"]}>
        {gifData.map((gif: GiphyGif) => {
          return (
            // sometimes trending and search can bring back the same gif multiple times, use the added uniqueId instead of the giphy provided id
            <Grid
              size={{ xs: 8, sm: 6, md: 4 }}
              columnGap={2}
              key={`grid-${gif.uniqueId}`}
            >
              <GifTile gifData={gif} key={`tile-${gif.uniqueId}`}></GifTile>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
});
