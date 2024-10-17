import React, { memo } from "react";
import { Box, Typography } from "@mui/material";

import styles from "./errorState.module.scss";

export const ErrorState = memo(function ErrorState({
  error,
}: {
  error: Error;
}) {
  return (
    <Box className={styles["error-state-container"]}>
      <Box className={styles["error-state-elements"]}>
        <Typography variant="h6" data-testid="error-state">
          There was an error!
        </Typography>

        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </Box>
    </Box>
  );
});
