import React, { Component } from "react";
import * as d3 from "d3";
import { stats } from "../../constants/constants";
import "./ZipCode.scss";

class Value extends Component {
  render() {
    const { zip, value } = this.props;

    const normalizedValue =
      (zip[value] - stats[value].min) / (stats[value].max - stats[value].min);

    return (
      <div
        className={"value" + (normalizedValue > 0.5 ? " black" : " white")}
        style={{ backgroundColor: d3.interpolateViridis(normalizedValue) }}
      >
        {Math.round(zip[value])}
      </div>
    );
  }
}

class FootprintComponents extends Component {
  render() {
    const { zip } = this.props;

    return (
      <div className="components">
        <div className="component">
          <div className="title">H</div>
          <Value value="Housing (tCO2e/yr)" zip={zip} />
        </div>

        <div className="component">
          <div className="title">T</div>
          <Value value="Transport (tCO2e/yr)" zip={zip} />
        </div>

        <div className="component">
          <div className="title">F</div>
          <Value value="Food (tCO2e/yr)" zip={zip} />
        </div>

        <div className="component">
          <div className="title">G</div>

          <Value value="Goods (tCO2e/yr)" zip={zip} />
        </div>

        <div className="component">
          <div className="title">S</div>
          <Value value="Services (tCO2e/yr)" zip={zip} />
        </div>
      </div>
    );
  }
}

class ZipCode extends Component {
  render() {
    const { zip, preview } = this.props;

    return (
      <div
        className={"zip" + (preview ? " preview" : "")}
        onClick={this.props.onClick}
      >
        <div className="img">
          <img
            src={`http://localhost:51830/${
              zip.GEOID10 ? zip.GEOID10 : zip.ZipCode
            }.jpg`}
          />
        </div>
        <div className="stats">
          {/* {statsToShow.map(stat => (
            <div className="stat" key={zip.ZipCode + stat}>{`${stat}: ${
              zip[stat]
            }`}</div>
          ))} */}
          <div className="name">
            {zip.City +
              ", " +
              zip.State +
              " " +
              (zip.GEOID10 ? zip.GEOID10 : zip.ZipCode)}
          </div>
          <div className="total">
            <Value
              zip={zip}
              value={"Total Household Carbon Footprint (tCO2e/yr)"}
            />
          </div>
          <FootprintComponents zip={zip} />
        </div>
      </div>
    );
  }
}

export default ZipCode;
