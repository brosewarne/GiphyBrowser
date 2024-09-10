import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { TrendingPage } from "./trendingPage";
import { vi } from "vitest";

import {
  SavedPageContext,
  TrendingItemsContext,
  TrendingPaginationContext,
} from "../../App";

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

const mockSetTrendingItems = vi.fn();
const mockSetTrendingPagination = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TrendingItemsContext.Provider
      value={{
        trendingItems: [{ id: 1234 }, { id: 5678 }],
        setTrendingItems: mockSetTrendingItems,
      }}
    >
      <TrendingPaginationContext.Provider
        value={{
          trendingPagination: {},
          setTrendingPagination: mockSetTrendingPagination,
        }}
      >
        <SavedPageContext.Provider value={{ savedItemIds: "1234,5678" }}>
          {children}
        </SavedPageContext.Provider>
      </TrendingPaginationContext.Provider>
    </TrendingItemsContext.Provider>
  );
};

describe("TrendingPage", () => {
  beforeEach(() => {
    render(<TrendingPage />, { wrapper: Wrapper });
  });
  describe("renders the TrendingPage component", () => {
    it("should render the page", () => {
      const gifGrid = screen.getByTestId("gif-grid");
      expect(gifGrid).toBeTruthy();
      const gifTiles = screen.getAllByTestId("gif-tile");
      expect(gifTiles.length).toEqual(2);
    });
  });
});
