import React, { memo, useMemo } from "react";

import Grid from "@mui/material/Grid2";
import { Box, useTheme } from "@mui/material";

import { GiphyGif } from "../../models";

import { GifTile } from "../gifTile";

/**
 *  Simple presentational component for showing the loaded Gifs in a grid
 */
export const GifGrid = memo(function GifGrid({
  gifData,
}: {
  gifData: GiphyGif[];
}) {
  const theme = useTheme();
  const rows = useMemo(
    () =>
      gifData.map((gif: GiphyGif, index: number) => {
        return (
          <Grid size={4} columnGap={2} key={`gifGrid_${index}`}>
            <GifTile gifData={gif} key={gif.id}></GifTile>
          </Grid>
        );
      }),
    [gifData],
  );

  return (
    <Box
      flexGrow={1}
      justifyContent="space-between"
      marginBottom={theme.spacing(1)}
      data-testid="gif-grid"
    >
      <Grid container rowSpacing={3} columnSpacing={2}>
        {rows}
      </Grid>
    </Box>
  );
});
