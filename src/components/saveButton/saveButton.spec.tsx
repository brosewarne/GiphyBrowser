import * as React from "react";
import { vi } from "vitest";
import { act } from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { SaveButton } from "./saveButton";
import { SavedContext } from "@app/providers";

vi.mock("../../utils/savedItemsDB", async () => {
  const mod = await vi.importActual<typeof import("../../utils/savedItemsDB")>(
    "../../utils/savedItemsDB",
  );
  return {
    ...mod,
    db: {
      savedGifs: {
        add: async () => {},
        delete: async () => {},
      },
    },
  };
});

vi.mock("dexie-react-hooks");

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SavedContext.Provider
      value={{
        savedGifsState: { savedGifs: ["1234", "5678"], savedGifsLoaded: true },
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
        const user = userEvent.setup();
        render(<SaveButton gifId="1111" />, { wrapper: Wrapper });
        const button = screen.getByTestId("save-button");
        await act(async () => await user.click(button));

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
        const user = userEvent.setup();
        render(<SaveButton gifId="1234" />, { wrapper: Wrapper });
        const button = screen.getByTestId("save-button");
        await act(async () => await user.click(button));
        const snackbar = screen.getByTestId("save-button-snackbar");
        expect(
          snackbar.querySelector(".MuiSnackbarContent-message")?.textContent,
        ).toEqual("Gif Removed");
      });
    });
  });
});
