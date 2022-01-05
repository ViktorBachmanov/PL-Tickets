import React, { useContext } from "react";
import { connect } from 'react-redux';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Timestamp } from "firebase/firestore";

import { Priority, Mode, IFormInput } from "./types";
import { RootState } from '../../app/store';

import { saveInDatabase, TicketData } from './ticketsSlice';


interface Props {
    mode: Mode;
    userId: string;
    userName: string | null;
    saveInDatabase: any;
};


function TicketForm(props: Props) {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
          title: "Title *",
          priority: Priority.NORMAL,
          description: "",
        },
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
                defaultValue=""
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
        userName: state.user.name
     };
};

export default connect(mapStateToProps, { saveInDatabase })(TicketForm);