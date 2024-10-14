import React, { memo, useContext } from "react";

import Grid from "@mui/material/Grid2";
import { Box, Skeleton, useTheme } from "@mui/material";

import { ConfigContext } from "@app/app/providers";

/**
 *  Simple presentational component for showing a loading grid with rectangle skeletons
 */
export const LoadingGrid = memo(function LoadingGrid() {
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const rows = Array.from(Array(config.numberOfItems).keys()).map((i) => {
    return (
      <Grid size={4} columnGap={2} key={`loadingGrid${i}`}>
        <Skeleton
          variant="rectangular"
          width={theme.spacing(48.75)}
          height={theme.spacing(37.5)}
          key={i}
          data-testid="loading-skeleton"
        ></Skeleton>
      </Grid>
    );
  });

  return (
    <Box data-testid="loading-grid">
      <Grid container rowSpacing={3} columnSpacing={2}>
        {rows}
      </Grid>
    </Box>
  );
});
