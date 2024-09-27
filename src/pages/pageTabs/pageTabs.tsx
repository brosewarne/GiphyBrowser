import React, { memo } from "react";
import { useLocation } from "@tanstack/react-router";

import { Link } from "@tanstack/react-router";

import { Box, Tabs, Tab } from "@mui/material";
import styles from "./pageTabs.module.css";

export const PageTabs = memo(function PageTabs() {
  const { pathname } = useLocation();

  return (
    <Box className={styles["tabs-container"]}>
      <Tabs value={pathname !== "/" ? pathname : false} variant="fullWidth">
        <Tab
          label="Trending"
          component={Link}
          to="/trending"
          value="/trending"
          data-testid="trending-tab"
        />
        <Tab
          label="Saved"
          component={Link}
          to="/saved"
          value="/saved"
          data-testid="saved-tab"
        />
        <Tab
          label="Search"
          component={Link}
          to="/search"
          value="/search"
          data-testid="search-tab"
        />
      </Tabs>
    </Box>
  );
});
