import * as React from "react";
import { act } from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";

import { Header } from "./header";

import { getMockRouterProvider, getMockSearchProvider } from "@app/test";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = getMockRouterProvider({ children });
  return getMockSearchProvider({ children: router });
};

describe("Header", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the Header component", () => {
    it("should render the trending, saved and search links and the search bar", async () => {
      await act(async () => render(<Header />, { wrapper: Wrapper }));
      const searchBar = screen.queryByTestId("search-bar-input");
      expect(searchBar).toBeTruthy();
    });
  });
});
