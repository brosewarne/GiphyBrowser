import React, { memo, useCallback, useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { GifGrid } from "../../components/gifGrid";
import { SearchContext } from "../../App";
import { ShowMoreButton } from "../../components/showMoreButton";
import { useSearchGifs } from "../../hooks";

import { LoadingGrid } from "../../components/loadingGrid";
import { ErrorState } from "../../components/errorState/errorState";
import { GiphyGif, GiphyResponse } from "../../models";

/**
 * The Search Gifs page. Shows a search bar and any search results in a Gif Grid

 */
export const SearchPage = memo(function SearchPage() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const [textFieldContent, setTextFieldContent] = useState(searchTerm);
  useEffect(() => {
    setTextFieldContent(searchTerm);
  }, [searchTerm]);

  const theme = useTheme();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSearchGifs({ searchTerm });

  const response = useMemo(() => data, [data]);
  const pages = useMemo(() => response?.pages || [], [response]);
  const items = useMemo(
    () =>
      pages.reduce((allPages: GiphyGif[], currentPage: GiphyResponse) => {
        allPages.push(...currentPage.data);
        return allPages;
      }, []) || [],
    [pages],
  );

  const submitOnEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setSearchTerm(textFieldContent);
      }
    },
    [setSearchTerm, textFieldContent],
  );

  if (status === "error") {
    return <ErrorState message={error.message}></ErrorState>;
  }

  if (!response?.pages?.length && !!searchTerm && status !== "pending") {
    return <ErrorState message="No Results"></ErrorState>;
  }

  const isLoading = status === "pending" || isFetchingNextPage || isFetching;

  const hasItems = (response?.pages ?? []).length;
  const showInitialLoading = isLoading && !hasItems;
  const showPagingLoading = isLoading && hasItems;

  if (showInitialLoading) {
    return <LoadingGrid></LoadingGrid>;
  }

  const lastPage = pages.slice(-1)[0];
  const firstPage = pages[0];
  const countCopy = pages.length
    ? `Showing ${lastPage.pagination.offset + lastPage.pagination.count} out of ${firstPage.pagination.total_count} total search results`
    : "";

  return (
    <>
      <Box marginBottom={theme.spacing(2)}>
        <TextField
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
          data-testid="search-page-input"
        ></TextField>
      </Box>

      <>
        <Typography variant="h6">{countCopy}</Typography>
        <GifGrid gifData={items} key={`gifGrid${pages.length}`}></GifGrid>
      </>

      {showPagingLoading && <LoadingGrid></LoadingGrid>}
      <Box marginTop={theme.spacing(2)}>
        {hasNextPage && (
          <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
        )}
      </Box>
    </>
  );
});
