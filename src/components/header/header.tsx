import React, { memo, useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { SearchBar } from "@app/components";

import styles from "./header.module.scss";
import { SearchContext } from "@app/app/providers";

/**
 *  The App header with a title, naviation buttons for the trending, searcvh and saved pages.
 *  The header also includes a search bar.
 */
export const Header = memo(function Header() {
  const { searchTerm } = useContext(SearchContext);
  return (
    <Box className={styles["header-container"]} data-testid="header">
      <AppBar position="static">
        <Box className={styles["toolbar-container"]}>
          <Toolbar>
            <Typography variant="h6">Giphy Browser</Typography>
          </Toolbar>
          {/* include the searchTerm in the key so the SearchBar is recreated when the searchTerm changes, 
              allowing it to reflect the searchTerm if it was set from a different component */}
          <SearchBar key={`appHeaderSearchBar-${searchTerm}`}></SearchBar>
        </Box>
      </AppBar>
    </Box>
  );
});
