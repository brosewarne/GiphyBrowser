import { renderHook } from "@testing-library/react";
import { useGifLocalStorage } from "./useGifLocalStorage";

const mockLocalStorage = (() => {
  let store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useGifLocalStorage", () => {
  describe("when 'save' is true", () => {
    it("should add the 'gifId' to localStorage", () => {
      const { result } = renderHook(useGifLocalStorage, {
        initialProps: { gifId: "1234", save: true, savedItemIds: "" },
      });
      expect(result.current).toEqual("1234");
      expect(mockLocalStorage.getItem("savedItemIds")).toEqual("1234");
    });
  });
});
