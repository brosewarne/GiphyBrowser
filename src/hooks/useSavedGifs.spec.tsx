import { renderHook } from "@testing-library/react";
import { useSavedGifs } from "./useSavedGifs";
import { vi } from "vitest";

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

describe("useSavedGifs", () => {
  it("should call Giphy for the saved gifs", () => {
    const { result } = renderHook(useSavedGifs, {
      initialProps: { gifIds: ["1234", "5678"] },
    });
    expect(result.current).toEqual({
      data: {
        data: [{ id: 1234 }, { id: 5678 }],
        pagination: { total_count: 2, count: 2, offset: 0 },
      },
      loading: false,
      error: null,
    });
  });
});
