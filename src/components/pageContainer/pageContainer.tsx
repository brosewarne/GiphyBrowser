import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Box from "@mui/material/Box";
import { ErrorState, LoadingGrid } from "@app/components";

import styles from "./pageContainer.module.scss";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface PageProps {
  children?: React.ReactNode;
}

export function PageContainer({ children }: PageProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
      
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorState
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            ></ErrorState>
          )}
          onReset={reset}
        >
          <Suspense fallback={<LoadingGrid></LoadingGrid>}>
            <Box className={styles["page-container"]}>{children}</Box>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
