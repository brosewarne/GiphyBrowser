import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GifTile } from "./gifTile";
import { mockGifData } from "@app/test";

describe("GifTile", () => {
  describe("renders the GifTile component", () => {
    beforeEach(() => {
      render(<GifTile gifData={mockGifData} />);
    });

    it("should render the title", () => {
      const title = screen.getByTestId("gif-tile-title");
      expect(title.textContent).toEqual("SomeGif");
    });

    it("should render the gif", () => {
      const img = screen.getByRole("img");
      expect(img.getAttribute("src")).toEqual("http://abc.height.com");
    });

    it("should render the save button", () => {
      const saveButton = screen.getByTestId("save-button");
      expect(saveButton).toBeTruthy();
    });
  });
});
