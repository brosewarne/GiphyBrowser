import * as React from "react";
import { MemoryRouter } from "react-router";

import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";

import { SearchContext } from "../../App";

import { Header } from "./header";

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

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContext.Provider value={{ searchTerm: "", setSearchTerm: () => {} }}>
      <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
    </SearchContext.Provider>
  );
};

describe("Header", () => {
  beforeEach(() => {
    render(<Header />, { wrapper: Wrapper });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the Header component", () => {
    it("should render the trending, saved and search links and the search bar", () => {
      const trendingLink = screen.queryByTestId("trending-link");
      expect(trendingLink).toBeTruthy();

      const savedLink = screen.queryByTestId("saved-link");
      expect(savedLink).toBeTruthy();

      const searchLink = screen.queryByTestId("search-link");
      expect(searchLink).toBeTruthy();

      const searchBar = screen.queryByTestId("search-bar-input");
      expect(searchBar).toBeTruthy();
    });
  });

  // @todo convert these to describe.each / it.each
  describe("header link functionality", () => {
    describe("when the 'trending' link is clicked", () => {
      it("should navigate to the 'trending' page", () => {
        const trendingLink = screen.getByTestId("trending-link");
        fireEvent.click(trendingLink);
        expect(mockedUseNavigate.mock.calls[0]).toEqual(["/trending"]);
      });
    });

    describe("when the 'saved' link is clicked", () => {
      it("should navigate to the 'saved' page", () => {
        const savedLink = screen.getByTestId("saved-link");
        fireEvent.click(savedLink);
        expect(mockedUseNavigate.mock.calls[0]).toEqual(["/saved"]);
      });
    });

    describe("when the 'search' link is clicked", () => {
      it("should navigate to the 'search' page", () => {
        const searchLink = screen.getByTestId("search-link");
        fireEvent.click(searchLink);
        expect(mockedUseNavigate.mock.calls[0]).toEqual(["/search"]);
      });
    });
  });
});
