import React, { Component } from "react";
import ZipCode from "../ZipCode/ZipCode";
import { stats } from "../../constants/constants";
import "./ComparisonZips.scss";

class ComparisonZips extends Component {
  sortValues(criteria) {
    let scores = this.props.zipcodes
      .filter(z =>
        criteria.reduce((acc, cur) => {
          let target =
            this.props.mapLayer.norm === "capita"
              ? cur.target / cur.PersonsPerHousehold
              : cur.target;

          let value =
            this.props.mapLayer.norm === "capita"
              ? z[cur.value] / z.PersonsPerHousehold
              : z[cur.value];

          return (
            acc &&
            (cur.tolerance
              ? value > target * cur.tolerance &&
                value < target * (1.0 / cur.tolerance)
              : true)
          );
        }, true)
      )
      .map(z => ({
        score: Math.sqrt(
          criteria.reduce((acc, cur) => {
            let target =
              this.props.mapLayer.norm === "capita"
                ? cur.target / cur.PersonsPerHousehold
                : cur.target;

            let value =
              this.props.mapLayer.norm === "capita"
                ? z[cur.value] / z.PersonsPerHousehold
                : z[cur.value];

            return (cur.weight || 1) * Math.pow(value - target, 2) + acc;
          }, 0)
        ),
        ...z
      }));

    let sorted = scores.sort((a, b) => a.score - b.score).slice(1, 10);
    return sorted;
    // return sorted.sort((a, b) => b.popden - a.popden);
  }

  render() {
    let sortArray = this.props.comparison.map(c => {
      let multiple = 1;

      if (c.dir === "higher") multiple = 1 / 1.5;
      if (c.dir === "lower") multiple = 1.5;

      return {
        value: stats[c.value].id,
        target: this.props.targetZip[stats[c.value].id] / multiple,
        PersonsPerHousehold: this.props.targetZip.PersonsPerHousehold,
        tolerance: 0.8,
        weight: 100 / Math.sqrt(stats[c.value].max - stats[c.value].min)
      };
    });

    let sorted = this.sortValues(sortArray);

    return (
      <div className="ComparisonZips">
        {sorted.map(s => (
          <ZipCode
            key={s.ZipCode}
            zip={s}
            onClick={() => {
              this.props.onClick(s);
            }}
            norm={this.props.mapLayer.norm}
            stats={[
              this.props.comparison[0].value,
              this.props.comparison[1].value
            ]}
          />
        ))}
      </div>
    );
  }
}

export default ComparisonZips;
