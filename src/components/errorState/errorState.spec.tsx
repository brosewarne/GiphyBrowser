import * as React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { ErrorState } from "./errorState";

describe("ErrorState", () => {
  describe("renders the ErrorState component", () => {
    it("should render the component", () => {
      render(<ErrorState error={{ message: "message", name: "error" }} />);
      const errorState = screen.getByTestId("error-state");
      expect(errorState.textContent).toEqual("There was an error!");
    });
  });
});
