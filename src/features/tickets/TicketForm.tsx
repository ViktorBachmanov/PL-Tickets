import React, { useContext } from "react";
import { connect } from 'react-redux';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Priority, IFormInput } from "./types";

import { saveInDatabase } from './ticketsSlice';

import { FireContext } from "../../index";



function TicketForm(props: any) {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
          title: "Title *",
          priority: Priority.NORMAL,
          description: "",
        },
      });

    const { db } = useContext(FireContext);

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);

        props.saveInDatabase({ db, data });
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


export default connect(null, { saveInDatabase })(TicketForm);