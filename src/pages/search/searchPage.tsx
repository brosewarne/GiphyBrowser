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

import styles from "./search.module.scss";

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

  const allItems = pages.map((p) => p.data).flat();
  return (
    <BasePage apiError={error}>
      <Box className={styles["page-container"]}>
        {/* include the searchTerm in the key so the SearchBar is recreated when the searchTerm changes, 
            allowing it to reflect the searchTerm if it was set from a different component */}
        <SearchBar key={`searchPageSearchBar-${searchTerm}`}></SearchBar>
        {!hasItems && searchTerm?.length > 0 && !isFetching && (
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
            <GifGrid gifData={allItems}></GifGrid>
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
