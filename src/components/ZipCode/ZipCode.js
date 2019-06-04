import React, { Component } from "react";
import * as d3 from "d3";
import { stats } from "../../constants/constants";
import "./ZipCode.scss";

class Value extends Component {
  render() {
    const { zip, value } = this.props;

    const normalizedValue =
      (zip[stats[value].id] - stats[value].min) /
      (stats[value].max - stats[value].min);

    return (
      <div
        className={"value" + (normalizedValue > 0.5 ? " black" : " white")}
        style={{ backgroundColor: d3.interpolateViridis(normalizedValue) }}
      >
        {Math.round(zip[stats[value].id])}
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
          <Value value="housing" zip={zip} />
        </div>

        <div className="component">
          <div className="title">T</div>
          <Value value="transport" zip={zip} />
        </div>

        <div className="component">
          <div className="title">F</div>
          <Value value="food" zip={zip} />
        </div>

        <div className="component">
          <div className="title">G</div>

          <Value value="goods" zip={zip} />
        </div>

        <div className="component">
          <div className="title">S</div>
          <Value value="services" zip={zip} />
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
            <Value zip={zip} value={"tco2"} />
          </div>
          <FootprintComponents zip={zip} />
        </div>
      </div>
    );
  }
}

export default ZipCode;
