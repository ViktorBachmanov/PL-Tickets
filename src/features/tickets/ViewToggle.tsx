import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { viewRep } from "./types";


interface Props {
    view: string;
    setView: any;
}

export default function ViewToggle(props: Props) {
    

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        props.setView(nextView);
    };

    return (
        <ToggleButtonGroup
            value={props.view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value={viewRep.module} aria-label={viewRep.module}>
                <ViewModuleIcon />
            </ToggleButton>

            <ToggleButton value={viewRep.list} aria-label={viewRep.list}>
                <ViewListIcon />
            </ToggleButton>
                        
        </ToggleButtonGroup>
    )
}