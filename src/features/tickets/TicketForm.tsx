import React, { useRef } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Priority, Mode, IFormInput } from "./types";
import { RootState } from '../../app/store';

import ticketsSlice, { 
    saveDocInDatabase as saveDocInDatabaseAction,
    //setDocInDatabase as setDocInDatabaseAction,
    TicketCardData,
    getTicketDataById,
    defaultTicketData } from './ticketsSlice';


interface Props {
    mode: Mode;
    userId: string;
    userName: string | null;
    tickets: Array<TicketCardData>;
    saveDocInDatabase: any;
    ticket: TicketCardData;
};


function TicketForm(props: Props) {
    /*let mode = props.mode;
    
    if(props.userId === props.ticket.authorId) {
        mode = 
    }*/

    let isCompleted = props.ticket.isCompleted;
    const formEl = useRef(null);
    
    //const formData: IFormInput = createFormData(props.ticketData);

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            title: props.ticket.title,
            description: props.ticket.description,
            priority: props.ticket.priority,
        },
    });

    
    const onSubmit: SubmitHandler<IFormInput> = (data, ev) => {
        if(ev) {            
            const myEv = ev.nativeEvent as any;     // avoid ts error 2339 "property 'submitter' does not exist on type 'object'"

            if(myEv.submitter.id === "complete") {
                isCompleted = true;
            }
        }

        const currentTime = Timestamp.now();
        let createdAt, updatedAt;

        if(!props.ticket.createdAt) {
            updatedAt = createdAt = currentTime;
        }
        else {
            createdAt = Timestamp.fromMillis(props.ticket.createdAt);
            updatedAt = currentTime;
        }
        
        props.saveDocInDatabase({
            id: props.ticket.id,
            docData: { 
                ...data,
                authorId: props.userId,
                authorName: props.userName,
                createdAt,
                updatedAt,
                isCompleted,
            }
         });
    };

    function handleComplete() {
        isCompleted = true;
        if(formEl.current) {
            //formEl.current.submit();
        }
    }

    return(
        <form 
            ref={formEl}
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
            <Button 
                variant="contained" 
                type="submit"
                id="save"
            >
                Save
            </Button>

            <Button 
                variant="contained" 
                type="submit"
                id="complete"
            >
                Complete
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

const mapDispatchToProps = {
    saveDocInDatabase: saveDocInDatabaseAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);


// helper function
/*
function saveInDatabase(docId: string, addCallback, saveCallback) {
    docId ? saveCallback({docId, data}) : addCallback(data);
}
*/


/*
function createFormData(data: IFormInput | undefined | null): IFormInput {
    const defaultFormData = {
        title: "Title *",
        description: "",
        priority: Priority.NORMAL
    }

    return data ? {...defaultFormData, ...data} : defaultFormData;    
}
*/