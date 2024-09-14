import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SearchPage } from "./searchPage";
import { vi } from "vitest";

import { SearchContext } from "../../App";
import userEvent from "@testing-library/user-event";
import { act } from "react";

vi.mock("../../hooks/useSearchGifs", async () => {
  const mod = await vi.importActual<typeof import("../../hooks/useSearchGifs")>(
    "../../hooks/useSearchGifs",
  );
  return {
    ...mod,
    useSearchGifs: () => ({
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

const mockSetSearchTerm = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContext.Provider
      value={{ searchTerm: "", setSearchTerm: mockSetSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
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
      await act(async () => await user.type(input as HTMLElement, "{Enter}"));

      expect(mockSetSearchTerm).toHaveBeenLastCalledWith("hello");
    });
  });
});
