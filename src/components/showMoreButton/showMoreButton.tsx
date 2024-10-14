import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./showMoreButton.module.scss";

/**
 *  Show More button for loading more items.
 */
export function ShowMoreButton({ getNextPage }: { getNextPage: () => void }) {
  return (
    <Box className={styles["button-container"]}>
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
