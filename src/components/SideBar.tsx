/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { css } from '@emotion/react';
import { NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { styled } from '@mui/material/styles';
import { RoutesPathes } from "../constants";
/*
const kitTheme = createTheme({
    palette: {
      primary: {
          main: "#e51c1c",
          light: "#e51c1c",
      },
      background: {
          default: "#363740"
      }
    },
  });*/


const SideListItemButton = styled(ListItemButton)`
  :hover {
    background: #9fa2b414;
  }
`;

const SideListItemText = styled(ListItemText)`
  color: #A4A6B3;
`;

const SideListItemIcon = styled(ListItemIcon)`
  color: #A4A6B3;
`;

export default function SideBar() {
    return (
    
        <Box css={css`
            width: 255px;
            height: 100vh; 
            display: inline-block; 
            background: #363740;
        `}>
            <List component="nav">
              <NavLink to={RoutesPathes.DASHBOARD}>
              {({ isActive }) => (
                <SideListItemButton selected={isActive ? true : false}>
                    <SideListItemIcon>
                        <PieChartIcon/>
                    </SideListItemIcon>

                    <SideListItemText primary="Dashboard" />


                </SideListItemButton>)
              }
              </NavLink>

              <NavLink to={RoutesPathes.TICKETS}>
              {({ isActive }) => (
                <SideListItemButton selected={isActive ? true : false}>
                    <SideListItemIcon>
                        <ConfirmationNumberIcon/>
                    </SideListItemIcon>

                    <SideListItemText primary="Tickets" />


                </SideListItemButton>)
              }
              </NavLink>
                
            </List>
        </Box>
    )
}
