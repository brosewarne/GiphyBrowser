import React from "react";

import Grid from "@mui/material/Grid2";
import { Box, Skeleton } from "@mui/material";

import { NUMBER_OF_ITEMS } from "../../config";

/**
 *  Simple presentational component for showing a loading grid with rectangle skeletons
 */
export function LoadingGrid() {
  const rows = Array.from(Array(NUMBER_OF_ITEMS).keys()).map((i) => {
    return (
      <Grid size={4} columnGap={2} key={`loadingGrid${i}`}>
        <Skeleton
          variant="rectangular"
          width={375}
          height={200}
          key={i}
          data-testid="loading-skeleton"
        ></Skeleton>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="loading-grid">
      <Grid container rowSpacing={3} columnSpacing={2}>
        {rows}
      </Grid>
    </Box>
  );
}
