import React, { memo, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { InputAdornment, TextField } from "@mui/material";

import { SearchContext } from "@app/providers";

import { Search } from "@mui/icons-material";

/**
 *  The SearchBar showin the the header. When a search term is submitted the searchTerm is set and the user
 *  is redirected to the search page where they can see their results
 */
export const SearchBar = memo(function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [textFieldContent, setTextFieldContent] = useState(searchTerm);

  useEffect(() => {
    setTextFieldContent(searchTerm);
  }, [searchTerm]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    setSearchTerm(textFieldContent);
    if (pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <TextField
      id="serachGiphy"
      placeholder="Search Giphty"
      value={textFieldContent}
      onChange={(event) => {
        setTextFieldContent(event.target.value);
      }}
      onKeyDown={submitOnEnter}
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
  );
});
