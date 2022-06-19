import { SelectPicker } from "rsuite";
import { TChartType, TChartTypes } from "../static/types";
import React from "react";
import { ChartTypes } from "../static/enums";
import { useAppContext } from "../AppContext";
import { Map } from "./Map";
import { BarChart } from "./Bar";
import { Line } from "./Line";
import { Scatter } from "./Scatter";

type TChartsProps = {
  selectedChartType: TChartTypes;
  onSelectedChartType: (chartType: TChartTypes) => void;
  renderChart: (chartType: TChartTypes) => void;
};

const ChartsComponent = (props: TChartsProps) => {
  return (
    <div style={{ height: "100vh" }}>
      <div className={"chart-select"}>
        <SelectPicker
          data={ChartTypes}
          valueKey={"id"}
          labelKey={"name"}
          value={props.selectedChartType}
          onChange={(d) => {
            props.onSelectedChartType(d);
          }}
          //@ts-ignore
          disabledItemValues={['scatter', 'bar', 'map']}

        />
      </div>

      <div style={{ height: "inherit" }}>
        {renderChart(props.selectedChartType)}
      </div>
    </div>
  );
};

export const renderChart = (chartType: TChartTypes) => {
  switch (chartType) {
    case "map":
      return <Map />;
    case "bar":
      return <BarChart />;
    case "scatter":
      return <Scatter />;
    case "line":
      return <Line />;
  }
};

export const Charts = () => {
  const app = useAppContext();
  return (
    <ChartsComponent
      selectedChartType={app.chartType}
      onSelectedChartType={app.setChartType}
      renderChart={renderChart}
    />
  );
};
