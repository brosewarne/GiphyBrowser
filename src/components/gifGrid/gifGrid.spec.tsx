import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GifGrid } from "./gifGrid";
import { GiphyBrowserConfig } from "@app/config";
import { getMockGifData } from "@app/test";

describe("GifGrid", () => {
  const mockGifData = getMockGifData(9);
  describe("renders the GifGrid component", () => {
    describe("when loading is false", () => {
      it("should render a GifTile for each item in gifData", () => {
        render(<GifGrid gifData={mockGifData} />);
        const gifTiles = screen.queryAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(GiphyBrowserConfig.numberOfItems);
      });
    });
  });
});
