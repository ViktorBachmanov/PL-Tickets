/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { css } from '@emotion/react';

import { viewRep } from '../../constants';

interface Props {
  view: string;
  setView: ActionCreatorWithPayload<string, string>;
}

export default function ViewToggle(props: Props) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    props.setView(nextView);
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <span
        css={css`
          margin: 0.5rem;
          margin-left: 2rem;
        `}
      >
        View:
      </span>
      <ToggleButtonGroup value={props.view} exclusive onChange={handleChange}>
        <ToggleButton value={viewRep.module} aria-label={viewRep.module}>
          <ViewModuleIcon />
        </ToggleButton>

        <ToggleButton value={viewRep.list} aria-label={viewRep.list}>
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
