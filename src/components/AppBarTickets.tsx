/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { connect } from 'react-redux';
import { RootState } from '../app/store';

import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import LightModeToggle from '../features/theme/LightModeToggle';


interface Props {
    userAvatarUrl: string | null;
    userName: string | null;
    title: string;
    isSearchDisplay: boolean;
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
                margin-bottom: 2rem;
            `}
        >
            <Typography 
                variant="h5" 
                component="div"
                css={css`margin-right: auto;`}
            >
                {props.title}
            </Typography>

            {props.isSearchDisplay &&
                <TextField
                    label="Search tickets"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}                  
                />
            }
            
            <LightModeToggle />

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
        title: state.title.value,
        isSearchDisplay: state.title.isSearchDisplay,
    };
};


export default connect(mapStateToProps)(AppBarTickets);