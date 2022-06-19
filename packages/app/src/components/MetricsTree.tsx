import React from "react";
import { Panel, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import PlaceholderParagraph from "rsuite/esm/Placeholder/PlaceholderParagraph";
import { useAppContext } from "../AppContext";
import { TColumn } from "../static/types";
import { toTitleCase } from "../utils";

type TMetricsTreeProps = {
  categories: Map<string, { column: string; children: TColumn[] }>;
  selected: string;
  setSelected: (s: string) => void;
};
const MetricsTreeComponent = (props: TMetricsTreeProps) => {
  const setSel = React.useCallback(
    (data: ItemDataType<string | number>, value: string | number, e: any) => {
      props.setSelected(value.toString());
    },
    [props.setSelected]
  );
  return (
    <Tree
      className="metrics-tree"
      data={Array.from(props.categories.values())}
      labelKey={"column"}
      valueKey={"column"}
      height={-1}
      style={{ maxHeight: "100vh" }}
      onSelect={setSel}
      value={props.selected}
      defaultExpandItemValues={['Confirmed cases']}
      renderTreeNode={(data) => {
        return (
          <Panel
            header={toTitleCase(data.column, "_")}
            style={{ width: "100%" }}
          >
            <span>{data.description}</span>
          </Panel>
        );
      }}
    />
  );
};

export const MetricsTree = () => {
  const app = useAppContext();
  return (
    <MetricsTreeComponent
      categories={app.metricsCategories}
      selected={app.selectedMetric}
      setSelected={app.onMetricChange}
    />
  );
};
