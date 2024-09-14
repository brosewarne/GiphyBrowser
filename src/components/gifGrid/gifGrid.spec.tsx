import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GifGrid } from "./gifGrid";
import { GiphyGif } from "../../models";

const getMockGifData = (): GiphyGif[] => {
  const mockGifData = {
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

  return Array.from(Array(9).keys()).map((i) => {
    return { ...mockGifData, id: `${i}` };
  });
};

describe("GifGrid", () => {
  const mockGifData = getMockGifData();
  describe("renders the GifGrid component", () => {
    describe("when loading is false", () => {
      it("should render a GifTile for each item in gifData", () => {
        render(<GifGrid gifData={mockGifData} />);
        const gifTiles = screen.queryAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(9);
      });
    });
  });
});
