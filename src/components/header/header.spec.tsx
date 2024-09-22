import * as React from "react";
import { MemoryRouter } from "react-router";

import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";

import { SearchContext } from "../../providers";

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
      // @todo fill this in
      const searchBar = screen.queryByTestId("search-bar-input");
      expect(searchBar).toBeTruthy();
    });
  });
});
