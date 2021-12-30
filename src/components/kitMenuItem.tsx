import React from 'react';


interface Props {
    icon: any;
    text: string;
}

export default function KitMenuItem(props: Props) {
    return (
        <li className='kit__menu-item'>
            {props.icon}
            <span>{props.text}</span>
        </li>
    )
}