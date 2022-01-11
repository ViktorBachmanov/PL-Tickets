/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import { css } from '@emotion/react';

import { setTitle as setTitleAction } from "../features/title/titleSlice";


interface Props {
    setTitle: any;
}


function Dashboard(props: Props) {

    //console.log('Dashboard');

    useEffect(() => {
        props.setTitle("Dashboard");
    }, []);

    return (
        <Box css={css`
            width: 200px;
            height: 200px;
            border: 1px solid blue;
            display: inline-block;
        `}></Box>
    )
}


const mapDispatchToProps = {
    setTitle: setTitleAction,
};

export default connect(null, mapDispatchToProps)(Dashboard);
