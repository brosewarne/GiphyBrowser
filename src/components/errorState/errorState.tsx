import React from "react";
import { Typography } from "@mui/material";

/**
 * Simple error state component that currently just shows a supplied message
 */
export function ErrorState({ message }: { message: string }) {
  return (
    <Typography variant="h4" data-testid="error-state">
      {message}
    </Typography>
  );
}
