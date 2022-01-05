/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { connect } from 'react-redux';
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';

import { darken as darkenAction, lighten as lightenAction } from '../features/theme/themeSlice';

interface Props {
    darken: any,
    lighten: any,
}


function AppBarTickets(props: Props) {
    
    return (
        <AppBar
            position='sticky'
            css={css`
                background: #F7F8FC;
                height: 30px;
            `}
        >
            <IconButton onClick={() => props.lighten()}>
                <LightModeIcon />
            </IconButton>

            <IconButton onClick={() => props.darken()}>
                <Brightness4Icon />
            </IconButton>

        </AppBar>
    )
}

const mapDispatchToProps = {
    darken: darkenAction,
    lighten: lightenAction
};

export default connect(null, mapDispatchToProps)(AppBarTickets);