import * as React from "react";
import { vi } from "vitest";
import { act } from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { SaveButton } from "./saveButton";

vi.mock("../../utils/savedItemsDB");
vi.mock("../../utils/savedItemsDB", async () => {
  const mod = await vi.importActual<
    typeof import("../../utils/savedItemsDB.js")
  >("../../utils/savedItemsDB");
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

vi.mock("dexie-react-hooks", async () => {
  const mod =
    await vi.importActual<typeof import("dexie-react-hooks")>(
      "dexie-react-hooks",
    );
  return {
    ...mod,
    useLiveQuery: () => [{ giphyId: "1234" }, { giphyId: "5678" }],
  };
});

describe("SaveButton", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("renders the SaveButton component", () => {
    it("should render the SaveButton", () => {
      render(<SaveButton gifId="1234" />);
      const button = screen.getByTestId("save-button");
      expect(button).toBeTruthy();
    });
  });

  describe("when the SaveButton isClicked", () => {
    describe("when the input gifId is not already saved", () => {
      it("should save the gifId and show the SnackBar", async () => {
        const user = userEvent.setup();
        render(<SaveButton gifId="1111" />);
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
        const user = userEvent.setup();
        render(<SaveButton gifId="1234" />);
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
