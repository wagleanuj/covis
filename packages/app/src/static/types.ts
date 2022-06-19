export type TCountryData = {id: string, properties: {name: string}};
export type TFeature = {type: string, id: string, properties: {name: string}, geometry: {type: string, coordinates: number[][][]| number[][][][]}}
export type TColumn = {column: string, source: string, category: string, description: string}
export type TChartTypes = 'map'|'bar'|'scatter'|'line';
export type TChartType = {
    id: TChartTypes
    name: string;
}
export type TAppContext = {
    onLeftCountryDataChange: (data: string)=>void;
    onRightCountryDataChange: (data: string)=>void;
    leftCountry?: string;
    rightCountry?: string;
    features: TFeature[];
    columns: TColumn[];
    metricsCategories: Map<string, {column: string, children: TColumn[]}>
    setChartType: (type: TChartTypes)=>void;
    chartType: TChartTypes;
    selectedMetric: string;
    onMetricChange: (m: string)=>void;
}
