import React, { memo, useMemo, useContext } from "react";
import { Box, Typography } from "@mui/material";

import { SearchContext } from "../../providers";
import { useSearchGifs } from "../../hooks";

import {
  GifGrid,
  ShowMoreButton,
  LoadingGrid,
  ErrorState,
  SearchBar,
} from "../../components";
import { BasePage } from "../basePage";

import sharedStyles from "../../components/Shared.module.css";

/**
 * The Search Gifs page. Shows a search bar and any search results in a Gif Grid

 */
export const SearchPage = memo(function SearchPage() {
  const { searchTerm } = useContext(SearchContext);

  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSearchGifs({ searchTerm });

  const pages = useMemo(() => data?.pages || [], [data]);
  const hasItems = pages[0]?.data.length > 0;

  const lastPage = pages.slice(-1)[0];
  const firstPage = pages[0];
  const countCopy = hasItems
    ? `Showing ${lastPage.pagination.offset + lastPage.pagination.count} out of ${firstPage.pagination.total_count} total search results`
    : "";

  return (
    <BasePage showInitialLoading={false} apiError={error}>
      <Box className={sharedStyles['centered-content']}>
        <SearchBar></SearchBar>
        {!hasItems && !!searchTerm && !isFetching && (
          <ErrorState
            error={{
              message: `No Results for "${searchTerm}"`,
              name: "no results",
            }}
          ></ErrorState>
        )}
        {hasItems && (
          <>
            <Typography variant="h6">{countCopy}</Typography>
            {pages.map((page) => (
              <GifGrid
                gifData={page.data}
                key={page.meta.response_id}
              ></GifGrid>
            ))}
          </>
        )}

        {isFetchingNextPage && <LoadingGrid></LoadingGrid>}

        {hasNextPage && (
          <ShowMoreButton getNextPage={fetchNextPage}></ShowMoreButton>
        )}
      </Box>
    </BasePage>
  );
});
