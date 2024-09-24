import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GiphyGif } from "@app/models";

import { GifTile } from "./gifTile";

describe("GifTile", () => {
  const mockGifData: GiphyGif = {
    type: "sports",
    id: "1234",
    url: "http://abc.com",
    title: "SomeGif",
    images: {
      original: {
        url: "http://abc.original.com",
      },
      fixed_width: {
        url: "http://abc.width.com",
      },
      fixed_height: {
        url: "http://abc.height.com",
      },
    },
  };

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