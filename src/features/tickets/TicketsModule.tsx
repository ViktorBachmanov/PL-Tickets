import React from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

import { TicketCardData } from "./types";
import TicketCard from "./TicketCard";

interface Props {
  tickets: Array<TicketCardData>;
  setCurrentTicketById: ActionCreatorWithPayload<string, string>;
}

export default function TicketsModule(props: Props) {
  let totalColumns: number;
  const theme = useTheme();

  if (useMediaQuery(theme.breakpoints.down("xl"))) {
    totalColumns = 3;
  } else {
    totalColumns = 4;
  }

  const tikckets = props.tickets.map((ticket: TicketCardData) => (
    <TicketCard
      key={ticket.id}
      ticket={ticket}
      setCurrentTicketById={props.setCurrentTicketById}
    />
  ));

  return (
    <Grid
      container
      columns={totalColumns}
      spacing={1}
      style={{ padding: "30px" }}
    >
      {tikckets}
    </Grid>
  );
}
