import React from "react";
import { useContext, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TextField, InputAdornment, Typography, styled } from "@mui/material";
import { Search } from "@mui/icons-material";

import { GifGrid } from "../../components/gifGrid";
import { SearchContext } from "../../App";
import { ShowMoreButton } from "../../components/showMoreButton";
import { useSearchGifs } from "../../hooks";

import { LoadingGrid } from "../../components/loadingGrid";
import { ErrorState } from "../../components/errorState/errorState";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

/**
 * The Search Gifs page. Shows a search bar and any search results in a Gif Grid

 */
export function SearchPage() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const [textFieldContent, setTextFieldContent] = useState(searchTerm);
  useEffect(() => {
    setTextFieldContent(searchTerm);
  }, [searchTerm]);

  const {
    status,
    data: response,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSearchGifs({ searchTerm });

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchTerm(textFieldContent);
    }
  };

  if (status === "error") {
    return <ErrorState message={error.message}></ErrorState>;
  }

  if (!response?.pages?.length && !!searchTerm && status !== "pending") {
    return <ErrorState message="No Results"></ErrorState>;
  }

  const items =
    response?.pages?.reduce((allPages, currentPage) => {
      allPages.push(...currentPage.data);
      return allPages;
    }, []) || [];

  return (
    <>
      <StyledTextField
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
      ></StyledTextField>

      {status === "pending" || isFetchingNextPage || isFetching ? (
        <LoadingGrid></LoadingGrid>
      ) : (
        <>
          {!!items.length && (
            <Typography variant="h6">
              Showing {response.pages.slice(-1)[0].pagination.count} out of{" "}
              {response.pages[0].pagination.total_count} total search results
            </Typography>
          )}
          <GifGrid gifData={items}></GifGrid>
        </>
      )}
      {hasNextPage && (
        <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
      )}
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
