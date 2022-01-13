/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */


import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/react'


import { ResponsiveBar, BarDatum } from '@nivo/bar';

import { TicketCardData, Priority } from "../features/tickets/types";



interface Props {
    tickets: Array<TicketCardData>;
}


export default function BarChart(props: Props) {
    const daysTickets: Array<BarDatum> = createBarChartData(props.tickets);

    return (
        <Box css={css`
                    height: 546px;
                    margin-top: 1rem;
                    border: 1px solid #DFE0EB;
                    border-radius: 8px;
                `}>
            <Typography 
                variant="subtitle1" 
                component="div"
            >
                Uncompleted trends
            </Typography>

            <ResponsiveBar
                data={daysTickets}
                keys={[ "low", "normal", "high" ]}
                indexBy="day"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'day',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'tickets',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
            />

        </Box>

    )
}


// helper functions

interface BarChartObj {
    "day": string;
    "low": number;
    "lowColor": string;
    "normal": number;
    "normalColor": string;
    "high": number;
    "highColor": string;
}

function createBarChartData(tickets: Array<TicketCardData>, completedFlag = false): Array<BarDatum> {
    const data: Array<BarChartObj> = [];

    for(let i = 0; i < tickets.length; i++) {
        if(tickets[i].isCompleted !== completedFlag) {
            continue;
        }

        const day = (new Date(tickets[i].updatedAt)).getDate().toString();
        const obj = data.find(obj => {
            return obj["day"] === day;
        });
        if(obj) {
            updateBarChartObject(obj, tickets[i].priority)
        }
        else {
            const barCharObj = createBarChartObj(day);
            updateBarChartObject(barCharObj, tickets[i].priority);
            data.push(barCharObj);
        }
    }

    const unknownData = data as Array<unknown>;

    return unknownData as Array<BarDatum> ;
}


function updateBarChartObject(barChartObj: BarChartObj, priority: Priority): void {
    switch(priority) {
        case(Priority.LOW):
            barChartObj["low"]++;
            break;
        case(Priority.NORMAL):
            barChartObj["normal"]++;
            break;
        case(Priority.HIGH):
            barChartObj["high"]++;
            break;        
    }
}

function createBarChartObj(day: string): BarChartObj {
    return {
        "day": day,
        "low": 0,
        "lowColor": "hsl(182, 70%, 50%)",
        "normal": 0,
        "normalColor": "hsl(17, 70%, 50%)",
        "high": 0,
        "highColor": "hsl(247, 70%, 50%)",
    }
}