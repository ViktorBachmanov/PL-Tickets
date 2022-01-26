/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  date: number; // milliseconds
}

export function DateTickets(props: Props) {
  const fullDate = new Date(props.date);

  const date = fullDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = fullDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Box>
      <Typography variant="subtitle2" component="div">
        {date}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" component="div">
        {time}
      </Typography>
    </Box>
  );
}

export function DateAgoTickets(props: Props) {
  let ago = (Date.now() - props.date) / 1000 / 60 / 60 / 24;
  ago = Math.round(ago);

  let text: string;

  switch (ago) {
    case 0:
      text = "Updated today";
      break;
    case 1:
      text = `Updated 1 day ago`;
      break;
    default:
      text = `Updated ${ago} days ago`;
      break;
  }

  return (
    <Typography variant="subtitle2" color="text.secondary" component="div">
      {text}
    </Typography>
  );
}
