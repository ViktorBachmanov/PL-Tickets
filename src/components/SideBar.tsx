/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { css } from '@emotion/react';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { styled } from '@mui/material/styles';
import { RoutesPathes } from "../constants";


const SideListItemButton = styled(ListItemButton)`
  :hover {
    background: #9fa2b414;
  }
`;



const SideListItemIcon = styled(ListItemIcon)`
  color: #A4A6B3;
`;

export default function SideBar() {
   
    const breakPoint = 1280;
    
    const SideListItemText = styled(ListItemText)(
       `@media (max-width: ${breakPoint}px) {
          display: none;
        };
        color: #A4A6B3;
      `,
    );

    const ResizedBox = styled(Box)(
      ({ theme }) => `
          width: 255px;
          height: 100vh; 
          background: #363740;
          @media (max-width: ${breakPoint}px) {
            width: 54px;
          };
      `,
    )
   

    return (
     
        <ResizedBox>
            <List component="nav">
              <NavLink to={RoutesPathes.DASHBOARD}>
              {({ isActive }) => (
                <SideListItemButton selected={isActive ? true : false}>
                    <SideListItemIcon
                      title="Dashboard"
                    >
                        <PieChartIcon/>
                    </SideListItemIcon>

                    <SideListItemText primary="Dashboard" />


                </SideListItemButton>)
              }
              </NavLink>

              <NavLink to={RoutesPathes.TICKETS}>
              {({ isActive }) => (
                <SideListItemButton selected={isActive ? true : false}>
                    <SideListItemIcon
                      title="Tickets"
                    >
                        <ConfirmationNumberIcon/>
                    </SideListItemIcon>

                    <SideListItemText primary="Tickets" />


                </SideListItemButton>)
              }
              </NavLink>
                
            </List>
        </ResizedBox>
    )
}
