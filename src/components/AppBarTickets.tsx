/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { connect } from 'react-redux';
import { RootState } from '../app/store';

import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';

import { darken as darkenAction, lighten as lightenAction } from '../features/theme/themeSlice';

interface Props {
    darken: any,
    lighten: any,
    userAvatarUrl: string | null;
    userName: string | null;
}


function AppBarTickets(props: Props) {
    const userAvatarUrl: string = props.userAvatarUrl as string;
    const userName: string = props.userName as string;

  
    return (
        <Box
            css={css`
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            `}
        >
            <Box>
                <IconButton onClick={() => props.lighten()}>
                    <LightModeIcon />
                </IconButton>

                <IconButton onClick={() => props.darken()}>
                    <Brightness4Icon />
                </IconButton>
            </Box>

            <Divider 
                orientation="vertical"
                variant="middle"
                flexItem 
                css={css`margin: 0 20px;`}
            />

            <span css={css`margin: 0 14px;`}>
                {userName}
            </span>

            <Avatar alt={userName.charAt(0)} src={userAvatarUrl}/>

        </Box>
    )
}

function mapStateToProps(state: RootState) {
    return { 
        userAvatarUrl: state.user.avatarUrl,
        userName: state.user.name,
    };
};

const mapDispatchToProps = {
    darken: darkenAction,
    lighten: lightenAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarTickets);