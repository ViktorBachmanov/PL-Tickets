/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';

import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Chip } from '@mui/material';
import { css } from '@emotion/react';

import { Timestamp } from "firebase/firestore";

import { Priority, Mode } from "./types";
import { RoutesPathes, RequestStatus } from "../../constants";
import { RootState } from '../../app/store';


import { saveDocInDatabase as saveDocInDatabaseAction,
        resetRequestStatus as resetRequestStatusAction,
        deleteTicket as deleteTicketAction,
        loadTicketById as loadTicketByIdAction,
     } from './ticketsSlice';
import { ticketsDeletingMessages } from './constants';

import { setTitle as setTitleAction } from "../title/titleSlice";



import { TicketCardData } from "./types";


interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}

interface Props {
    mode: Mode;
    userId: string;
    userName: string | null;
    //currentTickets: Array<currentTicketCardData>;
    saveDocInDatabase: any;
    //resetRequestStatus: any;
    deleteTicket: any;
    currentTicket: TicketCardData;
    //status: Status;
    loadTicketById: any;
    setTitle: any;
    requestStatus: RequestStatus;
};


function TicketForm(props: Props) {
    const { currentTicket, requestStatus } = props;
    let mode = props.mode;

    const { control, handleSubmit, reset } = useForm<IFormInput>({
        defaultValues: {
            title: currentTicket.title,
            description: currentTicket.description,
            priority: currentTicket.priority,
        },
    });
    

    const { id } = useParams();

    useEffect(() => {
        if(id) {
            props.loadTicketById(id)
                .unwrap()
                .then((currentTicket: TicketCardData) => { 
                    props.setTitle(currentTicket.title); 
                    reset({ 
                        title: currentTicket.title, 
                        description: currentTicket.description, 
                        priority: currentTicket.priority 
                    });
                })
            
        }
        else {
            props.setTitle("New ticket");
        }
    }, []);

        
    let isCompleted = props.currentTicket.isCompleted;    
    
    if(props.userId === props.currentTicket.authorId && !isCompleted) {
        mode = Mode.EDIT;
    }    

    const isDisabled = mode === Mode.READ ? true : false;
    

    

    
    const onSubmit: SubmitHandler<IFormInput> = (data, ev) => {
        if(ev) {            
            const myEv = ev.nativeEvent as any;     // avoid ts error 2339 "property 'submitter' does not exist on type 'object'"

            if(myEv.submitter.id === "complete") {
                isCompleted = true;
            }
        }

        const currentTime = Timestamp.now();
        let createdAt, updatedAt;

        if(!currentTicket.createdAt) {
            updatedAt = createdAt = currentTime;
        }
        else {
            createdAt = Timestamp.fromMillis(currentTicket.createdAt);
            updatedAt = currentTime;
        }
        
        props.saveDocInDatabase({
            id: currentTicket.id,
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

    const navigate = useNavigate();

    function handleDeleteTicket() {
        const rslt = props.deleteTicket(props.currentTicket.id).unwrap();
        toast.promise(rslt, ticketsDeletingMessages);
        
        navigate(RoutesPathes.TICKETS, { replace: true});
    }


    if(requestStatus === RequestStatus.LOADING) {
        return <h2>Loading...</h2>;
    } 

        
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
            <div
                css={css`
                    width: 704px;
                `}
            >
                <div
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
                </div>
                
                <Controller
                    name="description"
                    control={control}
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
                                onClick={handleDeleteTicket}
                                css={css`
                                    margin-left: auto;
                                `}
                            >
                                Delete
                            </Button>
                        }
                    </Box>
                }
            </div>

            {isCompleted && <Chip label="Completed" />}
        </form>
    );     
};


function mapStateToProps(state: RootState) {
    return { 
        userId: state.user.id,
        userName: state.user.name,
        //currentTickets: state.currentTickets.list,
        currentTicket: state.tickets.currentTicket,
        //status: state.tickets.status,
        requestStatus: state.tickets.requestStatus,
     };
};

const mapDispatchToProps = {
    saveDocInDatabase: saveDocInDatabaseAction,
    //resetRequestStatus: resetRequestStatusAction,
    deleteTicket: deleteTicketAction,
    loadTicketById: loadTicketByIdAction,
    setTitle: setTitleAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);

