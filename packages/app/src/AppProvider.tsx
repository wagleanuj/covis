import React from "react";
import { AppContext } from "./AppContext";
import { TChartType, TChartTypes, TCountryData } from "./static/types";
import featuresCollection from "./static/world_countries.json"
import columns from "./static/columns.json"
import { getCategories } from "./utils";
import { ChartTypes } from "./static/enums";
import { Serie } from "@nivo/line";
const categories = getCategories(columns);
type TAppProviderProps = {
    children: React.ReactNode
}
export const AppProvider = (props: TAppProviderProps) => {
    const [leftCountry, setLeftCountry] = React.useState<string>('USA')
    const [rightCountry, setRightCountry] = React.useState<string>('IND')
    const [chartType, setChartType] = React.useState<TChartTypes>('line')
    const [selectedMetric, setSelectedMetric] = React.useState<string>('total_cases')
    return (
        <AppContext.Provider value={{
            leftCountry,
            rightCountry,
            features: featuresCollection.features,
            onLeftCountryDataChange: setLeftCountry,
            onRightCountryDataChange: setRightCountry,
            columns: columns,
            metricsCategories: categories,
            chartType,
            setChartType,
            selectedMetric,
            onMetricChange: setSelectedMetric,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}