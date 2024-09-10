import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { GifGrid } from "../../components/gifGrid";
import {
  SearchContext,
  SearchPaginationContext,
  SearchItemsContext,
} from "../../App";
import { ShowMoreButton } from "../../components/showMoreButton";
import { useSearchGifs } from "../../hooks";

import { NUMBER_OF_ITEMS } from "../../config";
import { ErrorState } from "../../components/errorState/errorState";

/**
 * The Search Gifs page. Shows a search bar and any search results in a Gif Grid
 *
 * If there is an error getting the gifs, a simple error state is displayed
 *
 * If there are no results for a search term, then a simple empty state is displayed
 *
 * There is basic pagination using a 'Show More' button.
 */
export function SearchPage() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const [textFieldContent, setTextFieldContent] = useState(searchTerm);
  useEffect(() => {
    setTextFieldContent(searchTerm);
  }, [searchTerm]);

  const { searchPagination, setSearchPagination } = useContext(
    SearchPaginationContext,
  );
  const { searchItems } = useContext(SearchItemsContext);

  const [resetItems, setResetItems] = useState(true);

  const { loading, error } = useSearchGifs({
    searchTerm,
    resetItems,
    limit: NUMBER_OF_ITEMS,
    offset: searchPagination?.offset || 0,
    rating: "g",
  });

  const getNextPage = () => {
    setResetItems(false);
    setSearchPagination({
      ...searchPagination,
      offset: searchPagination?.offset + NUMBER_OF_ITEMS,
    });
  };

  if (!!error) {
    return (
      <ErrorState message="Oops Something went wrong, please try again later"></ErrorState>
    );
  }

  if (!searchItems.length && !!searchTerm && !loading) {
    return <ErrorState message="No Results"></ErrorState>;
  }

  const { total_count: totalCount, count } = searchPagination;
  return (
    <>
      <form
        noValidate
        data-testid="search-page-form"
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setResetItems(true);
          setSearchTerm(textFieldContent);
        }}
        style={{ marginTop: "1rem" }}
      >
        <FormControl>
          <TextField
            placeholder="Search Giphty"
            value={textFieldContent}
            onChange={(event) => {
              setTextFieldContent(event.target.value);
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
            data-testid="search-page-input"
            sx={{ marginBottom: "1rem" }}
          ></TextField>
        </FormControl>
      </form>

      {!!searchItems.length && (
        <Typography variant="h6" sx={{ paddingBottom: "1rem" }}>
          Showing {count} out of {totalCount} total search results
        </Typography>
      )}
      <GifGrid gifData={searchItems} loading={loading}></GifGrid>
      {totalCount > count && (
        <ShowMoreButton getNextPage={getNextPage}></ShowMoreButton>
      )}
    </>
  );
}
