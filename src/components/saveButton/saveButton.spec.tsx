import * as React from "react";
import { vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { SavedPageContext } from "../../App";

import { SaveButton } from "./saveButton";

const mockSetSavedItemIds = vi.fn();
const mockedUseGifLocalStorage = vi.fn();
vi.mock("../../hooks/useGifLocalStorage", async () => {
  const mod = await vi.importActual<
    typeof import("../../hooks/useGifLocalStorage")
  >("../../hooks/useGifLocalStorage");
  return {
    ...mod,
    useGifLocalStorage: () => mockedUseGifLocalStorage,
  };
});

const getWrapper = (savedItemIds: string) => {
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <SavedPageContext.Provider
        value={{ savedItemIds, setSavedItemIds: mockSetSavedItemIds }}
      >
        {children}
      </SavedPageContext.Provider>
    );
  };
};

describe("SaveButton", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("renders the SaveButton component", () => {
    it("should render the SaveButton", () => {
      render(<SaveButton gifId="1234" />, { wrapper: getWrapper("") });
      const button = screen.getByTestId("save-button");
      expect(button).toBeTruthy();
    });
  });
  describe("when the SaveButton isClicked", () => {
    describe("when the input gifId is not already saved", () => {
      it("should save the gifId and show the SnackBar", () => {
        render(<SaveButton gifId="1234" />, { wrapper: getWrapper("") });
        const button = screen.getByTestId("save-button");
        fireEvent.click(button);
        const snackbar = screen.getByTestId("save-button-snackbar");
        expect(
          snackbar.querySelector(".MuiSnackbarContent-message")?.textContent,
        ).toEqual("Gif Saved");
      });
    });

    describe("when the input gifId is already saved", () => {
      it("should remove the gifId and show the SnackBar", () => {
        render(<SaveButton gifId="1234" />, { wrapper: getWrapper("1234") });
        const button = screen.getByTestId("save-button");
        fireEvent.click(button);
        const snackbar = screen.getByTestId("save-button-snackbar");
        expect(
          snackbar.querySelector(".MuiSnackbarContent-message")?.textContent,
        ).toEqual("Gif Removed");
      });
    });
  });
});
