import React from "react";
import { Col, Row, SelectPicker, TreePicker, TreePickerProps } from "rsuite";
import { useAppContext } from "../AppContext";
import { TCountryData } from "../static/types";
import { Charts } from "./Charts";
import { CountriesSelect } from "./ChooseCountries";

import { MetricsTree } from "./MetricsTree";

export const Explorer = () => {
  return (
    <>
      <Row className="show-grid">
        <Col xsHidden xs={8}>
          <CountriesSelect />
          <MetricsTree></MetricsTree>
        </Col>
        <Col xs={16} style={{height: '100vh'}}>
          <Charts/>
        </Col>
      </Row>
    </>
  );
};
