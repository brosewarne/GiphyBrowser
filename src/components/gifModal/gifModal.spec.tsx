import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GifModal } from "./gifModal";
import { GifModalContext } from "@app/providers";
import { vi } from "vitest";
import { GiphyGif } from "@app/models";
import userEvent from "@testing-library/user-event";

const mockGifData: GiphyGif = {
  type: "sports",
  id: "1234",
  url: "http://abc.com",
  title: "SomeGif",
  images: {
    original: {
      url: "http://abc.original.com",
      width: "200px",
      height: "150px",
    },
    fixed_width: {
      url: "http://abc.width.com",
    },
    fixed_height: {
      url: "http://abc.height.com",
    },
  },
};

const mockSetGifData = vi.fn();
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <GifModalContext.Provider
      value={{ gifData: mockGifData, setGifData: mockSetGifData }}
    >
      {children}
    </GifModalContext.Provider>
  );
};

describe("GifModal", () => {
  describe("renders the GifModal component", () => {
    it("should render a modal with an img for the gif", () => {
      render(<GifModal />, { wrapper: Wrapper });
      const img = screen.getByTestId("gif-modal-img");
      expect(img).toBeTruthy();
    });
  });

  describe("when the modal is closed", () => {
    it("should clear the selected gifData", async () => {
      const user = userEvent.setup();
      render(<GifModal />, { wrapper: Wrapper });
      const closeButton = screen.getByTestId("close-button");
      await React.act(async () => user.click(closeButton));
      expect(mockSetGifData).toHaveBeenCalledWith(null);
    });
  });
});
