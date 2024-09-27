import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { SavedPage } from "./savedPage";
import { vi } from "vitest";
import { useSavedGifs } from "./hooks";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { PagedQueryResult } from "@app/models";

vi.mock("./hooks/useSavedGifs");

vi.mock('dexie-react-hooks')
const dexie = await import("dexie-react-hooks");
dexie.useLiveQuery = vi.fn().mockReturnValue([["1234", "5678"], true]);

describe("SavedPage", () => {
  describe("renders the SavedPage component", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    describe("when there are saved gifs", () => {
      it("should render the page", () => {
        vi.mocked(useSavedGifs).mockReturnValue({
          data: {
            pages: [
              {
                data: [{ id: "1234" }, { id: "5678" }],
                pagination: { total_count: 2, count: 2 },
                meta: { response_id: "1234" },
              },
            ],
          },
          status: "success",
          error: null,
        } as unknown as UseInfiniteQueryResult<PagedQueryResult>);
        render(<SavedPage />);
        const gifGrid = screen.getByTestId("gif-grid");
        expect(gifGrid).toBeTruthy();
        const gifTiles = screen.getAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(2);
      });
    });
  });
});
