import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useTrendingGifs } from "./useTrendingGifs";

import axios from "axios";
import { QueryClientWrapper } from "@app/testUtils/mocks/queryClient";
vi.mock("axios");
vi.mock("crypto");

describe("useTrendingGifs", () => {
  it("should search gifs based on the searchTerm", async () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue("a-a-a-a-a");
    vi.spyOn(axios, "get").mockResolvedValue({
      data: {
        data: [{ id: "1234" }, { id: "5678" }],
        pagination: { total_count: 2, count: 2, offset: 0 },
        meta: { response_id: "1234" },
      },
    });

    const { result } = renderHook(useTrendingGifs, {
      initialProps: {},
      wrapper: QueryClientWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current).toEqual(
      expect.objectContaining({
        data: {
          pageParams: [0],
          pages: [
            {
              data: [
                { id: "1234", uniqueId: "a-a-a-a-a" },
                { id: "5678", uniqueId: "a-a-a-a-a" },
              ],
              pagination: { total_count: 2, count: 2, offset: 0 },
              meta: { response_id: "1234" },
            },
          ],
        },
      }),
    );
  });
});
