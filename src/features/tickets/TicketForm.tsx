import React, { useContext, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Priority, Mode, IFormInput } from "./types";
import { RootState } from '../../app/store';

import { saveInDatabase, TicketCardData, getTicketDataById, defaultTicketData } from './ticketsSlice';


interface Props {
    mode: Mode;
    userId: string;
    userName: string | null;
    tickets: Array<TicketCardData>;
    saveInDatabase: any;
};


function TicketForm(props: Props) {
    let ticketId: string | undefined;
    if(props.mode === Mode.EDIT) {
        const { id } = useParams();
        if(id) {
            ticketId = id;
        }
    }
    let ticketData: TicketCardData | undefined | null;
    useEffect(() => {           
        if(ticketId) {
            ticketData = getTicketDataById(props.tickets, ticketId);
        }

        if(!ticketData) {
            ticketData = defaultTicketData();
        }

        return function cleanup() {
            ticketData = null;
        }
    }, []);

    const formData: IFormInput = createFormData(ticketData);

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: formData,
    });


    const onSubmit: SubmitHandler<IFormInput> = data => {
        //console.log(data);

        const currentTime = Timestamp.now();
        let createdAt, updatedAt;

        switch(props.mode) {
            case(Mode.NEW):
                updatedAt = createdAt = currentTime;
                break;
        }

        props.saveInDatabase({ 
            ...data,
            authorId: props.userId,
            authorName: props.userName,
            createdAt,
            updatedAt,
            isCompleted: false
         });
    };

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)}
            style={{marginTop: "30px"}}
        >
            <Controller
                name="title"
                control={control}
                render={({ field }) => <TextField {...field} />}
            />
            <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                    <FormControl size="small">
                      <InputLabel>Priority</InputLabel>
                      <Select label="Priority" {...field}>
                        <MenuItem value={Priority.LOW}>Low</MenuItem>
                        <MenuItem value={Priority.NORMAL}>Normal</MenuItem>
                        <MenuItem value={Priority.HIGH}>High</MenuItem>
                      </Select>
                    </FormControl>
                  )}
            />
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} />}
            />
            <Button variant="contained" type="submit">
                Save
            </Button>
        </form>
    );     
};


function mapStateToProps(state: RootState) {
    return { 
        userId: state.user.id,
        userName: state.user.name,
        tickets: state.tickets.list,
     };
};

export default connect(mapStateToProps, { saveInDatabase })(TicketForm);


// helper function

function createFormData(data: IFormInput | undefined | null): IFormInput {
    const defaultFormData = {
        title: "Title *",
        description: "",
        priority: Priority.NORMAL
    }

    return data ? {...defaultFormData, ...data} : defaultFormData;    
}
