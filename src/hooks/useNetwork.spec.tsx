import { renderHook } from "@testing-library/react";
import { useNetwork } from "./useNetwork";

import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
import { act } from "react";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const mockResponse = {
  data: [{ id: 1234 }, { id: 5678 }],
  pagination: { total_count: 2, offset: 0, count: 2 },
};
describe("useNetwork", () => {
  beforeEach(() => {
    fetchMocker.mockResponse(JSON.stringify(mockResponse));
  });
  describe("when 'url' is provided", () => {
    describe("when there are no errors", () => {
      it("should make the network request and return the result", async () => {
        const { result } = await act(async () =>
          renderHook(useNetwork, {
            initialProps: { url: "http://test.com" },
          }),
        );
        expect(result.current).toEqual({
          data: {
            data: [{ id: 1234 }, { id: 5678 }],
            pagination: { total_count: 2, offset: 0, count: 2 },
          },
          error: null,
          loading: false,
        });
      });
    });

    describe("when there is an error during the request", () => {
      beforeEach(() => {
        fetchMocker.mockRejectOnce(new Error("401 rejected"));
      });
      it("should make the network request and return the error", async () => {
        const { result } = await act(async () =>
          renderHook(useNetwork, {
            initialProps: { url: "http://test.com" },
          }),
        );

        expect(result.current).toEqual(
          expect.objectContaining({
            data: {
              data: [],
              pagination: { total_count: 0, offset: 0, count: 0 },
            },
            loading: false,
          }),
        ),
          expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe("when a url is not provided", () => {
    it("should not attempt to make a request and just return the empty data", async () => {
      const { result } = await act(async () =>
        renderHook(useNetwork, {
          initialProps: { url: "" },
        }),
      );
      expect(result.current).toEqual({
        data: {
          data: [],
          pagination: { total_count: 0, offset: 0, count: 0 },
        },
        error: null,
        loading: false,
      });
    });
  });
});
