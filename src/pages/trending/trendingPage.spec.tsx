import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { TrendingPage } from "./trendingPage";
import { vi } from "vitest";


vi.mock("../../hooks/useTrendingGifs", async () => {
  const mod = await vi.importActual<typeof import("../../hooks/useTrendingGifs")>(
    "../../hooks/useTrendingGifs",
  );
  return {
    ...mod,
    useTrendingGifs: () => ({
      data: {
        pages: [
          {
            data: [{ id: 1234 }, { id: 5678 }],
            pagination: { total_count: 2, count: 2 },
          },
        ],
      },

      loading: false,
      error: null,
    }),
  };
});


describe("TrendingPage", () => {
  beforeEach(() => {
    render(<TrendingPage />);
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
