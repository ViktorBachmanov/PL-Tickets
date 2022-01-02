import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { Priority } from "../constants";


interface IFormInput {
    title: string;
    priority: Priority;
    description: string;    
}


export default function TicketForm() {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
          title: "Title *",
          priority: Priority.NORMAL,
          description: "",
        },
      });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
    };

    return(
        <form style={{marginTop: "30px"}}>
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