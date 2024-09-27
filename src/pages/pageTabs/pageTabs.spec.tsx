import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { PageTabs } from "./pageTabs";
import { getMockRouterProvider } from "@app/testUtils";
import { useNavigate } from "@tanstack/react-router";

describe("PageTabs", () => {
  describe("renders the PageTabs component", () => {
    it("should render the PageTabs with 3 tabs", async () => {
      useNavigate()({ to: "/trending" });
      await React.act(async () =>
        render(<PageTabs />, { wrapper: getMockRouterProvider }),
      );
      const trendingTab = screen.getByTestId("trending-tab");
      expect(trendingTab).toBeTruthy();

      const savedTab = screen.getByTestId("trending-tab");
      expect(savedTab).toBeTruthy();

      const searchTab = screen.getByTestId("trending-tab");
      expect(searchTab).toBeTruthy();
    });
  });
});
