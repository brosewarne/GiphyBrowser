import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { act } from "react";

import { useSearchGifs } from "./useSearchGifs";

vi.mock("@tanstack/react-query", async () => {
  const mod = await vi.importActual<typeof import("@tanstack/react-query")>(
    "@tanstack/react-query",
  );
  return {
    ...mod,
    useInfiniteQuery: () => ({
      data: {
        pages: [
          {
            data: [{ id: 1234 }, { id: 5678 }],
            pagination: { total_count: 2, count: 2 },
          },
        ],
      },
    }),
  };
});

describe("useSearchGifs", () => {
  describe("when 'searchTerm' is supplied", () => {
    it("should search gifs based on the searchTerms", async () => {
      const { result } = await act(async () =>
        renderHook(useSearchGifs, {
          initialProps: {
            searchTerm: "hello",
            resetItems: false,
            limit: 9,
            offset: 0,
          },
        }),
      );
      expect(result.current).toEqual({
        data: {
          pages: [
            {
              data: [
                {
                  id: 1234,
                },
                {
                  id: 5678,
                },
              ],
              pagination: {
                count: 2,
                total_count: 2,
              },
            },
          ],
        },
      });
    });
  });
});
