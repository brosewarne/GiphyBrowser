import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
}));
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
