/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { css } from '@emotion/react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';


export default function KitMui() {
    return (
        <Box css={css`
            width: 300px;
            background: #363740;
            height: 100vh;   
        `}>
            <List component="nav">
                <ListItemButton>
                    <ListItemIcon>
                        <PieChartIcon/>
                    </ListItemIcon>

                    <ListItemText primary="Dashboard"/>


                </ListItemButton>
                
            </List>
        </Box>
    )
}
