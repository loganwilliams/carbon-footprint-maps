import React, { Component } from "react";
import { stats } from "../../constants/constants";

import "./Legend.scss";

class Legend extends Component {
  render() {
    let layer = this.props.layers
      ? stats[this.props.layers.value]
      : stats["tco2"];

    let min = layer.min;
    let range = layer.max - layer.min;

    if (this.props.layers.norm === "capita") {
      min /= 2.65;
      range /= 2.65;
    }

    const base = layer.base || 1;
    const units = layer.units || "";

    let decimal = 1;
    if (layer.max < 10) {
      decimal = 10;
    }

    return (
      <div id="legend">
        <div className="bar" />
        <div className="labels">
          <div id="min">{Math.round(min * decimal) / decimal}</div>
          <div id="mid">
            {(units === "$" ? "$" : "") +
              Math.round((Math.pow(0.5, base) * range + min) * decimal) /
                decimal +
              (units === "$" ? "" : " " + units)}
          </div>
          <div id="max">{Math.round((min + range) * decimal) / decimal}</div>
        </div>
      </div>
    );
  }
}

export default Legend;
