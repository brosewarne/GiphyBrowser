import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { SavedPageContext } from "../../App";

import { GifGrid } from "./gifGrid";
import { GiphyGif } from "../../models";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SavedPageContext.Provider value={{ savedItemIds: "" }}>
      {children}
    </SavedPageContext.Provider>
  );
};

const getMockGifData = (): GiphyGif[]  => {
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
        render(<GifGrid gifData={mockGifData} loading={false} />, {
          wrapper: Wrapper,
        });
        const gifTiles = screen.queryAllByTestId("gif-tile");
        expect(gifTiles.length).toEqual(9);
      });
    });

    describe("when loading is true", () => {
      describe("when there are already loaded gifs - eg loading the next 'page'", () => {
        it("should render the GifTiles and then the loading grid", () => {
          render(<GifGrid gifData={mockGifData} loading={true} />, {
            wrapper: Wrapper,
          });
          const gifTiles = screen.queryAllByTestId("gif-tile");
          expect(gifTiles.length).toEqual(9);
          const loadingGrid = screen.queryByTestId("loading-grid");
          expect(loadingGrid).toBeTruthy();
        });
      });

      describe("when there are no gifs already loaded - eg initial page load", () => {
        it("should render the loading grid and no GifTiles", () => {
          render(<GifGrid gifData={[]} loading={true} />, {
            wrapper: Wrapper,
          });
          const gifTiles = screen.queryAllByTestId("gif-tile");
          expect(gifTiles.length).toEqual(0);
          const loadingGrid = screen.queryByTestId("loading-grid");
          expect(loadingGrid).toBeTruthy();
        });
      });
    });
  });
});
