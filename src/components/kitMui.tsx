/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { css } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import { styled } from '@mui/material/styles';
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

const KitListItemButton = styled(ListItemButton)`
  :hover {
    background: #9fa2b414;
  }
`;

const KitListItemText = styled(ListItemText)`
  color: #A4A6B3;
`;

const KitListItemIcon = styled(ListItemIcon)`
  color: #A4A6B3;
`;

export default function KitMui() {
    return (
    
        <Box css={css`
            width: 255px;
            height: 100vh; 
            display: inline-block; 
            background: #363740;
        `}>
            <List component="nav">
                <KitListItemButton>
                    <KitListItemIcon>
                        <PieChartIcon/>
                    </KitListItemIcon>

                    <KitListItemText primary="Dashboard" />


                </KitListItemButton>
                
            </List>
        </Box>
    )
}
