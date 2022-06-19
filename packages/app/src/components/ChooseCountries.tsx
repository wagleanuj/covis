import React from "react";
import { SelectPicker } from "rsuite";
import { useAppContext } from "../AppContext";
import { TCountryData } from "../static/types";

type TCountriesSelectProps = {
  featuresData: { id: string; name: string, properties: { name: string } }[];
  leftValue?: string;
  rightValue?: string;
  onLeftValueChange: (data: string) => void;
  onRightValueChange: (data: string) => void;
};
const CountriesSelectComponent = (props: TCountriesSelectProps) => {
  return (
    <div className="countries-select">
      <span>Compare{" "}</span>
      <SelectPicker
        data={props.featuresData}
        value={props.leftValue}
        labelKey={"name"}
        valueKey={"id"}
        onChange={props.onLeftValueChange}
        placeholder={"select country"}
      />{" "}
      <span>with{" "}</span>
      <SelectPicker
        data={props.featuresData}
        value={props.rightValue}
        labelKey={"name"}
        valueKey={"id"}
        onChange={props.onRightValueChange}
        placeholder={"select country"}
      />
    </div>
  );
};

export const CountriesSelect = () => {
  const app = useAppContext();
  const features = React.useMemo(()=>{
    return app.features.map(feature=> ({...feature, name: feature.properties.name}))
  }, app.features)

  return (
    <CountriesSelectComponent
      featuresData={features}
      leftValue={app.leftCountry}
      rightValue={app.rightCountry}
      onLeftValueChange={app.onLeftCountryDataChange}
      onRightValueChange={app.onRightCountryDataChange}
    />
  );
};
