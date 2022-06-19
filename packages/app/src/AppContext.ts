import React from "react"
import { TAppContext } from "./static/types"

export const AppContext = React.createContext<TAppContext>({
    leftCountry: undefined,
    rightCountry: undefined,
    onLeftCountryDataChange: (data) => { },
    onRightCountryDataChange: (data) => { },
    columns: [],
    features: [],
    metricsCategories: new Map(),
    setChartType: (t)=>{},
    chartType: 'map',
    selectedMetric: '',
    onMetricChange: (m)=>{}
})

export const useAppContext = ()=> React.useContext(AppContext);