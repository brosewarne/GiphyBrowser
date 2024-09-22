import * as React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { screen } from "@testing-library/dom";
import { SearchPage } from "./searchPage";
import { vi } from "vitest";
import { SearchContext } from "../../providers";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { useSearchGifs } from "../../hooks";
import {
  InfiniteData,
  InfiniteQueryObserverLoadingErrorResult,
  InfiniteQueryObserverPendingResult,
  InfiniteQueryObserverSuccessResult,
  DefaultError,
} from "@tanstack/react-query";
import { GiphyResponse } from "../../models";

vi.mock("../../hooks/useSearchGifs");

const mockSetSearchTerm = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContext.Provider
      value={{ searchTerm: "", setSearchTerm: mockSetSearchTerm }}
    >
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </SearchContext.Provider>
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("renders the SearchPage component", () => {
    describe('when status is "success"', () => {
      it("should render the page", () => {
        vi.mocked(useSearchGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
                meta: { response_id: "1234" },
              },
            ],
            pageParams: [{}],
          },
          status: "success",
          error: null,
        } as unknown as InfiniteQueryObserverSuccessResult<
          InfiniteData<GiphyResponse, unknown>
        >);
        render(<SearchPage />, { wrapper: Wrapper });
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
        const input = screen.getByTestId("search-bar-input");
        expect(input).toBeTruthy();
      });
    });
    describe("when fetchingNextPage is true", () => {
      it("should show the loading grid", () => {
        vi.mocked(useSearchGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
                meta: { response_id: "1234" },
              },
            ],
            pageParams: [{}],
          },
          isFetchingNextPage: true,
          error: null,
        } as unknown as InfiniteQueryObserverPendingResult<
          InfiniteData<GiphyResponse>,
          DefaultError
        >);
        render(<SearchPage />, { wrapper: Wrapper });
        const loadingGrid = screen.getByTestId("loading-grid");
        expect(loadingGrid).toBeTruthy();
      });
    });
    describe('when the status is "error"', () => {
      it("should show the error state", () => {
        vi.mocked(useSearchGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
                meta: { response_id: "1234" },
              },
            ],
            pageParams: [{}],
          },
          status: "error",
          error: { message: "there was an error" },
        } as unknown as InfiniteQueryObserverLoadingErrorResult<
          InfiniteData<GiphyResponse>,
          DefaultError
        >);
        render(<SearchPage />, { wrapper: Wrapper });
        const errorState = screen.getByTestId("error-state");
        expect(errorState).toBeTruthy();
      });
    });
  });
  describe("when submitting the search input", () => {
    it("should run the search", async () => {
      vi.mocked(useSearchGifs).mockReturnValue({
        data: {
          pages: [
            {
              data: [{ id: "1234" }, { id: "5678" }],
              pagination: { total_count: 2, count: 2 },
              meta: { response_id: "1234" },
            },
          ],
          pageParams: [{ pageParam: 1 }],
        },
        status: "success",
        isFetching: false,
        error: null,
      } as InfiniteQueryObserverSuccessResult<InfiniteData<GiphyResponse>>);
      render(<SearchPage />, { wrapper: Wrapper });
      const user = userEvent.setup();
      const input = screen
        .getByTestId("search-bar-input")
        .querySelector("input");
      expect(input).toBeTruthy();
      await act(async () => await user.type(input as HTMLElement, "hello"));
      await act(async () => await user.type(input as HTMLElement, "{Enter}"));

      expect(mockSetSearchTerm).toHaveBeenLastCalledWith("hello");
    });
  });
});
