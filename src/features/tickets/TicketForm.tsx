/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Chip } from '@mui/material';
import { css } from '@emotion/react';

import { Timestamp } from "firebase/firestore";

import { Priority, Mode, Status } from "./types";
import { RootState } from '../../app/store';

import ticketsSlice, { 
    saveDocInDatabase as saveDocInDatabaseAction,
    resetRequestStatus as resetRequestStatusAction,
    deleteTicket as deleteTicketAction,
    getTicketDataById,
    defaultTicketData } from './ticketsSlice';

import { TicketCardData } from "./types";
import { RoutesPathes } from '../../constants';


interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}

interface Props {
    mode: Mode;
    userId: string;
    userName: string | null;
    tickets: Array<TicketCardData>;
    saveDocInDatabase: any;
    resetRequestStatus: any;
    deleteTicket: any;
    ticket: TicketCardData;
    status: Status;
};


function TicketForm(props: Props) {
    //props.resetRequestStatus();
    /*
    useEffect(() => {
        //console.log('TicketForm mounted');
        
    }, [])*/

    let isCompleted = props.ticket.isCompleted;
    let mode = props.mode;
    
    if(props.userId === props.ticket.authorId && !isCompleted) {
        mode = Mode.EDIT;
    }    

    const isDisabled = mode === Mode.READ ? true : false;
    
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

    /*
    if(props.status === Status.DELETED) {
        return <Navigate to={RoutesPathes.TICKETS} replace={true} />;
    }*/

    
    return(
        <form 
            onSubmit={handleSubmit(onSubmit)}
            css={css`
                    marginTop: "30px";
                    border: 1px solid #DFE0EB;
                    border-radius: 8px;
                    padding: 32px;
                `}
        >
            <Box
                css={css`
                    width: 704px;
                `}
            >
                <Box
                    css={css`
                        width: 100%;
                        display: flex;
                    `}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                                <TextField 
                                    {...field}
                                    disabled={isDisabled}
                                    css={css`
                                        margin-right: 1.5rem;
                                        flex: 1 1 auto;
                                    `}
                                />
                            )
                        }
                    />
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                css={css`
                                    flex: 1 1 auto;
                                `}
                            >
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    label="Priority"
                                    {...field}
                                    disabled={isDisabled}                
                                >
                                    <MenuItem value={Priority.LOW}>Low</MenuItem>
                                    <MenuItem value={Priority.NORMAL}>Normal</MenuItem>
                                    <MenuItem value={Priority.HIGH}>High</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField 
                                                {...field} 
                                                disabled={isDisabled}
                                                css={css`
                                                    width: 100%;
                                                    margin: 30px 0;
                                                `}
                                            />}
                />
                
                {isDisabled ||
                    <Box
                        css={css`
                            width: 100%;
                            display: flex;
                        `}
                    >
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
                            css={css`
                                margin-left: 1.5rem;
                            `}
                        >
                            Complete
                        </Button>

                        {mode !== Mode.NEW &&
                            <Button 
                                variant="contained"
                                onClick={() => {props.deleteTicket(props.ticket.id)}}
                                css={css`
                                    margin-left: auto;
                                `}
                            >
                                Delete
                            </Button>
                        }
                    </Box>
                }
            </Box>

            {isCompleted && <Chip label="Completed" />}
        </form>
    );     
};


function mapStateToProps(state: RootState) {
    return { 
        userId: state.user.id,
        userName: state.user.name,
        tickets: state.tickets.list,
        ticket: state.tickets.currentTicket,
        status: state.tickets.status,
     };
};

const mapDispatchToProps = {
    saveDocInDatabase: saveDocInDatabaseAction,
    resetRequestStatus: resetRequestStatusAction,
    deleteTicket: deleteTicketAction,
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