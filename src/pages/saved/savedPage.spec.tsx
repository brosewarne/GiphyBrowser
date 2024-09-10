import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SavedPage } from "./savedPage";
import { vi } from "vitest";

import { SavedPageContext } from "../../App";

vi.mock("../../hooks/useSavedGifs", async () => {
  const mod = await vi.importActual<typeof import("../../hooks/useSavedGifs")>(
    "../../hooks/useSavedGifs",
  );
  return {
    ...mod,
    useSavedGifs: () => ({
      data: {
        data: [{ id: 1234 }, { id: 5678 }],
      },
      loading: false,
      error: null,
    }),
  };
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SavedPageContext.Provider value={{ savedItemIds: "1234,5678" }}>
      {children}
    </SavedPageContext.Provider>
  );
};

describe("SavedPage", () => {
  describe("renders the SavedPage component", () => {
    beforeEach(() => {
      render(<SavedPage />, { wrapper: Wrapper });
    });
    it("should render the page", () => {
      const gifGrid = screen.getByTestId("gif-grid");
      expect(gifGrid).toBeTruthy();
      const gifTiles = screen.getAllByTestId("gif-tile");
      expect(gifTiles.length).toEqual(2);
    });
  });
});
