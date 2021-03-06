/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { css } from "@emotion/react";

import { ResponsiveBar, BarDatum } from "@nivo/bar";

import { TicketCardData, Priority } from "../features/tickets/types";
import { LightStatus } from "../features/theme/types";

interface Props {
  tickets: Array<TicketCardData>;
  lightStatus: LightStatus;
  period: number;
}

const darkTheme = {
  textColor: "rgb(255, 255, 255)",
};

export default function BarChart(props: Props) {
  const daysTickets: Array<BarDatum> = createBarChartData(props.tickets);

  return (
    <Paper
      css={css`
        margin: 1rem 0;
        border: 1px solid #dfe0eb;
        border-radius: 8px;
      `}
    >
      <Typography
        variant="subtitle1"
        component="div"
        css={css`
          margin: 0.5rem;
        `}
      >
        Uncompleted trends
      </Typography>

      {/*<Typography
        variant="subtitle2"
        component="div"
        color="text.secondary"
        css={css`
          margin: 0.5rem;
        `}
      >
        for last {props.period} days
      </Typography>*/}

      <div style={{ height: "540px" }}>
        <ResponsiveBar
          data={daysTickets}
          keys={["low", "normal", "high"]}
          indexBy="day"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#388e3c", "#f57c00", "#d32f2f"]}
          theme={props.lightStatus === LightStatus.DARK ? darkTheme : {}}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "day",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "tickets",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
        />
      </div>
    </Paper>
  );
}

// helper functions

interface BarChartObj {
  day: string;
  low: number;
  normal: number;
  high: number;
}

function createBarChartData(
  tickets: Array<TicketCardData>,
  completedFlag = false
): Array<BarDatum> {
  const data: Array<BarChartObj> = [];

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].isCompleted !== completedFlag) {
      continue;
    }

    const day = new Date(tickets[i].updatedAt).getDate().toString();
    const obj = data.find((obj) => {
      return obj["day"] === day;
    });
    if (obj) {
      updateBarChartObject(obj, tickets[i].priority);
    } else {
      const barCharObj = createBarChartObj(day);
      updateBarChartObject(barCharObj, tickets[i].priority);
      data.push(barCharObj);
    }
  }

  const unknownData = data as Array<unknown>;

  return unknownData as Array<BarDatum>;
}

function updateBarChartObject(
  barChartObj: BarChartObj,
  priority: Priority
): void {
  switch (priority) {
    case Priority.LOW:
      barChartObj["low"]++;
      break;
    case Priority.NORMAL:
      barChartObj["normal"]++;
      break;
    case Priority.HIGH:
      barChartObj["high"]++;
      break;
  }
}

function createBarChartObj(day: string): BarChartObj {
  return {
    day: day,
    low: 0,
    normal: 0,
    high: 0,
  };
}
