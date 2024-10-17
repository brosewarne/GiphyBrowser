import * as React from "react";
import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { SaveButton } from "./saveButton";
import { SavedContext } from "@app/app/providers";
import { UseMutationResult } from "@tanstack/react-query";

vi.mock("../../utils/savedItemsDB", async () => {
  const mod = await vi.importActual<typeof import("../../utils/savedItemsDB")>(
    "../../utils/savedItemsDB",
  );
  return {
    ...mod,
    savedItemsdb: {
      savedGifs: {
        add: async () => {},
        delete: async () => {},
      },
    },
  };
});

vi.mock("dexie-react-hooks");

const mockAddSavedGif = { mutate: vi.fn() } as unknown as UseMutationResult<
  number,
  Error,
  string,
  unknown
>;
const mockRemoveSavedGif = { mutate: vi.fn() } as unknown as UseMutationResult<
  void,
  Error,
  number,
  unknown
>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SavedContext.Provider
      value={{
        savedGifsState: {
          savedGifs: [
            { giphyId: "1234", id: 0 },
            { giphyId: "5678", id: 1 },
          ],
          savedGifsLoaded: true,
          addSavedGif: mockAddSavedGif,
          removeSavedGif: mockRemoveSavedGif,
        },
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

describe("SaveButton", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the SaveButton component", () => {
    it("should render the SaveButton", async () => {
      const dexie = await import("dexie-react-hooks");
      dexie.useLiveQuery = vi.fn().mockReturnValue([["1234", "5678"], true]);
      render(<SaveButton gifId="1234" />, { wrapper: Wrapper });
      const button = screen.getByTestId("save-button");
      expect(button).toBeTruthy();
    });
  });

  describe("when the SaveButton isClicked", () => {
    describe("when the input gifId is not already saved", () => {
      it("should save the gifId and show the SnackBar", async () => {
        const dexie = await import("dexie-react-hooks");
        dexie.useLiveQuery = vi.fn().mockReturnValue([["1234", "5678"], true]);
        render(<SaveButton gifId="1111" />, { wrapper: Wrapper });
        const button = screen.getByTestId("save-button");
        fireEvent.animationEnd(button);
        const snackbar = screen.getByTestId("save-button-snackbar");
        expect(
          snackbar.querySelector(".MuiSnackbarContent-message")?.textContent,
        ).toEqual("Gif Saved");
      });
    });

    describe("when the input gifId is already saved", () => {
      it("should remove the gifId and show the SnackBar", async () => {
        const dexie = await import("dexie-react-hooks");
        dexie.useLiveQuery = vi.fn().mockReturnValue([["1234", "5678"], true]);
        render(<SaveButton gifId="1234" />, { wrapper: Wrapper });
        const button = screen.getByTestId("save-button");
        fireEvent.animationEnd(button);
        const snackbar = screen.getByTestId("save-button-snackbar");
        expect(
          snackbar.querySelector(".MuiSnackbarContent-message")?.textContent,
        ).toEqual("Gif Removed");
      });
    });
  });
});
