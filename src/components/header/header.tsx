import React, { memo } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import { SearchBar } from "../searchBar";

import styles from "./header.module.css";

/**
 *  The App header with a title, naviation buttons for the trending, searcvh and saved pages.
 *  The header also includes a search bar.
 */
export const Header = memo(function Header() {
  return (
    <Box className={styles['header-container']} data-testid="header">
      <AppBar position="static">
        <Box className={styles['toolbar-container']}>
          <Toolbar>
            <Typography variant="h6">Giphy Browser</Typography>
          </Toolbar>
          <SearchBar></SearchBar>
        </Box>
      </AppBar>
    </Box>
  );
});
