import React, { Component } from "react";
import * as d3 from "d3";
import Choropleth from "./components/Choropleth/Choropleth";
import ZipCode from "./components/ZipCode/ZipCode";
import Controls from "./components/Controls/Controls";
import LayerControl from "./components/Controls/LayerControl";
import "./App.css";
import ComparisonZips from "./components/ComparisonZips/ComparisonZips";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcodes: [],
      targetIncome: 12000,
      hovered: null,
      selected: null,
      center: [-74, 40.7],
      mapLayer: { norm: "household", value: "tco2" },
      comparison: [
        { value: "income", dir: "similar" },
        { value: "popden", dir: "similar" },
        { value: "tco2", dir: "similar" }
      ]
    };
  }

  componentDidMount() {
    d3.csv("/jones-kammen.csv").then(zipcodes => this.setState({ zipcodes }));
  }

  select(e) {
    this.setState({
      selected: e.features[0].properties,
      center: [
        e.features[0].properties.Longitude,
        e.features[0].properties.Latitude
      ]
    });
  }

  hover(e) {
    this.setState({
      hovered: e.features[0].properties
    });
  }

  onChange(selection) {
    this.setState({ mapLayer: { ...this.state.mapLayer, ...selection } });
  }

  render() {
    return (
      <div className="App">
        <Choropleth
          onClick={this.select.bind(this)}
          center={this.state.center}
          selected={
            this.state.selected
              ? this.state.selected.GEOID10
                ? this.state.selected.GEOID10
                : this.state.selected.ZipCode
              : ""
          }
          layers={this.state.mapLayer}
          // onMouseMove={this.hover.bind(this)}
        />
        {this.state.selected ? (
          <div className="right">
            <div className="preview">
              <ZipCode preview={true} zip={this.state.selected} />
            </div>
            <Controls />
            <ComparisonZips
              zipcodes={this.state.zipcodes}
              targetZip={this.state.selected}
              onClick={zip => {
                this.select({ features: [{ properties: zip }] });
              }}
            />
          </div>
        ) : null}
        <LayerControl
          onChange={this.onChange.bind(this)}
          mapLayer={this.state.mapLayer}
        />
      </div>
    );
  }
}

export default App;
