/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { SvgIconProps } from "@mui/material/SvgIcon";


export const breakPoint = 1280;

const SideListItemText = styled(ListItemText)`
  @media (max-width: ${breakPoint}px) {
    visibility: hidden;
  }
  color: #a4a6b3;
  margin-left: 24px;
  
  & * {
    font-family: 'Mulish', sans-serif;
  }
`;

const SideListItemButton = styled(ListItemButton)`
  :hover {
    background: #9fa2b414;
  }

  :active {
    background: rgba(255, 255, 255, 0.3);
  }

  &.Mui-selected {
    box-shadow: inset 3px 0 #DDE2FF;
  }

  &.Mui-selected * {
    color: #DDE2FF;
  }
`;

const SideListItemIcon = styled(ListItemIcon)`
  color: #a4a6b3;
  min-width: auto;
  margin-left: 8px;
`;


interface Props {
    to: string;
    text: string;
    icon: React.ReactElement<SvgIconProps>;
}


export default function NavListItemButton(props: Props): React.ReactElement {
    const { to, text, icon } = props;

    return (
        <NavLink to={to}>
          {({ isActive }) => (
            <SideListItemButton selected={isActive ? true : false} disableTouchRipple>
              <SideListItemIcon title={text}>
                {icon}
              </SideListItemIcon>
              <SideListItemText primary={text} />
            </SideListItemButton>
          )}
        </NavLink>
    )
}