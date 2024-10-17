import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { PageTabs } from "./pageTabs";
import { getMockRouterProvider } from "@app/test";

describe("PageTabs", () => {
  describe("renders the PageTabs component", () => {
    it("should render the PageTabs with 3 tabs", async () => {
      await React.act(async () =>
        render(<PageTabs />, { wrapper: getMockRouterProvider }),
      );
      const trendingTab = screen.getByTestId("trending-tab");
      expect(trendingTab).toBeTruthy();

      const savedTab = screen.getByTestId("saved-tab");
      expect(savedTab).toBeTruthy();

      const searchTab = screen.getByTestId("search-tab");
      expect(searchTab).toBeTruthy();
    });
  });
});
