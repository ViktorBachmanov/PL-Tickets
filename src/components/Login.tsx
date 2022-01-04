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

import { loginGoogle as loginGoogleAction } from '../features/firebase/firebaseSlice';

/*
interface Props {
    loginGoogle?: typeof loginGoogleAction;
}*/

const mapDispatchToProps = {
    loginGoogle: loginGoogleAction,
};

function Login(props: any) {

    function handleSelectFakeUser() {
        console.log("Fake user selected");
    }

    return (
        /*
        <div className='screen-bounds'>
            <div className='login-dialog'>
                <button type="button" onClick={props.loginGoogle}>Log in</button>
            </div>
        </div>*/

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
                Log in with Google
            </Button>

            <DialogContentText
                css={css`
                    margin: 1rem;
                `}
            >
                or log in as
            </DialogContentText>

            <FormControl 
                css={css`
                    margin-top: 0.5rem;
                `}
            >
              <InputLabel htmlFor="fake-users">Fake users</InputLabel>
              <Select
                onChange={handleSelectFakeUser}
                label="fakeUsers"
                defaultValue="Tom Cruise"
                inputProps={{
                  name: 'fake-users',
                  id: 'fake-users',
                }}
              >
                <MenuItem value={false as any}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="Tom Cruise">Tom Cruise</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    )
}


export default connect(null, mapDispatchToProps)(Login);