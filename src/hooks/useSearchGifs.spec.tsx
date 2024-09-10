import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { act } from "react";

import { SearchPaginationContext, SearchItemsContext } from "../App";
import { useSearchGifs } from "./useSearchGifs";
import { GiphyGif } from "../models";

vi.mock("./useNetwork", async () => {
  const mod =
    await vi.importActual<typeof import("./useNetwork")>("./useNetwork");
  return {
    ...mod,
    useNetwork: () => ({
      data: {
        data: [{ id: "1234" }, { id: "5678" }],
        pagination: { total_count: 2, count: 2, offset: 0 },
      },
      loading: false,
      error: null,
    }),
  };
});

const mockSetSearchItems = vi.fn();
const mockSetSearchPagination = vi.fn();
const getWrapper = (searchItems: GiphyGif[]) => {
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <SearchItemsContext.Provider
        value={{ searchItems, setSearchItems: mockSetSearchItems }}
      >
        <SearchPaginationContext.Provider
          value={{
            searchPagination: { total_count: 0, count: 0, offset: 0 },
            setSearchPagination: mockSetSearchPagination,
          }}
        >
          {children}
        </SearchPaginationContext.Provider>
      </SearchItemsContext.Provider>
    );
  };
};

describe("useSearchGifs", () => {
  describe("when 'searchTerm' is supplied", () => {
    describe("when 'reset' is true", () => {
      it("should search gifs based on the searchTerm and set them as the only searchItems", async () => {
        const { result } = await act(async () =>
          renderHook(useSearchGifs, {
            initialProps: {
              searchTerm: "hello",
              resetItems: true,
              limit: 9,
              offset: 0,
            },
            wrapper: getWrapper([{ id: "1111" }, { id: "2222" }] as GiphyGif[]),
          }),
        );
        expect(result.current).toEqual({
          loading: false,
          error: null,
        });
        expect(mockSetSearchItems).toHaveBeenCalledWith([
          { id: "1234" },
          { id: "5678" },
        ]);
        expect(mockSetSearchPagination).toHaveBeenCalledWith({
          total_count: 2,
          count: 2,
          offset: 0,
        });
      });
    });

    describe("when 'reset' is false", () => {
      it("should search gifs based on the searchTerm and add them to the searchItems", async () => {
        const { result } = await act(async () =>
          renderHook(useSearchGifs, {
            initialProps: {
              searchTerm: "hello",
              resetItems: false,
              limit: 9,
              offset: 0,
            },
            wrapper: getWrapper([{ id: "1111" }, { id: "2222" }] as GiphyGif[]),
          }),
        );
        expect(result.current).toEqual({
          loading: false,
          error: null,
        });
        expect(mockSetSearchItems).toHaveBeenCalledWith([
          { id: "1111" },
          { id: "2222" },
          { id: "1234" },
          { id: "5678" },
        ]);
      });
    });
  });
});
