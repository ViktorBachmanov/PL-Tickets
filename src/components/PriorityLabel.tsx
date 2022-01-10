import React from "react";
import Chip from '@mui/material/Chip';

import { Priority } from "../features/tickets/types";


interface Props {
    priority: Priority;
}

export default function PriorityLabel(props: Props) {
    const priority: string = Priority[props.priority];

    let labelColor: "success" | "warning" | "error";
    switch(props.priority) {
        case Priority.LOW:
            labelColor = "success";
            break;
        case Priority.NORMAL:
            labelColor = "warning";
            break;
        case Priority.HIGH:
            labelColor = "error";
            break;
    }

    return (
        <Chip
            label={priority}
            color={labelColor}
        />
    )
}
