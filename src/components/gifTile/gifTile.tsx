import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import { GiphyGif } from "../../models";
import { SaveButton } from "../saveButton";

const StyledCard = styled(Card)({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
});


/**
 *  Simple presentational component for showing a loaded Gif in a Card with the title,
 *  Gif image and a Save button
 */
export function GifTile({ gifData }: { gifData: GiphyGif }) {
  const gifUrl =
    gifData.images?.fixed_height?.url ?? gifData.images?.fixed_width?.url;

  const theme = useTheme()
  return (
    <StyledCard variant="outlined" data-testid="gif-tile">
      <CardContent key={gifData.id}>
        <Box minHeight={theme.spacing(7.5)}>
          <Typography
            gutterBottom
            variant="subtitle1"
            data-testid="gif-tile-title"
          >
            {gifData.title}
          </Typography>
        </Box>

        <img
          src={gifUrl}
          alt={gifData.title}
          width={theme.spacing(25)}
          height={theme.spacing(18.75)}
        />
      </CardContent>
      <CardActions>
        <SaveButton gifId={gifData.id}></SaveButton>
      </CardActions>
    </StyledCard>
  );
}
