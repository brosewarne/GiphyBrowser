import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";

import {
  InputAdornment,
  TextField,
} from "@mui/material";


import Search from "@mui/icons-material/Search";

import { SearchContext, StatsContext } from "@app/app/providers";

/**
 *  The SearchBar showin the the header. When a search term is submitted the searchTerm is set and the user
 *  is redirected to the search page where they can see their results
 */
export const SearchBar = memo(function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [textFieldContent, setTextFieldContent] = useState(searchTerm);
  const { stats, updateStats } = useContext(StatsContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submit = useCallback(
    (value: string) => {
      setSearchTerm(value);
      const numSearches = (stats?.numSearches ?? 0) + 1;
      console.log("HERE?", numSearches);
      updateStats?.mutate({ statToUpdate: "numSearches", incrementValue: 1 });
      if (pathname !== "/search") {
        navigate({ to: "/search" });
      }
    },
    [setSearchTerm, navigate, pathname],
  );

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    submit(textFieldContent);
  };

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextFieldContent(event.target.value);
    },
    [setTextFieldContent],
  );

  return (
    <TextField
      onChange={onChange}
      onKeyDown={submitOnEnter}
      value={textFieldContent}
      placeholder="Search Giphy"
      data-testid="search-bar-input"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    ></TextField>
  );
});
