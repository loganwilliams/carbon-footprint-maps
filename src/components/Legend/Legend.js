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

    return (
      <div id="legend">
        <div class="bar" />
        <div class="labels">
          <div id="min">{Math.round(min)}</div>
          <div id="mid">
            {(units === "$" ? "$" : "") +
              Math.round(Math.pow(0.5, base) * range + min) +
              (units === "$" ? "" : " " + units)}
          </div>
          <div id="max">{Math.round(min + range)}</div>
        </div>
      </div>
    );
  }
}

export default Legend;
