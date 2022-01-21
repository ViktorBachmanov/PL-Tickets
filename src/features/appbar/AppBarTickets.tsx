/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../app/store';

import { debounce } from "lodash";

import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import LightModeToggle from '../theme/LightModeToggle';
import { setSearchText as setSearchTextAction } from "./appbarSlice";


function mapStateToProps(state: RootState) {
    return { 
        userAvatarUrl: state.user.avatarUrl,
        userName: state.user.name,
        title: state.appbar.title,
        isSearchDisplay: state.appbar.isSearchDisplay,
    };
}

const mapDispatchToProps = {
    setSearchText: setSearchTextAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>  



function AppBarTickets(props: PropsFromRedux) {
    const userAvatarUrl: string = props.userAvatarUrl as string;
    const userName: string = props.userName as string;

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        props.setSearchText(ev.target.value);
    }

    const debouncedChangeHandler = debounce(handleChange, 400);
  
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
                fontWeight={700}
                css={css`margin-right: auto;`}
            >
                {props.title}
            </Typography>

            {props.isSearchDisplay &&
                <TextField
                    label="Search tickets"
                    variant="outlined"
                    css={css`margin-right: 50px;`}
                    onChange={debouncedChangeHandler}
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


export default connector(AppBarTickets);