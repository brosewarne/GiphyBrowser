import * as React from "react";
import { act } from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";
import { SearchBar } from "./searchBar";

import {
  getMockRouterProvider,
  getMockSearchProvider,
  mockSetSearchTerm,
} from "@app/test";

const mockedUseNavigate = vi.fn();
vi.mock("@tanstack/react-router", async () => {
  const mod = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = getMockRouterProvider({ children });
  return getMockSearchProvider({ children: router });
};

describe("SearchBar", () => {
  describe("renders the SearchBar component", () => {
    it("should render the searchBar", async () => {
      await act(async () => render(<SearchBar />, { wrapper: Wrapper }));
      const searchBar = screen.getByTestId("search-bar-input");
      expect(searchBar).toBeTruthy();
    });
  });

  describe("search functionality", () => {
    describe("when a user enters a search term and submits the search", () => {
      it("should redirect the user to the search page with the search term set", async () => {
        await act(async () => render(<SearchBar />, { wrapper: Wrapper }));
        const user = userEvent.setup();
        const searchInput = screen
          .getByTestId("search-bar-input")
          .querySelector("input");

        await act(
          async () =>
            await user.type(searchInput as HTMLElement, "search term"),
        );
        await act(async () => user.type(searchInput as HTMLElement, "{Enter}"));
        expect(mockedUseNavigate.mock.calls[0]).toEqual([
          {
            to: "/search",
          },
        ]);
        await waitFor(() =>
          expect(mockSetSearchTerm).toHaveBeenLastCalledWith("search term"),
        );
      });
    });
  });
});
