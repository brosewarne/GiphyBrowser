import React, { memo } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { GiphyGif } from "../../models";
import { SaveButton } from "../saveButton";

const StyledImage = styled("img")(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(18.75),
}));

/**
 *  Simple presentational component for showing a loaded Gif in a Card with the title,
 *  Gif image and a Save button
 */
export const GifTile = memo(function GifTile({
  gifData,
}: {
  gifData: GiphyGif;
}) {
  const gifUrl =
    gifData.images?.fixed_height?.url ?? gifData.images?.fixed_width?.url;

  const theme = useTheme();

  return (
    <Card variant="outlined" data-testid="gif-tile">
      <CardContent key={gifData.id}>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box minHeight={theme.spacing(7.5)}>
            <Typography
              gutterBottom
              variant="subtitle1"
              data-testid="gif-tile-title"
            >
              {gifData.title}
            </Typography>
          </Box>
          <StyledImage src={gifUrl} alt={gifData.title} />
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="center">
        <CardActions>
          <SaveButton gifId={gifData.id}></SaveButton>
        </CardActions>
      </Box>
    </Card>
  );
});
