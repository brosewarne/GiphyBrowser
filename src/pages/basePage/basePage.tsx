import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Box } from "@mui/material";
import { ErrorState } from "@app/components";

import styles from "./basePage.module.css";
import { GifModal } from "@app/components/gifModal";

interface PageProps {
  children?: React.ReactNode;
  apiError: Error | null;
}

export function BasePage({ children, apiError }: PageProps) {
  const renderErrorState = ({ error }: { error: Error }) => (
    <ErrorState error={error}></ErrorState>
  );

  if (apiError) {
    return <ErrorState error={apiError}></ErrorState>;
  }

  return (
    <ErrorBoundary fallbackRender={renderErrorState}>
      <Box className={styles["page-container"]}>{children}</Box>
      <GifModal></GifModal>
    </ErrorBoundary>
  );
}
