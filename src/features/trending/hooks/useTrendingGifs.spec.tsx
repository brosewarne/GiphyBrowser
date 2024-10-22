import { renderHook, waitFor } from "@testing-library/react";
import { useTrendingGifs } from "./useTrendingGifs";

import { QueryClientWrapper } from "@app/test";

import { mockHttpServer } from "@app/test";

mockHttpServer.listen();

describe("useTrendingGifs", () => {
  it("should search gifs based on the searchTerm", async () => {
    const { result } = renderHook(useTrendingGifs, {
      initialProps: {},
      wrapper: QueryClientWrapper,
    });
    await waitFor(() => expect(result.current?.data).toBeTruthy());
    expect(result.current).toEqual(
      expect.objectContaining({
        data: {
          pageParams: [0],
          pages: [
            {
              data: [
                { id: "1234", uniqueId: "1234" },
                { id: "5678", uniqueId: "5678" },
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
