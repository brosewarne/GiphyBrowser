import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";

import { SearchContext } from "../../App";

import { Search } from "@mui/icons-material";

/**
 *  The SearchBar showin the the header. When a search term is submitted the searchTerm is set and the user
 *  is redirected to the search page where they can see their results
 */
export const SearchBar = memo(function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [textFieldContent, setTextFieldContent] = useState(searchTerm);
  const theme = useTheme();

  useEffect(() => {
    setTextFieldContent(searchTerm);
  }, [searchTerm]);

  const navigate = useNavigate();

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchTerm(textFieldContent);
      navigate("/search");
    }
  };

  return (
    <Box display="flex" padding={theme.spacing(4)}>
      <TextField
        id="serachGiphy"
        value={textFieldContent}
        onChange={(event) => {
          setTextFieldContent(event.target.value);
        }}
        onKeyDown={submitOnEnter}
        label="Search Giphy"
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        data-testid="search-bar-input"
      />
    </Box>
  );
});
