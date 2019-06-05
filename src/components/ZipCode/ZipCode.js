import React, { Component } from "react";
import * as d3 from "d3";
import { stats } from "../../constants/constants";
import "./ZipCode.scss";

class Value extends Component {
  render() {
    const { zip, value, norm } = this.props;

    const v =
      norm === "capita"
        ? zip[stats[value].id] / zip.PersonsPerHousehold
        : zip[stats[value].id];

    const min = norm === "capita" ? stats[value].min / 2.65 : stats[value].min;

    const max = norm === "capita" ? stats[value].max / 2.65 : stats[value].max;

    const normalizedValue = (v - min) / (max - min);

    return (
      <div
        className={"value" + (normalizedValue > 0.5 ? " black" : " white")}
        style={{ backgroundColor: d3.interpolateViridis(normalizedValue) }}
      >
        {Math.round(v)}
      </div>
    );
  }
}

class FootprintComponents extends Component {
  render() {
    const { zip, norm } = this.props;

    return (
      <div className="components">
        <div className="component">
          <div className="title">H</div>
          <Value value="housing" zip={zip} norm={norm} />
        </div>

        <div className="component">
          <div className="title">T</div>
          <Value value="transport" zip={zip} norm={norm} />
        </div>

        <div className="component">
          <div className="title">F</div>
          <Value value="food" zip={zip} norm={norm} />
        </div>

        <div className="component">
          <div className="title">G</div>

          <Value value="goods" zip={zip} norm={norm} />
        </div>

        <div className="component">
          <div className="title">S</div>
          <Value value="services" zip={zip} norm={norm} />
        </div>
      </div>
    );
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ZipCode extends Component {
  render() {
    const { zip, preview } = this.props;
    const norm = this.props.norm || "household";

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
          <div className="name">
            {"$" +
              numberWithCommas(zip[stats[this.props.stats[0]].id]) +
              " / " +
              numberWithCommas(zip[stats[this.props.stats[1]].id])}
          </div>
          <div className="total">
            <Value zip={zip} value={"tco2"} norm={norm} />
          </div>
          <FootprintComponents zip={zip} norm={norm} />
        </div>
      </div>
    );
  }
}

export default ZipCode;
