/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { css } from '@emotion/react';


interface Props {
  title: string;
  value: number;
  total?: number;
}

export default function Sheet(props: Props) {
  const { title, value, total } = props;

  let totalElem;
  if (total) {
    const percent = (value / total) * 100;
    totalElem = (
      <Typography
        variant="subtitle2"
        component="div"
        css={css`
          margin-left: 0.5rem;
        `}
      >
        {`${Math.round(percent)}%`}
      </Typography>
    );
  }

  return (
    <Card
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 1 auto;
        border: 1px solid #dfe0eb;
        border-radius: 8px;
        margin: 0.25rem;
        padding: 1rem;
        box-shadow: none;
      `}
    >
      <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
      >
          {title}
      </Typography>

      <Box
        css={css`
          display: flex;
          align-items: flex-end;
        `}
      >
        <Typography
          variant="h5"
          component="div"
        >
          {value}
        </Typography>

        {totalElem}
      </Box>
    </Card>
  );
}
