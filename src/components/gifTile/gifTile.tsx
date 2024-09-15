import React, { memo } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

import { GiphyGif } from "../../models";
import { SaveButton } from "../saveButton";

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
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
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
      </Box>
    </Card>
  );
});
