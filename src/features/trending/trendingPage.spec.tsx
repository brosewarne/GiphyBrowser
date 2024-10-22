import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";
import {
  DefaultError,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";

import { TrendingPage } from "./trendingPage";
import { useTrendingGifs } from "./hooks";
import { PagedQueryResult } from "@app/models";
import { getMockGifData } from "@app/test";

vi.mock("./hooks/useTrendingGifs");

const setMockUseTrendingGifs = ({
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
  vi.mocked(useTrendingGifs).mockReturnValue({
    data: {
      pages: [
        {
          data: getMockGifData(2),
          pagination: { total_count: 2, count: 2, offset: 0 },
          meta: { response_id: "1234" },
        },
      ],
      pageParams: [{}],
    },
    isFetchingNextPage,
    isFetching,
    error,
    status,
  } as UseSuspenseInfiniteQueryResult<PagedQueryResult>);
};

describe("TrendingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the TrendingPage component", () => {
    describe('when there are items and the status is "success"', () => {
      it("should render the page", () => {
        setMockUseTrendingGifs({
          status: "success",
          isFetching: false,
          isFetchingNextPage: false,
          error: null,
        });

        render(<TrendingPage />);
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
      });
    });
    describe("when isFetchingNextPage is true", () => {
      it("should show the loading grid", () => {
        setMockUseTrendingGifs({
          status: "pending",
          isFetching: false,
          isFetchingNextPage: true,
          error: null,
        });

        render(<TrendingPage />);
        const loadingGrid = screen.getByTestId("loading-grid");
        expect(loadingGrid).toBeTruthy();
      });
    });
  });
});
