import React from "react";
import {
  ResponsiveScatterPlot,
  ScatterPlotDatum,
  ScatterPlotRawSerie,
} from "@nivo/scatterplot";
import { useAppContext } from "../AppContext";
import { Serie } from "@nivo/line";
import { DBUtil } from "../DBUtil";

type TScatterProps = {
  data: ScatterPlotRawSerie<ScatterPlotDatum>[];
};
const ScatterComponent = (props: TScatterProps) => {
  if (!props.data || !props.data.length) return null;
  return (
    <ResponsiveScatterPlot
      data={props.data}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      yFormat=">-.2f"
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
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
    />
  );
};

export const Scatter = () => {

  return <ScatterComponent data={[]} />;
};
