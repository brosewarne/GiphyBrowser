import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import styles from "./errorState.module.scss";

/**
 * Simple error state component that currently just shows a supplied message
 */
export const ErrorState = memo(function ErrorState({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Box className={styles["error-state-container"]}>
      <Box className={styles["error-state-elements"]}>
        <Typography variant="h6" data-testid="error-state">
          There was an error!
        </Typography>

        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>

        <Button variant="contained" onClick={() => resetErrorBoundary()}>
          Try again
        </Button>
      </Box>
    </Box>
  );
});
