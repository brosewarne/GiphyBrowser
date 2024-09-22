import React, { memo } from "react";
import { AppBar, Toolbar, Typography, Box, useTheme } from "@mui/material";

import { SearchBar } from "../searchBar";

/**
 *  The App header with a title, naviation buttons for the trending, searcvh and saved pages.
 *  The header also includes a search bar.
 */
export const Header = memo(function Header() {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      paddingBottom={theme.spacing(4)}
      alignContent="center"
      data-testid="header"
    >
      <AppBar position="static">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Toolbar>
            <Typography variant="h6">Giphy Browser</Typography>
          </Toolbar>
          <SearchBar></SearchBar>
        </Box>
      </AppBar>
    </Box>
  );
});
