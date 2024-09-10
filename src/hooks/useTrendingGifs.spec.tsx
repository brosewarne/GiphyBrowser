import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { act } from "react";

import { useTrendingGifs } from "./useTrendingGifs";
import { TrendingItemsContext, TrendingPaginationContext } from "../App";

vi.mock("./useNetwork", async () => {
  const mod =
    await vi.importActual<typeof import("./useNetwork")>("./useNetwork");
  return {
    ...mod,
    useNetwork: () => ({
      data: {
        data: [{ id: 1234 }, { id: 5678 }],
        pagination: { total_count: 2, count: 2, offset: 0 },
      },
      loading: false,
      error: null,
    }),
  };
});

const mockSetTrendingItems = vi.fn();
const mockSetTrendingPagination = vi.fn();
const getWrapper = (trendingItems: { id: number }[]) => {
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <TrendingItemsContext.Provider
        value={{ trendingItems, setTrendingItems: mockSetTrendingItems }}
      >
        <TrendingPaginationContext.Provider
          value={{
            trendingPagination: {},
            setTrendingPagination: mockSetTrendingPagination,
          }}
        >
          {children}
        </TrendingPaginationContext.Provider>
      </TrendingItemsContext.Provider>
    );
  };
};

describe("useTrendingGifs", () => {
  describe("when 'reset' is true", () => {
    it("should get the trending gifs and set them as the only trending items", async () => {
      const { result } = await act(async () =>
        renderHook(useTrendingGifs, {
          initialProps: {
            resetItems: true,
            limit: 9,
            offset: 0,
          },
          wrapper: getWrapper([{ id: 1111 }, { id: 2222 }]),
        }),
      );
      expect(result.current).toEqual({
        loading: false,
        error: null,
      });
      expect(mockSetTrendingItems).toHaveBeenCalledWith([
        { id: 1234 },
        { id: 5678 },
      ]);
      expect(mockSetTrendingPagination).toHaveBeenCalledWith({
        total_count: 2,
        count: 2,
        offset: 0,
      });
    });
  });

  describe("when 'reset' is false", () => {
    it("should get the trending gifs and add them to the existing trending items", async () => {
      const { result } = await act(async () =>
        renderHook(useTrendingGifs, {
          initialProps: {
            resetItems: false,
            limit: 9,
            offset: 0,
          },
          wrapper: getWrapper([{ id: 1111 }, { id: 2222 }]),
        }),
      );
      expect(result.current).toEqual({
        loading: false,
        error: null,
      });
      expect(mockSetTrendingItems).toHaveBeenCalledWith([
        { id: 1111 },
        { id: 2222 },
        { id: 1234 },
        { id: 5678 },
      ]);
    });
  });
});
