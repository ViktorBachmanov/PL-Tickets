/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { loginGoogle as loginGoogleAction, set, userData } from '../features/user/userSlice';
import { usersData } from "../fakeUsers/data";




function Login(props: any) {

    function handleSelectFakeUser(ev: any) {
        const user = usersData.find(user => {
            return user.id === ev.target.value;
        })
        
        props.setUser(user);
    }

    const fakeUsers = usersData.map(user => {
        return <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
    });

    return (
        
        <Dialog
           maxWidth={false}
            open={true}
        >
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>          
          <Box
            noValidate
            component="form"
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <Button 
                variant="contained"
                onClick={props.loginGoogle}
            >
                with Google
            </Button>

            <DialogContentText
                css={css`
                    margin: 1rem;
                    text-align: center;
                    line-height: 200%;
                `}
            >
                OR
            </DialogContentText>

            <FormControl 
                css={css`
                    margin-top: 0.5rem;
                    width: 200px;
                `}
            >
              <InputLabel htmlFor="fake-users">Fake users</InputLabel>
              <Select
                onChange={handleSelectFakeUser}
                label="fakeUsers"
                defaultValue=""
                inputProps={{
                  name: 'fake-users',
                  id: 'fake-users',
                }}
              >
                {fakeUsers}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    )
}


const mapDispatchToProps = {
    loginGoogle: loginGoogleAction,
    setUser: set
};

export default connect(null, mapDispatchToProps)(Login);