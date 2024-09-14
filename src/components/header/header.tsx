import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Fab, styled } from "@mui/material";

import { SearchBar } from "../searchBar";

const StyledAppBar = styled(AppBar)({
  minHeight: "5rem",
});
/**
 *  The App header with a title, naviation buttons for the trending, searcvh and saved pages.
 *  The header also includes a search bar.
 */
export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      flexGrow={1}
      marginBottom="2rem"
      alignContent="center"
      data-testid="header"
    >
      <StyledAppBar position="static">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Toolbar>
            <Typography variant="h6">Giphy Browser</Typography>
          </Toolbar>

          <Fab
            size="small"
            color={
              pathname === "/trending" || pathname === "/"
                ? "secondary"
                : "primary"
            }
            variant="extended"
            onClick={() => navigate("/trending")}
            data-testid="trending-link"
          >
            Trending Gifs
          </Fab>
          <Fab
            size="small"
            color={pathname === "/saved" ? "secondary" : "primary"}
            variant="extended"
            onClick={() => {
              navigate("/saved");
            }}
            data-testid="saved-link"
          >
            Saved Gifs
          </Fab>
          <Fab
            size="small"
            color={pathname === "/search" ? "secondary" : "primary"}
            variant="extended"
            onClick={() => navigate("/search")}
            data-testid="search-link"
          >
            Search Gifs
          </Fab>

          <SearchBar></SearchBar>
        </Box>
      </StyledAppBar>
    </Box>
  );
}
