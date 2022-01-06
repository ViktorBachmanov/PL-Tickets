/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { css } from '@emotion/react';
import { NavLink } from "react-router-dom";
//import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
    //const matches = useMediaQuery('(min-width:600px)');
    //const theme = useTheme();
    //const matches = useMediaQuery(theme.breakpoints.down('sm'));
    // [${theme.breakpoints.down('sm')}]: {
    /*
    const SideListItemText = styled(ListItemText)(
      ({ theme }) => `
      ${theme.breakpoints.down('sm')} {
        display: none;
      };
      color: #A4A6B3;
    `,
    );*/

    const SideListItemText = styled(ListItemText)`
       color: #A4A6B3;
    `;


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
