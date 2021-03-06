/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";

import { RootState } from "../../app/store";
import { TicketCardData } from "./types";
import PriorityLabel from "../../components/PriorityLabel";
import DeleteTicketIcon from "../../components/DeleteTicketIcon";
import { getAvatarUrlByUserId } from "../user/utils";
import { DateTickets, DateAgoTickets } from "../../components/DateTickets";
import { LightStatus } from "../theme/types";

interface Props {
  ticket: TicketCardData;
  setCurrentTicketById: ActionCreatorWithPayload<string, string>;
}

export default function TicketCard(props: Props) {
  const { ticket } = props;
  const userId = useSelector((state: RootState) => state.user.id);
  const lightMode = useSelector((state: RootState) => state.theme.lightStatus);

  const authorName = ticket.authorName as string;
  const authorId = ticket.authorId;

  const isDeleteAvailable = authorId === userId && !ticket.isCompleted;

  const completedBackground =
    lightMode === LightStatus.LIGHT
      ? "background: #EBFFE6;"
      : "background: #004d40;";

  const navigate = useNavigate();

  function handleClick() {
    props.setCurrentTicketById(ticket.id);
    navigate(ticket.id);
  }

  return (
    <Grid item xs={1}>
      <Card
        onClick={handleClick}
        css={css`
          padding: 1rem;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
          ${ticket.isCompleted && completedBackground}
        `}
      >
        <Box
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1em;
          `}
        >
          <DateTickets date={ticket.updatedAt} />
          <PriorityLabel priority={ticket.priority} />
          {isDeleteAvailable && <DeleteTicketIcon ticketId={ticket.id} />}
        </Box>

        <div>{ticket.title}</div>

        <DateAgoTickets date={ticket.updatedAt} />

        <Box
          css={css`
            display: flex;
            align-items: center;
            margin-top: auto;
          `}
        >
          <Avatar
            alt={authorName.charAt(0)}
            src={getAvatarUrlByUserId(ticket.authorId)}
            css={css`
              margin: 15px 22px;
            `}
          />

          <div>{ticket.authorName}</div>
        </Box>
      </Card>
    </Grid>
  );
}
