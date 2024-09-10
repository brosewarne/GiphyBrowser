import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, InputAdornment, TextField } from "@mui/material";

import { SearchContext } from "../../App";

import { Search } from "@mui/icons-material";

/**
 *  The SearchBar showin the the header. When a search term is submitted the searchTerm is set and the user
 *  is redirected to the search page where they can see their results
 */
export function SearchBar() {
  const [textFieldContent, setTextFieldContent] = useState("");

  const { setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setSearchTerm(textFieldContent);
          navigate("/search");
        }}
        data-testid="search-bar-form"
      >
        <TextField
          id="serachGiphy"
          value={textFieldContent}
          onChange={(event) => {
            setTextFieldContent(event.target.value);
          }}
          label="Search Giphy"
          variant="outlined"
          sx={{
            maxHeight: "2rem",
            marginRight: "2rem",
          }}
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
      </form>
    </Box>
  );
}
