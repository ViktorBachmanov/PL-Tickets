import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
    handleDelete: () => void
}

export default function DeleteTicketDialog(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    function handleDelete() {
        props.handleDelete();
        handleClose();
    }

    return (
        <div style={{marginLeft: "auto"}}>
            <Button 
                variant="contained" 
                color="error"
                
                onClick={handleClickOpen}
            >
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete ticket?"}
                </DialogTitle>
                
                <DialogActions style={{justifyContent: "center"}}>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}