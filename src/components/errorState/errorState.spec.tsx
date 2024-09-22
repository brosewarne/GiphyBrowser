import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { ErrorState } from "./errorState";

describe("ErrorState", () => {
  describe("renders the ErrorState component", () => {
    beforeEach(() => {
      render(<ErrorState error={{ message: "message", name: "error" }} />);
    });
    it("should render the component", () => {
      const errorState = screen.getByTestId("error-state");
      expect(errorState.textContent).toEqual("message");
    });
  });
});
