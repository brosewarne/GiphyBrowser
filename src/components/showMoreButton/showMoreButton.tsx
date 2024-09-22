import React from "react";
import { Box, Button, useTheme } from "@mui/material";

/**
 *  Show More button for loading more items.
 */
export function ShowMoreButton({ getNextPage }: { getNextPage: () => void }) {
  const theme = useTheme();
  return (
    <Box marginTop={theme.spacing(2)} textAlign="center">
      <Button
        variant="contained"
        onClick={getNextPage}
        data-testid="show-more-button"
      >
        Show More
      </Button>
    </Box>
  );
}
