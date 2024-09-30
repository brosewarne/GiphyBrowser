import React, { memo } from "react";
import Typography from "@mui/material/Typography";

/**
 * Simple error state component that currently just shows a supplied message
 */
export const ErrorState = memo(function ErrorState({ error }: { error: Error }) {
  return (
    <Typography variant="h4" data-testid="error-state">
      {error.message}
    </Typography>
  );
});
