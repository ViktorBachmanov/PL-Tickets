import React from "react";
import Chip from '@mui/material/Chip';

import { Priority } from "../features/tickets/types";


interface Props {
    priority: Priority;
}

export default function PriorityLabel(props: Props) {
    //const priority: string = Priority[props.priority];
    let priority: string;

    let labelColor: "success" | "warning" | "error";
    switch(props.priority) {
        case Priority.LOW:
            labelColor = "success";
            priority = "LOW";
            break;
        case Priority.NORMAL:
                     default:
            labelColor = "warning";
            priority = "NORMAL";
            break;
        case Priority.HIGH:
            labelColor = "error";
            priority = "HIGH";
            break;   
    }

    return (
        <Chip
            label={priority}
            color={labelColor}
            size="small"
        />
    )
}
