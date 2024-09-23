import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { act } from "react";

import { useTrendingGifs } from "./useTrendingGifs";

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

describe("useTrendingGifs", () => {
  it("should get the trending gifs", async () => {
    const { result } = await act(async () =>
      renderHook(useTrendingGifs, {
        initialProps: { currentPage: 0 },
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
