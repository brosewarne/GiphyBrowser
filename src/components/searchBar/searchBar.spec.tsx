import * as React from "react";
import { act } from "react";

import { MemoryRouter } from "react-router";

import { vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import { SearchContext } from "../../App";
import { SearchBar } from "./searchBar";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockSetSearchTerm = vi.fn();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContext.Provider
      value={{ searchTerm: "", setSearchTerm: mockSetSearchTerm }}
    >
      <MemoryRouter>{children}</MemoryRouter>
    </SearchContext.Provider>
  );
};

describe("SearchBar", () => {
  beforeEach(() => {
    render(<SearchBar />, { wrapper: Wrapper });
  });
  describe("renders the SearchBar component", () => {
    it("should render the searchBar", () => {
      const searchBar = screen.getByTestId("search-bar-input");
      expect(searchBar).toBeTruthy();
    });
  });

  describe("search functionality", () => {
    describe("when a user neters a search term and submits the search", () => {
      it("should redirect the user to the search page with the search term set", async () => {
        const user = userEvent.setup();
        const searchInput = screen
          .getByTestId("search-bar-input")
          .querySelector("input");
        await act(
          async () =>
            await user.type(searchInput as HTMLElement, "search term"),
        );
        await user.type(searchInput as HTMLElement, "{Enter}");
        expect(mockedUseNavigate.mock.calls[0]).toEqual(["/search"]);
        expect(mockSetSearchTerm).toHaveBeenLastCalledWith("search term");
      });
    });
  });
});
