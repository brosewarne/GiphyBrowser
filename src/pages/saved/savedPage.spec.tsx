import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SavedPage } from "./savedPage";
import { vi } from "vitest";
import { useSavedGifs } from "../../hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { GiphyResponse } from "../../models";

vi.mock("../../hooks/useSavedGifs");
vi.mock("dexie-react-hooks", async () => {
  const mod =
    await vi.importActual<typeof import("dexie-react-hooks")>(
      "dexie-react-hooks",
    );
  return {
    ...mod,
    useLiveQuery: () => ["1234", "5678"],
  };
});

describe("SavedPage", () => {
  describe("renders the SavedPage component", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    describe("when there are saved gifs", () => {
      it("should render the page", () => {
        vi.mocked(useSavedGifs).mockReturnValue({
          data: {
            data: [{ id: "1234" }, { id: "5678" }],
            pagination: { total_count: 2, count: 2 },
          },
          status: "success",
          error: null,
        } as UseQueryResult<GiphyResponse>);
        render(<SavedPage />);
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
      });
    });
  });
});
