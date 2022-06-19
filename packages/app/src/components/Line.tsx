import { ResponsiveLine, Serie, Line as L } from "@nivo/line";
import React from "react";
import { useAppContext } from "../AppContext";
import { DBUtil } from "../DBUtil";

type TLineProps = {
  data: Serie[];
};
const LineComponent = (props: TLineProps) => {
  if (!props.data.length) return null;
  return (
    <ResponsiveLine
      data={props.data}
      margin={{ top: 0, right: 110, bottom: 70, left: 60 }}
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
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisLeft={{
        legend: "Count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      axisBottom={{
        format: "%Y-%m-%d",
        tickRotation: -45,
        legend: "Day",
        legendOffset: 40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "spectral" }}
      pointSize={1}
      pointColor={{ theme: "background" }}
      pointBorderWidth={0}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export const Line = () => {
  const app = useAppContext();
  const [lineData, setLineData] = React.useState<Serie[]>([]);

  React.useEffect(() => {
    //run query here
    if (!app.leftCountry || !app.rightCountry || !app.selectedMetric)
      setLineData([]);
    else
      DBUtil.fetchLineData(
        app.leftCountry as string,
        app.rightCountry as string,
        app.selectedMetric
      ).then((res) => {
        const transformRows = (rows): Serie[] => {
          const results = {};
          for (let row of rows) {
            if (!results[row.iso_code])
              results[row.iso_code] = {
                id: row.iso_code,
                data: [{ x: row.date, y: row[app.selectedMetric] }],
              };
            else
              results[row.iso_code].data.push({
                x: row.date,
                y: row[app.selectedMetric],
              });
          }
          return Array.from(Object.values(results));
        };

        setLineData(transformRows(res));
      });
    return () => {};
  }, [app.chartType, app.leftCountry, app.rightCountry, app.selectedMetric]);

  return <LineComponent data={lineData} />;
};
