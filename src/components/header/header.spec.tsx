import * as React from "react";
import { act } from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { vi } from "vitest";

import { Header } from "./header";

import { getMockRouterProvider, getMockSearchProvider } from "@app/testUtils";

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
  const router = getMockRouterProvider({ children });
  return getMockSearchProvider({ children: router });
};

describe("Header", () => {
  beforeEach(async () => {
    await act(async () => render(<Header />, { wrapper: Wrapper }));
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
