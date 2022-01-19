/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { styled } from '@mui/material/styles';
import { RoutesPathes } from '../constants';


const breakPoint = 1280;
//const breakPoint = 900;

const SideListItemText = styled(ListItemText)`
  @media (max-width: ${breakPoint}px) {
    visibility: hidden;
  }
  color: #a4a6b3;
  margin-left: 24px;
`;

const ResizedBox = styled(Box)`
  width: 255px;
  height: 100vh;
  background: #363740;
  @media (max-width: ${breakPoint}px) {
    width: 70px;
  } ;
`;

const SideListItemButton = styled(ListItemButton)`
  :hover {
    background: #9fa2b414;
  }

  :active {
    background: rgba(255, 255, 255, 0.3);
  }

  &.Mui-selected {
    box-shadow: inset 3px 0 #DDE2FF;
  }

  &.Mui-selected * {
    color: #DDE2FF;
  }
`;

const SideListItemIcon = styled(ListItemIcon)`
  color: #a4a6b3;
  min-width: auto;
  margin-left: 10px;
`;


export default function SideBar() {  

  return (
    <ResizedBox>
      <List component="nav">
        <NavLink to={RoutesPathes.DASHBOARD}>
          {({ isActive }) => (
            <SideListItemButton selected={isActive ? true : false} disableTouchRipple>
              <SideListItemIcon title="Dashboard">
                <PieChartIcon />
              </SideListItemIcon>
              <SideListItemText primary="Dashboard" />
            </SideListItemButton>
          )}
        </NavLink>

        <NavLink to={RoutesPathes.TICKETS}>
          {({ isActive }) => (
            <SideListItemButton selected={isActive ? true : false} disableTouchRipple>
              <SideListItemIcon title="Tickets">
                <ConfirmationNumberIcon />
              </SideListItemIcon>

              <SideListItemText primary="Tickets" />
            </SideListItemButton>
          )}
        </NavLink>
      </List>
    </ResizedBox>
  );
}
