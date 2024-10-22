import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  DefaultError,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";

import { SearchPage } from "./searchPage";
import { useSearchGifs } from "./hooks";
import { PagedQueryResult } from "@app/models";

import {
  mockSetSearchTerm,
  getMockRouterProvider,
  getMockSearchProvider,
  getMockGifData,
} from "@app/test";

vi.mock("./hooks/useSearchGifs");

const setMockUseSearchGifs = ({
  status,
  isFetchingNextPage,
  isFetching,
  error,
}: {
  status: "success" | "error" | "pending";
  isFetchingNextPage: boolean;
  isFetching: boolean;
  error: DefaultError | null;
}) => {
  vi.mocked(useSearchGifs).mockReturnValue({
    data: {
      pages: [
        {
          data: getMockGifData(2),
          pagination: { total_count: 2, count: 2, offset: 0 },
          meta: { response_id: "1234" },
        },
      ],
      pageParams: [1],
    },
    isFetchingNextPage,
    isFetching,
    error,
    status,
  } as UseSuspenseInfiniteQueryResult<PagedQueryResult>);
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = getMockRouterProvider({ children });
  return getMockSearchProvider({ children: router });
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the SearchPage component", () => {
    describe('when status is "success"', () => {
      it("should render the page", async () => {
        setMockUseSearchGifs({
          status: "success",
          isFetchingNextPage: false,
          error: null,
          isFetching: false,
        });
        await React.act(async () =>
          render(<SearchPage />, { wrapper: Wrapper }),
        );
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
        const input = screen.getByTestId("search-bar-input");
        expect(input).toBeTruthy();
      });
    });

    describe("when fetchingNextPage is true", () => {
      it("should show the loading grid", async () => {
        setMockUseSearchGifs({
          status: "pending",
          isFetchingNextPage: true,
          error: null,
          isFetching: true,
        });
        await React.act(async () =>
          render(<SearchPage />, { wrapper: Wrapper }),
        );
        const loadingGrid = screen.getByTestId("loading-grid");
        expect(loadingGrid).toBeTruthy();
      });
    });
  });

  describe("when submitting the search input", () => {
    it("should run the search", async () => {
      setMockUseSearchGifs({
        status: "success",
        isFetching: true,
        isFetchingNextPage: false,
        error: null,
      });
      await React.act(async () => render(<SearchPage />, { wrapper: Wrapper }));
      const user = userEvent.setup();
      const input = screen
        .getByTestId("search-bar-input")
        .querySelector("input");
      expect(input).toBeTruthy();
      await React.act(
        async () => await user.type(input as HTMLElement, "hello"),
      );
      await React.act(
        async () => await user.type(input as HTMLElement, "{Enter}"),
      );

      expect(mockSetSearchTerm).toHaveBeenLastCalledWith("hello");
    });
  });
});
