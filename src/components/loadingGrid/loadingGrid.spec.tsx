import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { LoadingGrid } from "./loadingGrid";
import { GiphyBrowserConfig } from "@app/config";

describe("LoadingGrid", () => {
  describe("renders LoadingGrid component", () => {
    it("should render a LoadingGrid with 9 skeletons", () => {
      render(<LoadingGrid />);
      const skeletons = screen.queryAllByTestId("loading-skeleton");
      expect(skeletons.length).toEqual(GiphyBrowserConfig.numberOfItems);
    });
  });
});
