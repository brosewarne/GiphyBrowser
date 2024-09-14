import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)({
  marginTop: "1.25rem" 
})
/**
 *  Show More button for loading more items.
 */
export function ShowMoreButton({ getNextPage }: { getNextPage: () => void }) {
  return (
    <StyledButton
      variant="contained"
      onClick={getNextPage}
      data-testid="show-more-button"
    >
      Show More
    </StyledButton>
  );
}
