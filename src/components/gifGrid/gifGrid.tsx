import React from "react";

import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

import { GiphyGif } from "../../models";

import { GifTile } from "../gifTile";

/**
 *  Simple presentational component for showing the loaded Gifs in a grid
 */
export function GifGrid({ gifData }: { gifData: GiphyGif[] }) {
  const rows = gifData.map((gif: GiphyGif) => {
    return (
      <Grid size={4} columnGap={2} key={`gifGrid_${gif.id}`}>
        <GifTile gifData={gif} key={gif.id}></GifTile>
      </Grid>
    );
  });

  return (
    <Box flexGrow={1} justifyContent="space-between" data-testid="gif-grid">
      <Grid container rowSpacing={3} columnSpacing={2}>
        {rows}
      </Grid>
    </Box>
  );
}
