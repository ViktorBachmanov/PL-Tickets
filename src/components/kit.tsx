import React from 'react';
import KitMenuItem from './kitMenuItem';
import { ReactComponent as DashboardIcon } from '../icons/dashboard.svg';



export default function Kit() {
    return (
        <nav className='kit'>
            <div className='kit__title'></div>

            <ul className='kit__menu'>
                <KitMenuItem icon={<DashboardIcon />} text="Dashboard" />

            </ul>
        </nav>
    )
}