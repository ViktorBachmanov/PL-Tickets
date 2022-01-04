import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RoutesPathes } from "../../constants";



export default function Tickets() {
    const navigate = useNavigate();
    return (
        <Box>
            <Button
                variant="contained" 
                onClick={() => {navigate(RoutesPathes.CREATE)}}
            >
                Create
            </Button>

        </Box>

    )
}