import { renderHook } from "@testing-library/react";
import { useSavedGifs } from "./useSavedGifs";
import { vi } from "vitest";

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

describe("useSavedGifs", () => {
  it("should call Giphy for the saved gifs", () => {
    const { result } = renderHook(useSavedGifs, {
      initialProps: { gifIds: ["1234", "5678"] },
    });
    expect(result.current).toEqual({
      data: {
        pages: [
          {
            data: [{ id: 1234 }, { id: 5678 }],
            pagination: { total_count: 2, count: 2 },
          },
        ],
      },
    });
  });
});
