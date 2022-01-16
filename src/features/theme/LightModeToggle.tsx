/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';

import toast from 'react-hot-toast';

import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { css } from '@emotion/react'

import { LightStatus } from "./types";
import { setLightStatus as setLightStatusAction} from "./themeSlice";


interface Props {
    lightMode: LightStatus;
    setLightMode: any;
}

function LightModeToggle(props: Props) {    

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextMode: LightStatus) => {
        props.setLightMode(nextMode);

        if(nextMode === LightStatus.LIGHT) {
            toast('Light theme');
        } else {
            toast('Dark theme');
        }
    };

    return (
        <div css={css`
                display: flex;
                align-items: center;
            `}
        >
            <ToggleButtonGroup
                value={props.lightMode}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value={LightStatus.LIGHT}>
                    <LightModeIcon />
                </ToggleButton>

                <ToggleButton value={LightStatus.DARK}>
                    <Brightness4Icon />
                </ToggleButton>
                            
            </ToggleButtonGroup>
        </div>
    )
}


function mapStateToProps(state: RootState) {
    return { 
        lightMode: state.theme.lightStatus,
    };
};

const mapDispatchToProps = {
    setLightMode: setLightStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LightModeToggle);