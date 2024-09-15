import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { TrendingPage } from "./trendingPage";
import { vi } from "vitest";
import { useTrendingGifs } from "../../hooks";
import {
  DefaultError,
  InfiniteData,
  InfiniteQueryObserverLoadingErrorResult,
  InfiniteQueryObserverPendingResult,
  InfiniteQueryObserverSuccessResult,
} from "@tanstack/react-query";
import { GiphyResponse } from "../../models";

vi.mock("../../hooks/useTrendingGifs");

describe("TrendingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the TrendingPage component", () => {
    describe('when there are items and the status is "success"', () => {
      it("should render the page", () => {
        vi.mocked(useTrendingGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
              },
            ],
            pageParams: [{}],
          },
          status: "success",
          error: null,
        } as InfiniteQueryObserverSuccessResult<InfiniteData<GiphyResponse>>);

        render(<TrendingPage />);
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
      });
    });
    describe('when the status is "pending"', () => {
      it("should show the loading grid", () => {
        vi.mocked(useTrendingGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
              },
            ],
            pageParams: [{}],
          },
          status: "pending",
          error: null,
        } as unknown as InfiniteQueryObserverPendingResult<
          InfiniteData<GiphyResponse>,
          DefaultError
        >);
        render(<TrendingPage />);
        const loadingGrid = screen.getByTestId("loading-grid");
        expect(loadingGrid).toBeTruthy();
      });
    });
    describe('when the status is "error"', () => {
      it("should show the error state", () => {
        vi.mocked(useTrendingGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2, offeset: 0 },
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
        render(<TrendingPage />);
        const errorState = screen.getByTestId("error-state");
        expect(errorState).toBeTruthy();
      });
    });
  });
});
