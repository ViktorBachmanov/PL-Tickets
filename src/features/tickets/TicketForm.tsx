/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
} from "@mui/material";
import { css } from "@emotion/react";

import { Timestamp } from "firebase/firestore";

import { Priority, Mode } from "./types";
import { RoutesPathes, RequestStatus } from "../../constants";
import { RootState } from "../../app/store";
import Loader from "../../components/Loader";
import DeleteTicketDialog from "../../components/DeleteTicketDialog";

import {
  saveDocInDatabase as saveDocInDatabaseAction,
  deleteTicket as deleteTicketAction,
  loadTicketById as loadTicketByIdAction,
  resetCurrentTicket as resetCurrentTicketAction,
} from "./ticketsSlice";
import {
  ticketsDeletingMessages,
  ticketsSavingMessages,
  ticketsCreatingMessages,
} from "./constants";

import { setTitle as setTitleAction } from "../appbar/appbarSlice";

import { LightStatus } from "../theme/types";

function mapStateToProps(state: RootState) {
  return {
    userId: state.user.id,
    userName: state.user.name,
    currentTicket: state.tickets.currentTicket,
    requestStatus: state.tickets.requestStatus,
    lightMode: state.theme.lightStatus,
  };
}

const mapDispatchToProps = {
  saveDocInDatabase: saveDocInDatabaseAction,
  deleteTicket: deleteTicketAction,
  loadTicketById: loadTicketByIdAction,
  setTitle: setTitleAction,
  resetCurrentTicket: resetCurrentTicketAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  mode: Mode;
};

interface IFormInput {
  title: string;
  priority: Priority;
  description: string;
}

interface NativeEvent extends Event {
  submitter: HTMLElement;
}

function TicketForm(props: Props) {
  const {
    currentTicket,
    requestStatus,
    lightMode,
    setTitle,
    resetCurrentTicket,
  } = props;
  let mode = props.mode;

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      title: currentTicket.title,
      description: currentTicket.description,
      priority: currentTicket.priority,
    },
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTitle(currentTicket.title);
    } else {
      setTitle("New ticket");
    }
  }, [currentTicket, id, setTitle]);

  useEffect(() => {
    return function cleanUnmount() {
      resetCurrentTicket();
    };
  }, [resetCurrentTicket]);

  let isCompleted = currentTicket.isCompleted;

  if (props.userId === currentTicket.authorId && !isCompleted) {
    mode = Mode.EDIT;
  }

  const isDisabled = mode === Mode.READ ? true : false;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data, ev) => {
    if (ev) {
      const myEv = ev.nativeEvent as NativeEvent; // avoid ts error 2339 "property 'submitter' does not exist on type 'object'"

      if (myEv.submitter.id === "complete") {
        isCompleted = true;
      }
    }

    const currentTime = Timestamp.now();
    let createdAt, updatedAt;

    if (!currentTicket.createdAt) {
      updatedAt = createdAt = currentTime;
    } else {
      createdAt = Timestamp.fromMillis(currentTicket.createdAt);
      updatedAt = currentTime;
    }

    const toastSuccessfullyMessage = currentTicket.id
      ? ticketsSavingMessages
      : ticketsCreatingMessages;

    const rslt = props
      .saveDocInDatabase({
        id: currentTicket.id,
        docData: {
          ...data,
          authorId: props.userId,
          authorName: props.userName,
          createdAt,
          updatedAt,
          isCompleted,
        },
      })
      .unwrap();
    toast.promise(rslt, toastSuccessfullyMessage);

    rslt.then((id: string) => {
      navigate(RoutesPathes.TICKETS + "/" + id, { replace: true });
    });
  };

  const onError = () => {
    toast.error("Validating error");
  };

  function handleDeleteTicket() {
    const rslt = props.deleteTicket(props.currentTicket.id).unwrap();
    toast.promise(rslt, ticketsDeletingMessages);

    navigate(RoutesPathes.TICKETS, { replace: true });
  }

  if (requestStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  const background =
    lightMode === LightStatus.LIGHT ? "white" : "rgba(255, 255, 255, 0.08)";

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      css={css`
        margintop: "30px";
        border: 1px solid #dfe0eb;
        border-radius: 8px;
        padding: 32px;
        background: ${background};
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
            rules={{
              required: "Required field",
              maxLength: {
                value: 50,
                message: "Max length is 50 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={error ? true : false}
                label={error ? error.message : "Ticket Title *"}
                disabled={isDisabled}
                variant="outlined"
                css={css`
                  margin-right: 1.5rem;
                  flex: 1 1 auto;
                `}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field, fieldState: { error } }) => (
              <FormControl
                css={css`
                  flex: 1 1 auto;
                `}
              >
                <InputLabel error={error ? true : false}>
                  {error ? error.message : "Select Priority *"}
                </InputLabel>
                <Select
                  error={error ? true : false}
                  label={error ? error.message : "Select Priority *"}
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
          rules={{
            maxLength: {
              value: 100,
              message: "Max length is 100 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={error ? true : false}
              label={error ? error.message : "Description"}
              disabled={isDisabled}
              css={css`
                width: 100%;
                margin: 30px 0;
              `}
            />
          )}
        />

        {isDisabled || (
          <Box
            css={css`
              width: 100%;
              display: flex;
            `}
          >
            <Button variant="contained" type="submit" id="save">
              Save
            </Button>

            <Button
              variant="contained"
              type="submit"
              id="complete"
              color="warning"
              css={css`
                margin-left: 1.5rem;
              `}
            >
              Complete
            </Button>

            {mode !== Mode.NEW && (
              <DeleteTicketDialog handleDelete={handleDeleteTicket} />
            )}
          </Box>
        )}
      </div>

      {isCompleted && <Chip label="Completed" />}
    </form>
  );
}

export default connector(TicketForm);
