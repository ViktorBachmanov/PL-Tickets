/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import PieChartIcon from "@mui/icons-material/PieChart";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { RoutesPathes } from "../constants";
import { ReactComponent as Logo } from "../logo.svg";
import { css } from "@emotion/react";

import NavListItemButton, { breakPoint } from "./NavListItemButton";

const ResizedBox = styled(Box)`
  width: 255px;
  min-width: 255px;
  height: 100vh;
  background: #363740;
  @media (max-width: ${breakPoint}px) {
    width: 70px;
    min-width: 70px;
  } ;
`;

export default function SideBar() {
  return (
    <ResizedBox>
      <List component="nav">
        <ListItem
          disablePadding
          css={css`
            height: 70px;
            justify-content: center;
            margin-bottom: 1.5rem;
          `}
        >
          <SvgIcon
            component={Logo}
            viewBox="0 0 32 32"
            css={css`
              font-size: 32px;
            `}
          />
          <span
            css={css`
              font-family: "Mulish", sans-serif;
              font-weight: bold;
              font-size: 19px;
              color: #a4a6b3;
              flex: 0 0 auto;
              margin-left: 24px;

              @media (max-width: ${breakPoint}px) {
                display: none;
              }
            `}
          >
            Dashboard Kit
          </span>
        </ListItem>

        <NavListItemButton
          to={RoutesPathes.DASHBOARD}
          text="Dashboard"
          icon={<PieChartIcon />}
        />

        <NavListItemButton
          to={RoutesPathes.TICKETS}
          text="Tickets"
          icon={<ConfirmationNumberIcon />}
        />
      </List>
    </ResizedBox>
  );
}
