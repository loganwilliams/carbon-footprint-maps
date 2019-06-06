import React, { Component } from "react";
import ReactMapboxGl, { Source, Layer } from "react-mapbox-gl";
import { stats } from "../../constants/constants";

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
    let layer = this.props.layers
      ? stats[this.props.layers.value]
      : stats["tco2"];

    const Map = this.state.map;

    let min = layer.min;
    let max = layer.max;

    let valueStyle;

    if (
      this.props.layers.value.slice(this.props.layers.value.length - 7) ===
      "_income"
    ) {
      valueStyle = [
        "-",
        ["get", layer.id],
        ["*", ["get", "IncomePerHousehold"], layer.incomeCoefficient]
      ];
    } else {
      valueStyle = ["get", layer.id];
    }

    if (this.props.layers.norm === "capita") {
      valueStyle = ["/", valueStyle, ["get", "PersonsPerHousehold"]];
      min /= 2.65;
      max /= 2.65;
    }

    let range = max - min;
    const base = layer.base || 1;

    return (
      <Map
        // eslint-disable-next-line
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
          filter={["has", layer.id]}
          paint={{
            "fill-color": [
              "interpolate",
              ["linear"],
              valueStyle,
              Math.pow(0, base) * range + min,
              "#440154",
              Math.pow(0.25, base) * range + min,
              "#3b528b",
              Math.pow(0.5, base) * range + min,
              "#21918c",
              Math.pow(0.75, base) * range + min,
              "#5ec962",
              Math.pow(1.0, base) * range + min,
              "#fde725"
            ],
            "fill-opacity": 0.8,
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
        />
      </Map>
    );
  }
}

export default Choropleth;
