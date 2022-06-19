import React from "react";
import { ResponsiveChoropleth } from '@nivo/geo'
import countries from "../static/world_countries.json";

type TMapProps = {
    data: { id: string, value: number }[]
}

const MapComponent = (props: TMapProps) => {
    return <ResponsiveChoropleth
        data={props.data}
        features={countries.features}
        colors="nivo"
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        domain={[0, 1000000]}
        borderColor="#152538"
        legends={[
            {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#444444",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemTextColor: "#000000",
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}

export const Map = ()=>{
    return (
        <MapComponent data={[]}/>
    )
}
