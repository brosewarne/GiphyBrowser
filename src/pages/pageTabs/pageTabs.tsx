import React, { memo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Box, Tabs, Tab } from "@mui/material";
import styles from "./pageTabs.module.css";

export const PageTabs = memo(function PageTabs() {
  const { pathname } = useLocation();

  return (
    <Box className={styles['tabs-container']}>
      <Tabs value={pathname} variant="fullWidth">
        <Tab
          label="Trending"
          component={Link}
          to="/trending"
          value="/trending"
        />
        <Tab label="Saved" component={Link} to="/saved" value="/saved" />
        <Tab label="Search" component={Link} to="/search" value="/search" />
      </Tabs>
    </Box>
  );
});
