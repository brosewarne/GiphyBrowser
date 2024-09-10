import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SearchPage } from "./searchPage";
import { vi } from "vitest";

import {
  SavedPageContext,
  SearchContext,
  SearchItemsContext,
  SearchPaginationContext,
} from "../../App";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { GiphyGif } from "../../models";

vi.mock("../../hooks/useSearchGifs", async () => {
  const mod = await vi.importActual<typeof import("../../hooks/useSearchGifs")>(
    "../../hooks/useSearchGifs",
  );
  return {
    ...mod,
    useSearchGifs: () => ({
      data: {
        data: [{ id: 1234 }, { id: 5678 }],
      },
      loading: false,
      error: null,
    }),
  };
});

const mockSetSearchItems = vi.fn();
const mockSetSearchPagination = vi.fn();
const mockSetSearchTerm = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchItemsContext.Provider
      value={{
        searchItems: [{ id: "1234" }, { id: "5678" }] as GiphyGif[],
        setSearchItems: mockSetSearchItems,
      }}
    >
      <SearchPaginationContext.Provider
        value={{
          searchPagination: { total_count: 0, count: 0, offset: 0 },
          setSearchPagination: mockSetSearchPagination,
        }}
      >
        <SearchContext.Provider
          value={{ searchTerm: "", setSearchTerm: mockSetSearchTerm }}
        >
          <SavedPageContext.Provider
            value={{ savedItemIds: "1234,5678", setSavedItemIds: () => {} }}
          >
            {children}
          </SavedPageContext.Provider>
        </SearchContext.Provider>
      </SearchPaginationContext.Provider>
    </SearchItemsContext.Provider>
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    render(<SearchPage />, { wrapper: Wrapper });
  });
  describe("renders the SearchPage component", () => {
    it("should render the page", () => {
      const gifGrid = screen.getByTestId("gif-grid");
      expect(gifGrid).toBeTruthy();
      const gifTiles = screen.getAllByTestId("gif-tile");
      expect(gifTiles.length).toEqual(2);
      const input = screen.getByTestId("search-page-input");
      expect(input).toBeTruthy();
    });
  });
  describe("when submitting the search input", () => {
    it("should run the search", async () => {
      const user = userEvent.setup();
      const input = screen
        .getByTestId("search-page-input")
        .querySelector("input");
      expect(input).toBeTruthy();
      await act(async () => await user.type(input as HTMLElement, "hello"));
      const searchForm = await screen.findByTestId("search-page-form");
      await act(async () => fireEvent.submit(searchForm));
      expect(mockSetSearchTerm).toHaveBeenLastCalledWith("hello");
    });
  });
});
