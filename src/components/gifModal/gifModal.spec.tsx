import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { GifModal } from "./gifModal";
import { mockGifData } from "@app/test";

describe("GifModal", () => {
  describe("renders the GifModal component", () => {
    it("should render a modal with an img for the gif", () => {
      render(
        <GifModal open={true} handleClose={() => {}} gifData={mockGifData} />,
      );
      const img = screen.getByTestId("gif-modal-img");
      expect(img).toBeTruthy();
    });
  });
});
