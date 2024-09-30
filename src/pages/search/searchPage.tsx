import React, { memo, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SearchContext } from "@app/providers";
import { useSearchGifs } from "./hooks";

import {
  GifGrid,
  ShowMoreButton,
  LoadingGrid,
  ErrorState,
  SearchBar,
} from "@app/components";
import { BasePage } from "@app/pages";

import sharedStyles from "@app/components/shared.module.css";

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

  const pages = data?.pages ?? [];
  const hasItems = pages[0]?.data.length > 0;

  const lastPage = pages.slice(-1)[0];
  const firstPage = pages[0];
  const countCopy = hasItems
    ? `Showing ${lastPage.pagination.offset + lastPage.pagination.count} out of ${firstPage.pagination.total_count} total search results`
    : "";

  return (
    <BasePage apiError={error}>
      <Box className={sharedStyles["centered-column-content"]}>
        <Box></Box>
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
