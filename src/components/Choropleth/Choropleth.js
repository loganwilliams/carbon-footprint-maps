import React, { Component } from "react";
import ReactMapboxGl, { Source, Layer } from "react-mapbox-gl";

class Choropleth extends Component {
  constructor(props) {
    super(props);
    const Map = ReactMapboxGl({
      accessToken:
        "pk.eyJ1IjoibG9nYW53IiwiYSI6ImNqNTFscTg3ZTA1M3Myd3A5ZnoxMXQ1eHkifQ.rD4GwekG5CArTiMkIuv-gA"
    });

    this.state = {
      map: Map,
      zoom: [9]
    };
  }

  render() {
    const Map = this.state.map;

    let min = 0;
    let range = 30 - min;

    return (
      <Map
        style="mapbox://styles/loganw/cjw2lyxv406gz1cmrmlsm5j3m"
        center={this.props.center}
        zoom={this.state.zoom}
        maxZoom={14}
        minZoom={3}
        key="mainMap"
      >
        <Source
          id="climate"
          key="climate"
          geoJsonSource={{
            type: "vector",
            url: "mapbox://loganw.6l0uhilq"
          }}
        />

        <Layer
          key="data-layer-climate"
          id="data-fill-climate"
          sourceId="climate"
          type="fill"
          sourceLayer="joined2"
          paint={{
            "fill-color": [
              "interpolate",
              ["linear"],
              [
                "/",
                ["get", "Total Household Carbon Footprint (tCO2e/yr)"],
                ["get", "PersonsPerHousehold"]
              ],
              0 * range + min,
              "#440154",
              0.25 * range + min,
              "#3b528b",
              0.5 * range + min,
              "#21918c",
              0.75 * range + min,
              "#5ec962",
              1.0 * range + min,
              "#fde725"
            ],
            "fill-opacity": [
              "case",
              ["has", "Total Household Carbon Footprint (tCO2e/yr)"],
              0.8,
              0.0
            ],
            "fill-outline-color": "rgba(1,1,1,0)"
          }}
          before="hillshade_highlight_bright"
          onClick={this.props.onClick}
          onMouseMove={this.props.onMouseMove}
        />
        <Layer
          key="data-line-climate"
          id="data-line-climate"
          sourceId="climate"
          type="line"
          sourceLayer="joined2"
          filter={["==", ["get", "GEOID10"], this.props.selected]}
          paint={{
            "line-color": "black",
            "line-width": 2,
            "line-opacity": 0.8
          }}
          before="hillshade_highlight_bright"
        />
      </Map>
    );
  }
}

export default Choropleth;
