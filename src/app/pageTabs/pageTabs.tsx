import React, { memo } from "react";
import { useLocation } from "@tanstack/react-router";

import { Link } from "@tanstack/react-router";

import { Box, Tab, Tabs } from "@mui/material";

import styles from "./pageTabs.module.scss";

export const PageTabs = memo(function PageTabs() {
  const { pathname } = useLocation();

  const tabNames = ["Trending", "Saved", "Search"];
  return (
    <Box className={styles["tabs-container"]}>
      <Tabs value={pathname !== "/" ? pathname : false} variant="fullWidth">
        {tabNames.map((name) => (
          <Tab
            label={name}
            component={Link}
            to={`/${name.toLowerCase()}`}
            value={`/${name.toLowerCase()}`}
            data-testid={`${name.toLowerCase()}-tab`}
            key={name}
          />
        ))}
      </Tabs>
    </Box>
  );
});
