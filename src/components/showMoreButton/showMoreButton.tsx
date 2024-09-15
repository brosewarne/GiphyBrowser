import React from "react";
import { Button } from "@mui/material";

/**
 *  Show More button for loading more items.
 */
export function ShowMoreButton({ getNextPage }: { getNextPage: () => void }) {
  return (
    <Button
      variant="contained"
      onClick={getNextPage}
      data-testid="show-more-button"
    >
      Show More
    </Button>
  );
}
