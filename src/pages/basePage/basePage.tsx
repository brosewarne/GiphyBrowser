import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Box } from "@mui/material";
import { LoadingGrid, ErrorState } from "../../components";

interface PageProps {
  children?: React.ReactNode;
  showInitialLoading: boolean;
  apiError: Error | null;
}

export function BasePage({
  children,
  showInitialLoading,
  apiError,
}: PageProps) {
  const renderErrorState = ({ error }: { error: Error }) => (
    <ErrorState error={error}></ErrorState>
  );

  if (apiError) {
    return <ErrorState error={apiError}></ErrorState>;
  }

  return (
    <ErrorBoundary fallbackRender={renderErrorState}>
      <Box marginTop={4}>
        {showInitialLoading ? <LoadingGrid></LoadingGrid> : children}
      </Box>
    </ErrorBoundary>
  );
}
