import React, {
  memo,
  SyntheticEvent,
  useCallback,
  useContext,
  useState,
} from "react";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

import parse from "autosuggest-highlight/parse";

import Search from "@mui/icons-material/Search";

import { SearchContext } from "@app/providers";
import { useAutoComplete } from "@app/pages/search/hooks/useAutoComplete";

import styles from "./searchBar.module.css";

/**
 *  The SearchBar showin the the header. When a search term is submitted the searchTerm is set and the user
 *  is redirected to the search page where they can see their results
 */
export const SearchBar = memo(function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [textFieldContent, setTextFieldContent] = useState(searchTerm);

  const debouncedTextFieldContent = useDebounce(textFieldContent, 300);
  const { data: options } = useAutoComplete({
    searchTerm: debouncedTextFieldContent,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submit = useCallback(
    (value: string) => {
      setSearchTerm(value);
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
    (event: SyntheticEvent<Element, Event>, newValue: string | null) => {
      setTextFieldContent(newValue ?? "");
      submit(newValue ?? "");
    },
    [submit, setTextFieldContent],
  );

  return (
    <Autocomplete
      className={styles["auto-complete"]}
      filterOptions={(x) => x}
      options={options ?? []}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={textFieldContent}
      noOptionsText="No results"
      onChange={onChange}
      data-testid="search-bar-input"
      onInputChange={(event, newInputValue) => {
        setTextFieldContent(newInputValue);
      }}
      onKeyDown={submitOnEnter}
      renderInput={(params: AutocompleteRenderInputParams) => {
        params.InputProps.startAdornment = (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        );
        return <TextField {...params} placeholder="Search Giphy" />;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches = [
          {
            length: textFieldContent.length,
            offset: option.indexOf(textFieldContent),
          },
        ];

        const parts = parse(
          option,
          matches.map((match: { offset: number; length: number }) => [
            match.offset,
            match.offset + match.length,
          ]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container>
              <Grid>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    className={part.highlight ? styles["bold-option"] : ""}
                  >
                    {part.text}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
});
