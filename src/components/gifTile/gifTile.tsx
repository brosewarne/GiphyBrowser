import React from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

import { GiphyGif } from "../../models";
import { SaveButton } from "../saveButton";

/**
 *  Simple presentational component for showing a loaded Gif in a Card with the title, Gif image and a Save button
 */
export function GifTile({ gifData }: { gifData: GiphyGif }) {
  const gifUrl =
    gifData.images?.fixed_height?.url ?? gifData.images?.fixed_width?.url;

  return (
    <Card
      variant="outlined"
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      data-testid="gif-tile"
    >
      <CardContent key={gifData.id}>
        <Box sx={{ minHeight: "3.75rem" }}>
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
          style={{ width: "12.5rem", height: "9.375rem" }}
        />
      </CardContent>
      <CardActions>
        <SaveButton gifId={gifData.id}></SaveButton>
      </CardActions>
    </Card>
  );
}
