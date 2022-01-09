/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import Box from '@mui/material/Box';
import { css } from '@emotion/react'


export default function Dashboard() {

    console.log('Dashboard');

    return (
        <Box css={css`
            width: 200px;
            height: 200px;
            border: 1px solid blue;
            display: inline-block;
        `}></Box>
    )
}
