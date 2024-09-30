import { renderHook, waitFor } from "@testing-library/react";
import { useSavedGifs } from "./useSavedGifs";
import { vi } from "vitest";
import axios from "axios";

import { QueryClientWrapper } from "@app/testUtils/mocks/queryClient";
vi.mock("axios");
vi.mock("crypto");

describe("useSavedGifs", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('a-a-a-a-a')
  })
  describe("when gifIds are provided", () => {
    it("should call Giphy for the saved gifs", async () => {
      vi.spyOn(axios, "get").mockResolvedValue({
        data: {
          data: [{ id: "1234" }, { id: "5678" }],
          pagination: { total_count: 2, count: 2 },
          meta: { response_id: "1234" },
        },
      });

      const { result } = renderHook(useSavedGifs, {
        initialProps: { gifIds: ["1234", "5678"] },
        wrapper: QueryClientWrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current).toEqual(
        expect.objectContaining({
          data: {
            pageParams: [0],
            pages: [
              {
                data: [{ id: "1234", uniqueId: 'a-a-a-a-a' }, { id: "5678",uniqueId: 'a-a-a-a-a' }],
                pagination: { total_count: 2, count: 2, offset: 0 },
                meta: { response_id: "1234" },
              },
            ],
          },
        }),
      );
    });
  });
  describe("when gifIds are not provided", () => {
    test("should return default data", async () => {
      const { result } = renderHook(useSavedGifs, {
        initialProps: { gifIds: [] },
        wrapper: QueryClientWrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current).toEqual(
        expect.objectContaining({
          data: {
            pageParams: [0],
            pages: [
              {
                data: [],
                pagination: { total_count: 0, count: 0, offset: 0 },
                meta: { response_id: "-1" },
              },
            ],
          },
        }),
      );
    });
  });
});
