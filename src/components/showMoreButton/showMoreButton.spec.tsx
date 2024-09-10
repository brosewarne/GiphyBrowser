import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { ShowMoreButton } from "./showMoreButton";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const mockGetNextPage = vi.fn();

describe("ShowMoreButton", () => {
  beforeEach(() => {
    render(<ShowMoreButton getNextPage={mockGetNextPage} />);
  });
  describe("renders the ShowMoreButton component", () => {
    it("should render the button", () => {
      const button = screen.getByTestId("show-more-button");
      expect(button).toBeTruthy();
    });
  });
  describe("when clicking the button", () => {
    it("should call 'getNextPage()", async () => {
      const user = userEvent.setup();
      const button = screen.getByTestId("show-more-button");
      await act(async () => await user.click(button));
      expect(mockGetNextPage).toHaveBeenCalled();
    });
  });
});
