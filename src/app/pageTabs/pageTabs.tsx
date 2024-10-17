import React, { memo } from "react";
import { useLocation } from "@tanstack/react-router";

import { Link } from "@tanstack/react-router";

import { Box, Tab, Tabs } from "@mui/material";

import styles from "./pageTabs.module.scss";

export const PageTabs = memo(function PageTabs() {
  const { pathname } = useLocation();

  const tabNames = ["trending", "saved", "search"];

  return (
    <Box className={styles["tabs-container"]}>
      <Tabs value={pathname} variant="fullWidth">
        {tabNames.map((name) => (
          <Tab
            label={name}
            component={Link}
            to={`/${name}`}
            value={`/${name}`}
            data-testid={`${name}-tab`}
            key={name}
          />
        ))}
      </Tabs>
    </Box>
  );
});
